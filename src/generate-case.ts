import * as vscode from 'vscode';

import { SEPARATOR } from './_config/separator.config';
import {
    CaseConversion,
    VeryFirstCaseConversion,
} from './_domain/case-conversion';
import { Separator } from './_domain/separator';
import {
    veryFirstLower,
    veryFirstUpper,
} from './convert-case';

/**
 * Matches segments of the given "text" which may contain separators as defined by "separatorRegexString"
 * and replaced them according to the target case defined by "separator", "caseConversionFunction" and "veryFirst".
 *
 * OR
 *
 * Converts the given "text" as a whole word (one segment).
 *
 * The segments are matches by case using a regular expression with the following matching groups:
 * 1. matching group: segments separated by one or more separation characters but also match camel case within separated segments
 * 2. matching group: camel case and lower case
 * 3. matching group: upper case without following first letter of camel case
 * 4. matching group: match inverse camel case but only "normal" invserse camel case (no upper very first letter or group of lower letters)
 * 5. matching group: single lower letters or numbers
 * 6. matching group: leading separators
 *
 * @param text Given string whose case will be converted
 * @param separatorRegexString Regex of all allowed separators
 * @param separator Separator string for the target case
 * @param caseConversionFunction Function which converts each segment
 * @param veryFirst Optional conversion of the first letter of "text" (not each segment)
 * @returns Text converted to the target case
 */
export function generateCase(
    text: string,
    separatorRegexString: string,
    separator: Separator,
    caseConversionFunction: CaseConversion,
    veryFirst?: VeryFirstCaseConversion
): string {

    if (text.length === 0) {
        return text;
    }

    let replacedString: string;

    if (separator.name === SEPARATOR.wholeWord.name) {

        replacedString = caseConversionFunction(text);

    } else {

        replacedString = matchAndReplaceSegments(text, separatorRegexString, separator, caseConversionFunction, veryFirst);
    }

    return replacedString;
}

function matchAndReplaceSegments(
    text: string,
    separatorRegexString: string,
    separator: Separator,
    caseConversionFunction: CaseConversion,
    veryFirst: VeryFirstCaseConversion | undefined,
): string {

    if (text.match(`^[${separatorRegexString}]+$`)) {
        vscode.window.showWarningMessage(`Selections only containing separators are not converted !`);
        return text;
    }

    const regex = new RegExp(`([A-Z]{0,1}(?:[a-z0-9]+|[A-Z0-9]+))[${separatorRegexString}]+|([A-Za-z][a-z0-9]+)|([A-Z0-9]+(?![a-z]))|([A-Za-z][A-Z0-9]+)[${separatorRegexString}]*|([a-z0-9])|[ ._-]+`, 'g');

    let replacedString = text.replace(regex, (matched: string, captured1: string, captured2: string, captured3: string, captured4: string, captured5: string): string => {

        const replacedSegment = `${captured1 ?? ''}${captured2 ?? ''}${captured3 ?? ''}${captured4 ?? ''}${captured5 ?? ''}${separator.value}`;

        return caseConversionFunction(replacedSegment);
    });

    if (veryFirst === VeryFirstCaseConversion.upper) {

        replacedString = veryFirstUpper(replacedString);

    } else if (veryFirst === VeryFirstCaseConversion.lower) {

        replacedString = veryFirstLower(replacedString);
    }

    // NOTE Segments are captured without separators by regex and combined using the new separator (except camel cases and flat cases)
    //      at the end of each segment. Thus, the last segment also ends with a separator which must be deleted.
    //      Exception: The selection does end with a separator. In this special case the last separator must not be deleted !
    if (
        separator.value !== undefined &&
        separator.value.length > 0 &&
        !text.match(`[${separatorRegexString}]+$`)
    ) {
        replacedString = replacedString.slice(0, replacedString.length - separator.value.length);
    }

    return replacedString;
}
