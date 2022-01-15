import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "upper-snake-case" is now active!');

	let disposable = vscode.commands.registerCommand('upper-snake-case.helloWorld', () => {

        const activeTextEditor = vscode.window.activeTextEditor;

        if (!!activeTextEditor) {

            const selection = activeTextEditor.selection;

            if (!!selection) {

                const range = new vscode.Range(selection.start, selection.end);

                const selectedText = activeTextEditor.document.getText(range);

                if (range.isEmpty || selectedText.length === 0) {
                    vscode.window.showWarningMessage('nothing selected');
                }

                vscode.window.showInformationMessage(selectedText);

                activeTextEditor.edit((editBuilder: vscode.TextEditorEdit) => {

                    editBuilder.replace(selection, selectedText.toUpperCase());

                }).then((editDone: boolean) => {
                    vscode.window.showInformationMessage(`edit done: ${editDone}`);
                });
            }
        }
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
}
