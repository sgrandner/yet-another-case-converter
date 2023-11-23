import * as vscode from 'vscode';

import { getConvertCommandsConfig } from './_config/convert-commands.config';
import { CommandConfig } from './_domain/command-config';
import { TextSelection } from './_domain/text-selection';
import { generateCase } from './generate-case';
import { iterateSelections } from './iterate-selections';

export function activate(context: vscode.ExtensionContext) {

    let disposable;

    const customSeparator1 = (String)(
        vscode.workspace.getConfiguration('yet-another-case-converter')
            .get('custom1-separator')
    );
    const commands = getConvertCommandsConfig(customSeparator1);

    commands.forEach((config: CommandConfig) => {

        disposable = vscode.commands.registerCommand(`yet-another-case-converter.${config.commandName}`, () => {

            iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

                editBuilder.replace(textSelection.selection, generateCase(
                    textSelection.text,
                    config.separator,
                    config.segmentCaseConversion,
                    config.veryFirstCaseConversion,
                ));
            });
        });
        context.subscriptions.push(disposable);
    });
}

export function deactivate() {
}
