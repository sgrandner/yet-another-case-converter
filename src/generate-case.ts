import * as vscode from 'vscode';

import { SEPARATOR } from './_config/separator.config';
import {
    CaseConversion,
    VeryFirstCaseConversion,
} from './_domain/case-conversion';
import { Separator } from './_domain/separator';
import {
    firstLower,
    veryFirstLower,
    veryFirstUpper,
} from './convert-case';

export function generateCase(
    text: string,
    separator: Separator,
    caseConversionFunction: CaseConversion,
    veryFirst?: VeryFirstCaseConversion
): string {

    if (text.length === 0) {
        return text;
    }

    if (
        separator.name === SEPARATOR.none.name &&
        caseConversionFunction === firstLower &&
        veryFirst === VeryFirstCaseConversion.upper
    ) {
        vscode.window.showWarningMessage(`Tried to generate upper inverse camel case which is really strange and not matched properly. Use without VeryFirstCaseConversion instead.`);
        return text;
    }

    // NOTE the following regex matches segments of a string (selection) by case
    // 1. matching group: segments separated by one or more separation characters but also match camel case within separated segments
    // 2. matching group: camel case and lower case
    // 3. matching group: upper case without following first letter of camel case
    // 4. matching group: match inverse camel case but only "normal" invserse camel case (no upper very first letter or group of lower letters)
    // 5. matching group: single lower letters or numbers
    // 6. matching group: leading separators

    const customSeparator1 = (String)(vscode.workspace.getConfiguration('yet-another-case-converter').get('custom1-separator'));
    const separatorRegexString = ` ${customSeparator1}._-`;

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
        separator.name !== SEPARATOR.none.name &&
        separator.value !== undefined &&
        !text.match(`[${separatorRegexString}]+$`)
    ) {
        replacedString = replacedString.slice(0, replacedString.length - separator.value.length);
    }

    return replacedString;
}
