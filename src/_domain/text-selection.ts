import * as vscode from 'vscode';

export interface TextSelection {
    selection: vscode.Selection;
    text: string;
}
