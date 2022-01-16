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

    let disposable;

    // snake cases

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-snake-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.snake, upper));
        });
	});
	context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.lower-snake-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.snake, lower));
        });
	});
	context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.each-first-upper-snake-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.snake, firstUpper));
        });
	});
	context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.each-first-lower-snake-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.snake, firstLower));
        });
	});
	context.subscriptions.push(disposable);

    // TODO other separated cases

    // kebap cases

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-kebap-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.kebap, upper));
        });
	});
    context.subscriptions.push(disposable);




    // camel cases

    // NOTE this does not work and should throw a warning ! for testing purposes !
    disposable = vscode.commands.registerCommand('yet-another-case-changer.each-upper-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, upper));
        });
	});
    context.subscriptions.push(disposable);

    // NOTE this does not work and should throw a warning ! for testing purposes !
    disposable = vscode.commands.registerCommand('yet-another-case-changer.each-lower-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, lower));
        });
	});
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, firstUpper));
        });
	});
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.lower-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, firstUpper, VeryFirstCaseConversion.lower));
        });
	});
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-inverse-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, firstLower, VeryFirstCaseConversion.upper));
        });
	});
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.lower-inverse-camel-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.camel, firstLower));
        });
	});
    context.subscriptions.push(disposable);
}

export function deactivate() {
}
