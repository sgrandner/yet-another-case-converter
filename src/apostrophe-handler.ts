import * as vscode from 'vscode';

import { SEPARATOR } from './_config/separator.config';
import { ApostropheHandling } from "./_domain/apostrophe-handling";
import { Separator } from './_domain/separator';
import { TextSelection } from "./_domain/text-selection";
import {
    getApostropheHandlingTypeByMessage,
    MESSAGE_OPTIONS,
    MESSAGES,
} from './_wording/messages';

export function apostropheHandler(separator: Separator): (
    validTextSelections: TextSelection[],
    editSelectionsCallback: (apostropheHandling: ApostropheHandling | undefined) => void,
) => void {

    return (
        validTextSelections: TextSelection[],
        editSelectionsCallback: (apostropheHandling: ApostropheHandling | undefined) => void,
    ) => {

        const hasApostrophes = validTextSelections.some((textSelection: TextSelection) => {
            return !!textSelection.text.match(/'/);
        });

        if (hasApostrophes && separator.name !== SEPARATOR.wholeWord.name) {

            const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');

            const savedType = configuration.get('apostrophe-handling');
            if (savedType !== undefined && savedType !== '' && savedType !== 'CANCEL') {

                editSelectionsCallback(savedType as ApostropheHandling);

            } else {

                vscode.window.showInformationMessage(
                    MESSAGES.APOSTROPHE_HANDLING_TYPE,
                    MESSAGE_OPTIONS.KEEP,
                    MESSAGE_OPTIONS.REMOVE,
                    MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD,
                    MESSAGE_OPTIONS.CANCEL,
                ).then(
                    (option: string | undefined) => {

                        const type = getApostropheHandlingTypeByMessage(option);

                        if (type !== undefined && type !== 'CANCEL') {

                            const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');
                            const isAllowedToAskToSaveAnswer = configuration.get('ask-for-apostrophe-handling');

                            if (isAllowedToAskToSaveAnswer !== false) {
                                saveApostropheHandling(type, editSelectionsCallback);
                            } else {
                                editSelectionsCallback(type);
                            }
                        }
                    },
                    (reason: any) => {
                        vscode.window.showWarningMessage(`Failed to handle apostrophes: ${reason}`);
                    },
                );
            }

        } else {
            editSelectionsCallback(undefined);
        }
    };
}

function saveApostropheHandling(
    type: ApostropheHandling,
    editSelectionsCallback: (apostropheHandling: ApostropheHandling | undefined) => void,
): void {

    vscode.window.showInformationMessage(
        MESSAGES.APOSTROPHE_HANDLING_SAVE,
        MESSAGE_OPTIONS.YES,
        MESSAGE_OPTIONS.NO,
        MESSAGE_OPTIONS.DONT_ASK_AGAIN,
    ).then(
        (option: string | undefined) => {

            const configuration = vscode.workspace.getConfiguration('yet-another-case-converter');

            if (option === MESSAGE_OPTIONS.YES) {
                configuration.update('apostrophe-handling', type, true).then(
                    () => {},
                    () => {},
                );
            } else if (option === MESSAGE_OPTIONS.NO) {
                configuration.update('apostrophe-handling', undefined, true).then(
                    () => {},
                    () => {},
                );
            } else if (option === MESSAGE_OPTIONS.DONT_ASK_AGAIN) {
                configuration.update('ask-for-apostrophe-handling', false, true).then(
                    () => {},
                    () => {},
                );
            }

            editSelectionsCallback(type);
        },
        (reason: any) => {
            vscode.window.showWarningMessage(`Failed to handle apostrophes: ${reason}`);
        },
    );
}
