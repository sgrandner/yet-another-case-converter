import * as vscode from 'vscode';

import { TextSelection } from './text-selection';

export type SelectionEditor = (editBuilder: vscode.TextEditorEdit, textSelection: TextSelection) => void;
