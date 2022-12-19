import * as vscode from 'vscode';

import { SelectionEditor } from './_domain/selection-editor';
import { TextSelection } from './_domain/text-selection';

export function iterateSelections(selectionEditor: SelectionEditor) {

    const activeTextEditor = vscode.window.activeTextEditor;

    if (!!activeTextEditor) {

        const validTextSelections = gatherValidSelections(activeTextEditor);

        if (validTextSelections?.length > 0) {

            editSelections(activeTextEditor, validTextSelections, selectionEditor);

        }
    }
}

function gatherValidSelections(activeTextEditor: vscode.TextEditor): TextSelection[] {

    const validTextSelections: TextSelection[] = [];

    activeTextEditor.selections?.forEach((selection: vscode.Selection) => {

        if (!!selection) {

            const range = new vscode.Range(selection.start, selection.end);
            const selectedText = activeTextEditor.document.getText(range);
            const selectedTextLines = selectedText.split('\n');

            selectedTextLines.forEach((lineText: string, lineIndex: number) => {

                if (lineText.length > 0) {
    
                    const selection = new vscode.Selection(range.start.line + lineIndex, 0, range.start.line + lineIndex, lineText.length);

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
): void {

    activeTextEditor.edit((editBuilder: vscode.TextEditorEdit) => {

        validTextSelections.forEach((textSelection: TextSelection) => selectionEditor(editBuilder, textSelection));

    }).then((editDone: boolean) => {

        const selectionsString = validTextSelections
            .map((textSelection: TextSelection): string => `"${textSelection.text}"`)
            .join(', ');

        if (!editDone) {
            vscode.window.showWarningMessage(`failed to change case for ${selectionsString}`);
        }
    });
}
