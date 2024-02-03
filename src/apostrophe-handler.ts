import * as vscode from 'vscode';

import { SEPARATOR } from './_config/separator.config';
import { ApostropheHandling } from "./_domain/apostrophe-handling";
import { Separator } from './_domain/separator';
import { TextSelection } from "./_domain/text-selection";
import {
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

            vscode.window.showInformationMessage(
                MESSAGES.APOSTROPHE_HANDLING_TYPE,
                MESSAGE_OPTIONS.KEEP,
                MESSAGE_OPTIONS.REMOVE,
                MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD,
                MESSAGE_OPTIONS.CANCEL,
            ).then(
                (option: string | undefined) => {
                    if (option === MESSAGE_OPTIONS.KEEP) {
                        editSelectionsCallback('KEEP');
                    } else if (option === MESSAGE_OPTIONS.REMOVE) {
                        editSelectionsCallback('REMOVE');
                    } else if (option === MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD) {
                        editSelectionsCallback('HANDLE_AS_SEPARATOR_WITHIN_WORD');
                    }
                },
                (reason: any) => {
                    vscode.window.showWarningMessage(`Failed to handle apostrophes: ${reason}`);
                },
            );

        } else {
            editSelectionsCallback(undefined);
        }
    };
}
