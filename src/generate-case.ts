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
import { regExpMatchArrayWithIsLast } from './utils/reg-exp-match-array-with-is-last';

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

    let replacedString = '';

    const regex = new RegExp(`([A-Z]{0,1}(?:[a-z0-9]+|[A-Z0-9]+))[${separatorRegexString}]+|([A-Za-z][a-z0-9]+)|([A-Z0-9]+(?![a-z]))|([A-Za-z][A-Z0-9]+)[${separatorRegexString}]*|([a-z0-9])|[ ._-]+`, 'g');
    const matchedSegments = text.matchAll(regex);

    // TODO show message if nothing is matched and return !!!

    for (const match of regExpMatchArrayWithIsLast(matchedSegments)) {

        // NOTE the segment is one of the captering groups of the regexp
        const replacedSegment = match.value.find((capture: string, index: number) => {
            return index > 0 && capture?.length > 0;
        }) ?? '';
        const convertedSegment = caseConversionFunction(replacedSegment);

        // NOTE the separator is concatinated if it's not the last segment or the last segment ends with a separator
        const concatSeparator = !match.isLast || !!text.match(`[${separatorRegexString}]+$`);

        replacedString = replacedString.concat(convertedSegment, concatSeparator ? separator.value ?? '' : '');
    }

    if (veryFirst === VeryFirstCaseConversion.upper) {
        replacedString = veryFirstUpper(replacedString);
    } else if (veryFirst === VeryFirstCaseConversion.lower) {
        replacedString = veryFirstLower(replacedString);
    }

    return replacedString;
}
