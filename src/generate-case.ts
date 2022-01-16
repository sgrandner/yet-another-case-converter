import * as vscode from 'vscode';

import {
    CaseConversion,
    VeryFirstCaseConversion,
} from './_domain/case-conversion';
import { Separator } from './_domain/separator';
import {
    lower,
    upper,
    veryFirstLower,
    veryFirstUpper,
} from './convert-case';

export function generateCase(
    text: string,
    separator: Separator,
    caseConversionFunction: CaseConversion,
    veryFirst?: VeryFirstCaseConversion
): string {

    if (separator === Separator.camel && (caseConversionFunction === upper || caseConversionFunction === lower)) {

        vscode.window.showWarningMessage(`Tried to generate upper or lower camel case which does not exist. Use with firstUpper or firstLower instead.`);

        return text;
    }

    // NOTE this regex matches segments of a string by case
    // 1. alternative: segments separated by a separation character, explicitly exclude camel case in segments !
    // 2. alternative: last segment in words separated by a separation character (with last separation before segment)
    // 3. alternative: camel case
    // 4. alternative: upper or lower case
    const regex = /([A-Z]{0,1}(?<![a-z0-9])[A-Za-z0-9]+)[ ._-]{1}|((?<=[ ._-]{1})[A-Za-z0-9]+)|([A-Za-z][a-z0-9]+|[A-Z0-9])/g;

    // NOTE simple replace value would be `$1$2$3${separator}` without case conversion

    let replacedString = text.replace(regex, (matched: string, captured1: string, captured2: string, captured3: string): string => {

        const replacedSegment = `${captured1 ?? ''}${captured2 ?? ''}${captured3 ?? ''}${separator}`;

        return caseConversionFunction(replacedSegment);
    });

    if (veryFirst === VeryFirstCaseConversion.upper) {

        replacedString = veryFirstUpper(replacedString);

    } else if (veryFirst === VeryFirstCaseConversion.lower) {

        replacedString = veryFirstLower(replacedString);
    }

    if (separator !== Separator.camel) {
        replacedString = replacedString.slice(0, replacedString.length - 1);
    }

    return replacedString;
}
