import * as vscode from 'vscode';

import { Separator } from './_domain/separator';
import { TextSelection } from './_domain/text-selection';
import { generateCase } from './generate-case';
import { iterateSelections } from './iterate-selections';

export function activate(context: vscode.ExtensionContext) {

    let disposable;

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-snake-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.snake).toUpperCase());
        });
	});

	context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-changer.upper-kebap-case', () => {

        iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

            editBuilder.replace(textSelection.selection, generateCase(textSelection.text, Separator.kebap).toUpperCase());
        });
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
}
