import * as vscode from 'vscode';

import { getConvertCommandsConfig } from './_config/convert-commands.config';
import { ApostropheHandling } from './_domain/apostrophe-handling';
import {
    CommandConfig,
    CommandLevel,
} from './_domain/command-config';
import { TextSelection } from './_domain/text-selection';
import {
    MESSAGE_OPTIONS,
    MESSAGES,
} from './_wording/messages';
import { apostropheHandler } from './apostrophe-handler';
import { generateCase } from './generate-case';
import { iterateSelections } from './iterate-selections';

export function activate(context: vscode.ExtensionContext): void {

    activateSettingsCommands(context);

    activateConvertCommands(context);
}

export function deactivate(): void {
}

function activateSettingsCommands(context: vscode.ExtensionContext): void {

    let disposable;

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-all-commands', () => {
        confirmAction(() => {
            updateConfigurationsByLevel(CommandLevel.AreYouKidding);
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-most-commands', () => {
        confirmAction(() => {
            updateConfigurationsByLevel(CommandLevel.WhyNot);
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.activate-important-commands', () => {
        confirmAction(() => {
            updateConfigurationsByLevel(CommandLevel.Important);
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.deactivate-all-commands', () => {
        confirmAction(() => {
            updateConfigurationsByLevel(CommandLevel.None);
        });
    });
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('yet-another-case-converter.set-custom-separator', () => {
        inputCustomSeparator();
    });
    context.subscriptions.push(disposable);
}

// TODO move to utils ?!
function confirmAction(doAction: () => void) {

    vscode.window.showInformationMessage(
        MESSAGES.EDIT_GLOBAL_SETTINGS,
        MESSAGE_OPTIONS.YES,
        MESSAGE_OPTIONS.NO,
    ).then(
        (value: string | undefined) => {
            if (value === MESSAGE_OPTIONS.YES) {
                doAction();
            }
        },
        (value: string | undefined) => {
            if (value === MESSAGE_OPTIONS.YES) {
                vscode.window.showErrorMessage('Failed to execute command !');
            }
        },
    );
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
function updateConfigurationsByLevel(chosenLevel: CommandLevel): void {

    const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');
    const commands = getConvertCommandsConfig(undefined);

    const updateResults: Thenable<void>[] = [];

    commands.forEach((config: CommandConfig) => {

        if (config.commandLevel !== undefined) {

            const defaultValue = configuration.inspect(`activate.${config.commandName}`)?.defaultValue;

            let result;

            if (config.commandLevel <= chosenLevel) {
                // NOTE activate commands by setting them explicitly to true or unset them if true is the default value
                result = updateConfiguration(
                    defaultValue === true ? undefined : true,
                    configuration,
                    config,
                );
            } else {
                // NOTE deactivate commands by setting them explicitly to false or unset them if false is the default value
                result = updateConfiguration(
                    defaultValue === true ? false : undefined,
                    configuration,
                    config,
                );
            }

            updateResults.push(result);

        } else {
            console.error(`no command level set for ${config.commandName} !`);
        }
    });

    Promise.all(updateResults).then(
        () => {},
        () => {
            vscode.window.showErrorMessage('Failed to update convert commands entries in settings !');
        },
    );
}

function updateConfiguration(
    updateValue: boolean | undefined,
    configuration: vscode.WorkspaceConfiguration,
    config: CommandConfig,
): Thenable<void> {

    // TODO only update if value changes

    return configuration.update(`activate.${config.commandName}`, updateValue, true);
}

function inputCustomSeparator(): void {

    // TODO get current value from settings

    vscode.window.showInputBox({
        placeHolder: 'custom separator string',
        value: '',
    }).then(
        (value: string | undefined) => setCustomSeparator(value),
        () => {},
    );
}

function setCustomSeparator(separator: string | undefined): void {

    if (separator === undefined || separator.length === 0) {
        return;
    }

    const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');

    configuration.update('custom1-separator', separator, true).then(
        () => {
            vscode.window.showInformationMessage(
                MESSAGES.RELOAD_FOR_SETTINGS,
                MESSAGE_OPTIONS.YES,
                MESSAGE_OPTIONS.NO,
            ).then(
                (option: string | undefined) => {
                    if (option === MESSAGE_OPTIONS.YES) {
                        vscode.commands.executeCommand('workbench.action.reloadWindow');
                    }
                },
                () => {},
            );
        },
        () => {
            vscode.window.showErrorMessage('Failed to set custom separator !');
        },
    );
}

function activateConvertCommands(context: vscode.ExtensionContext): void {

    const customSeparator1: string | undefined = vscode.workspace
        .getConfiguration('yet-another-case-converter')
        .get('custom1-separator');
    const separatorRegexString = ` ${customSeparator1 ?? ''}._\\-`;

    const commands = getConvertCommandsConfig(customSeparator1);

    commands.forEach((config: CommandConfig) => {

        const disposable = vscode.commands.registerCommand(`yet-another-case-converter.${config.commandName}`, () => {
            applyConvertCommand(config, separatorRegexString);
        });
        context.subscriptions.push(disposable);
    });
}

function applyConvertCommand(config: CommandConfig, separatorRegexString: string): void {

    const selectionEditor = (
        editBuilder: vscode.TextEditorEdit,
        textSelection: TextSelection,
        apostropheHandling: ApostropheHandling | undefined,
    ) => {

        const generatedString = generateCase(
            textSelection.text,
            separatorRegexString,
            config.separator,
            config.segmentCaseConversion,
            config.veryFirstCaseConversion,
            apostropheHandling,
        );

        if (generatedString !== null) {
            editBuilder.replace(textSelection.selection, generatedString);
        }
    };

    iterateSelections(
        selectionEditor,
        apostropheHandler(config.separator),
    );
}
