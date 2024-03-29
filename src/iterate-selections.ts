import * as vscode from 'vscode';

import { ApostropheHandling } from './_domain/apostrophe-handling';
import { SelectionEditor } from './_domain/selection-editor';
import { TextSelection } from './_domain/text-selection';

export function iterateSelections(
    selectionEditor: SelectionEditor,
    apostropheHandler: (
        validTextSelections: TextSelection[],
        editSelectionsCallback: (apostropheHandling: ApostropheHandling | undefined) => void,
    ) => void,
) {

    const activeTextEditor = vscode.window.activeTextEditor;

    if (!!activeTextEditor) {

        const validTextSelections = gatherValidSelections(activeTextEditor);

        if (validTextSelections?.length > 0) {

            apostropheHandler(validTextSelections, (apostropheHandling: ApostropheHandling | undefined) => {
                editSelections(activeTextEditor, validTextSelections, selectionEditor, apostropheHandling);
            });

        } else {
            vscode.window.showInformationMessage('Nothing selected for case conversion !');
        }
    }
}

function gatherValidSelections(activeTextEditor: vscode.TextEditor): TextSelection[] {

    const validTextSelections: TextSelection[] = [];

    // NOTE iterate one or more selection (multi-cursor)
    activeTextEditor.selections?.forEach((selection: vscode.Selection) => {

        if (!!selection) {

            const range = new vscode.Range(selection.start, selection.end);
            const selectedText = activeTextEditor.document.getText(range);

            // NOTE split multiline selection and iterate
            const selectedTextLines = selectedText.split(/\r\n|\n/);

            selectedTextLines.forEach((lineText: string, lineIndex: number) => {

                if (lineText.length > 0) {

                    const currentLineIndex = range.start.line + lineIndex;
                    const startCharacterIndex = lineIndex === 0 ? range.start.character : 0;

                    // NOTE store each selection line by line
                    const selection = new vscode.Selection(
                        currentLineIndex,
                        startCharacterIndex,
                        currentLineIndex,
                        startCharacterIndex + lineText.length
                    );

                    validTextSelections.push({
                        selection,
                        text: lineText,
                    });
                }
            });

        }
    });

    return validTextSelections;
}

function editSelections(
    activeTextEditor: vscode.TextEditor,
    validTextSelections: TextSelection[],
    selectionEditor: SelectionEditor,
    apostropheHandling: ApostropheHandling | undefined,
): void {

    activeTextEditor.edit((editBuilder: vscode.TextEditorEdit) => {

        validTextSelections.forEach((textSelection: TextSelection) => {
            selectionEditor(editBuilder, textSelection, apostropheHandling);
        });

    }).then((editDone: boolean) => {

        if (!editDone) {
            const selectionsString = validTextSelections
                .map((textSelection: TextSelection): string => `"${textSelection.text}"`)
                .join(', ');

            vscode.window.showWarningMessage(`failed to change case for ${selectionsString}`);
        }
    });
}
