import * as vscode from 'vscode';

import { VeryFirstCaseConversion } from './_domain/case-conversion';
import { Separator } from './_domain/separator';
import { TextSelection } from './_domain/text-selection';
import {
    firstLower,
    firstUpper,
    lower,
    upper,
} from './convert-case';
import { generateCase } from './generate-case';
import { iterateSelections } from './iterate-selections';

export function activate(context: vscode.ExtensionContext) {

    const customSeparator1 = (String)(vscode.workspace.getConfiguration('yet-another-case-converter').get('custom1-separator'));

    let disposable;

    [
        {
            commandName: 'upper-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-kebap-case',
            separator: Separator.kebap,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-kebap-case',
            separator: Separator.kebap,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-kebap-case',
            separator: Separator.kebap,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-kebap-case',
            separator: Separator.kebap,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-space-case',
            separator: Separator.space,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-space-case',
            separator: Separator.space,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-space-case',
            separator: Separator.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-space-case',
            separator: Separator.space,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'lower-inverse-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-custom1-case',
            separator: customSeparator1,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-custom1-case',
            separator: customSeparator1,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-custom1-case',
            separator: customSeparator1,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-custom1-case',
            separator: customSeparator1,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
    ].forEach(({ commandName, separator, segmentCaseConversion, veryFirstCaseConversion }) => {

        disposable = vscode.commands.registerCommand(`yet-another-case-converter.${commandName}`, () => {

            iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

                editBuilder.replace(textSelection.selection, generateCase(
                    textSelection.text,
                    separator,
                    segmentCaseConversion,
                    veryFirstCaseConversion,
                ));
            });
        });
        context.subscriptions.push(disposable);
    });

    disposable = vscode.commands.registerCommand('yet-another-case-converter.upper-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, textSelection.text.toUpperCase());
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.lower-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, textSelection.text.toLowerCase());
        });
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {
}
