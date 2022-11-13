import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

    setup(async () => {

        await vscode.window.activeTextEditor?.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.insert(new vscode.Position(0, 0), 'qwer asdf yxcv');
        });

        if (vscode.window.activeTextEditor) {
            vscode.window.activeTextEditor.selection = new vscode.Selection(0, 0, 0, 14);
        }
    });

    teardown(async () => {

        await vscode.window.activeTextEditor?.edit((editBuilder: vscode.TextEditorEdit) => {

            const startPosition = new vscode.Position(0, 0);
            const currentLine = vscode.window.activeTextEditor?.document.lineAt(startPosition);
            const endPosition = new vscode.Position(0, currentLine?.text.length ?? 0);
            const range = new vscode.Range(startPosition, endPosition);
            editBuilder.delete(range);
        });
    });

    [
        {
            commandName: 'upper-snake-case',
            expected: 'QWER_ASDF_YXCV',
        },
        {
            commandName: 'lower-snake-case',
            expected: 'qwer_asdf_yxcv',
        },
    ].forEach((testArgs: { commandName: string, expected: string }) => {

        suite('asdfasdf', () => {

            test(`with calling command ${testArgs.commandName} it should convert selection`, async () => {
                let result;

                await vscode.commands.executeCommand(`yet-another-case-changer.${testArgs.commandName}`).then(
                    (asdf) => {
                        console.log('asdf');
                    },
                    (qwer) => {
                        console.log('qwer');
                    },
                );

                if (vscode.window.activeTextEditor) {
                    result = vscode.window.activeTextEditor.document.getText(new vscode.Range(0, 0, 0, 14));
                }
                assert(result === testArgs.expected, `failed to convert case to ${testArgs.commandName}, result was ${result}`);
            });
        });
    });


    // test(`with calling command upper-snake-case it should convert selection`, async () => {
    //     let result;

    //     await vscode.commands.executeCommand(`yet-another-case-changer.upper-snake-case`);

    //     if (vscode.window.activeTextEditor) {
    //         result = vscode.window.activeTextEditor.document.getText(new vscode.Range(0, 0, 0, 14));
    //     }
    //     assert(result === 'QWER_ASDF_YXCV', `failed to convert case to upper-snake-case, result was ${result}`);
    // });


    // test(`with calling command lower-snake-case it should convert selection`, async () => {
    //     let result;

    //     await vscode.commands.executeCommand(`yet-another-case-changer.lower-snake-case`);

    //     if (vscode.window.activeTextEditor) {
    //         result = vscode.window.activeTextEditor.document.getText(new vscode.Range(0, 0, 0, 14));
    //     }
    //     assert(result === 'qwer_asdf_yxcv', `failed to convert case to lower-snake-case, result was ${result}`);
    // });
});
