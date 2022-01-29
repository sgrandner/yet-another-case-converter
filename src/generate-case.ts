import * as vscode from 'vscode';

import {
    CaseConversion,
    VeryFirstCaseConversion,
} from './_domain/case-conversion';
import { Separator } from './_domain/separator';
import {
    firstLower,
    lower,
    upper,
    veryFirstLower,
    veryFirstUpper,
} from './convert-case';

export function generateCase(
    text: string,
    separator: Separator | string,
    caseConversionFunction: CaseConversion,
    veryFirst?: VeryFirstCaseConversion
): string {

    if (separator === Separator.camel) {

        if (caseConversionFunction === upper || caseConversionFunction === lower) {

            vscode.window.showWarningMessage(`Tried to generate upper or lower camel case which does not exist. Use with firstUpper or firstLower instead.`);
            return text;

        } else if (caseConversionFunction === firstLower && veryFirst === VeryFirstCaseConversion.upper) {

            vscode.window.showWarningMessage(`Tried to generate upper inverse camel case which is really strange and not matched properly. Use without VeryFirstCaseConversion instead.`);
            return text;
        }
    }

    // NOTE this regex matches segments of a string by case
    // 1. alternative: segments separated by one or more separation characters but also match camel case within separated segments
    // 2. alternative: camel case and lower case
    // 3. alternative: upper case without following first letter of camel case
    // 4. alternative: match inverse camel case but only "normal" invserse camel case (no upper very first letter or group of lower letters)

    // static regex for space, dot, camel and kebap case
    // /([A-Z]{0,1}(?:[a-z0-9]+|[A-Z0-9]+))[ ._-]+|([A-Za-z][a-z0-9]+)|([A-Z0-9]+(?![a-z]))|([A-Za-z][A-Z0-9]+)[ ._-]*/g;

    const customSeparator1 = (String)(vscode.workspace.getConfiguration('yet-another-case-changer').get('custom1-separator'));
    const regex = new RegExp(`([A-Z]{0,1}(?:[a-z0-9]+|[A-Z0-9]+))[ ${customSeparator1}._-]+|([A-Za-z][a-z0-9]+)|([A-Z0-9]+(?![a-z]))|([A-Za-z][A-Z0-9]+)[ ${customSeparator1}._-]*`, 'g');

    let replacedString = text.replace(regex, (matched: string, captured1: string, captured2: string, captured3: string, captured4: string): string => {

        const replacedSegment = `${captured1 ?? ''}${captured2 ?? ''}${captured3 ?? ''}${captured4 ?? ''}${separator}`;

        return caseConversionFunction(replacedSegment);
    });

    if (veryFirst === VeryFirstCaseConversion.upper) {

        replacedString = veryFirstUpper(replacedString);

    } else if (veryFirst === VeryFirstCaseConversion.lower) {

        replacedString = veryFirstLower(replacedString);
    }

    if (separator !== Separator.camel) {
        replacedString = replacedString.slice(0, replacedString.length - separator.length);
    }

    return replacedString;
}
