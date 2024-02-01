import * as vscode from 'vscode';

import { SEPARATOR } from './_config/separator.config';
import {
    APOSTROPHE_HANDLING_WORDING,
    ApostropheHandling,
} from "./_domain/apostrophe-handling";
import { Separator } from './_domain/separator';
import { TextSelection } from "./_domain/text-selection";

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
                'The selected text contains apostrophes. How should I handle them?',
                APOSTROPHE_HANDLING_WORDING.keep,
                APOSTROPHE_HANDLING_WORDING.remove,
                APOSTROPHE_HANDLING_WORDING.handleAsSeparatorWithinWord,
                APOSTROPHE_HANDLING_WORDING.cancel,
            ).then(
                (option: string | undefined) => {
                    if (option === APOSTROPHE_HANDLING_WORDING.keep) {
                        editSelectionsCallback('keep');
                    } else if (option === APOSTROPHE_HANDLING_WORDING.remove) {
                        editSelectionsCallback('remove');
                    } else if (option === APOSTROPHE_HANDLING_WORDING.handleAsSeparatorWithinWord) {
                        editSelectionsCallback('handleAsSeparatorWithinWord');
                    } else if (option === APOSTROPHE_HANDLING_WORDING.cancel) {
                        vscode.window.showInformationMessage('Case convertion cancelled.');
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
