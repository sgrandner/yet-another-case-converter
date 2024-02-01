import * as vscode from 'vscode';

import { ApostropheHandling } from './apostrophe-handling';
import { TextSelection } from './text-selection';

export type SelectionEditor = (
    editBuilder: vscode.TextEditorEdit,
    textSelection: TextSelection,
    apostropheHandling: ApostropheHandling | undefined,
) => void;
