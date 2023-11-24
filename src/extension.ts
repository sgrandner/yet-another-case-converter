import * as vscode from 'vscode';

import { getConvertCommandsConfig } from './_config/convert-commands.config';
import {
    CommandConfig,
    CommandLevel,
} from './_domain/command-config';
import { TextSelection } from './_domain/text-selection';
import { generateCase } from './generate-case';
import { iterateSelections } from './iterate-selections';

export function activate(context: vscode.ExtensionContext) {

    activateSettingsCommands(context);

    activateConvertCommands(context);

    // TODO show dummy command if nothing selected: "select text to choose a case conversion"
}

export function deactivate() {
}

function activateSettingsCommands(context: vscode.ExtensionContext) {

    // TODO config commands for activating or deactivating convert commands (in groups)

    let disposable;

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-all-commands', () => {
        updateConfigurationsByLevel(CommandLevel.AreYouKidding);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-most-commands', () => {
        updateConfigurationsByLevel(CommandLevel.WhyNot);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-important-commands', () => {
        updateConfigurationsByLevel(CommandLevel.Important);
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.deactivate-all-commands', () => {
        updateConfigurationsByLevel(CommandLevel.None);
    });
    context.subscriptions.push(disposable);
}

/**
 * Smaller number values of the enum `CommandLevel` have higher priority.
 * Thus, this method activates
 *
 *      * level 1
 *      * OR level 1 and 2
 *      * OR level 1, 2 and 3
 *
 * depending on the argument `chosenLevel`.
 *
 * Updates are persisted to the global VS Code settings.json
 *
 * The configuration is removed from settings.json if the update value
 * equals the default value from the `configuration.properties` in package.json,
 * i.e. it is resetted to the default value.
 *
 * @param chosenLevel Level defining which commands shell be activated in the global VS Code settings. 1 is the highest level.
 */
function updateConfigurationsByLevel(chosenLevel: CommandLevel) {

    const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');
    const commands = getConvertCommandsConfig(undefined);

    commands.forEach((config: CommandConfig) => {

        if (config.commandLevel !== undefined) {

            const defaultValue = configuration.inspect(`activate.${config.commandName}`)?.defaultValue;

            if (config.commandLevel <= chosenLevel) {
                // NOTE activate commands by setting them explicitly to true or unset them if true is the default value
                updateConfiguration(
                    defaultValue === true ? undefined : true,
                    configuration,
                    config,
                );
            } else {
                // NOTE deactivate commands by setting them explicitly to false or unset them if false is the default value
                updateConfiguration(
                    defaultValue === true ? false : undefined,
                    configuration,
                    config,
                );
            }

        } else {
            console.error(`no command level set for ${config.commandName} !`);
        }
    });
}

function updateConfiguration(
    updateValue: boolean | undefined,
    configuration: vscode.WorkspaceConfiguration,
    config: CommandConfig,
) {

    configuration.update(`activate.${config.commandName}`, updateValue, true).then(
        () => { console.log(`updated ${config.commandName} with ${updateValue}`); },
        () => { console.log(`rejected update of ${config.commandName} with ${updateValue}`); },
    );
}

function activateConvertCommands(context: vscode.ExtensionContext) {

    const customSeparator1 = (String)(
        vscode.workspace.getConfiguration('yet-another-case-converter')
            .get('custom1-separator')
    );
    const commands = getConvertCommandsConfig(customSeparator1);

    commands.forEach((config: CommandConfig) => {

        const disposable = vscode.commands.registerCommand(`yet-another-case-converter.${config.commandName}`, () => {
            applyConvertCommand(config);
        });
        context.subscriptions.push(disposable);
    });
}

function applyConvertCommand(config: CommandConfig) {

    iterateSelections((editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => {

        editBuilder.replace(textSelection.selection, generateCase(
            textSelection.text,
            config.separator,
            config.segmentCaseConversion,
            config.veryFirstCaseConversion,
        ));
    });
}
