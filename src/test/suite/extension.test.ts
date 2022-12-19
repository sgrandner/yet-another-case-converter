import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';

suite('Extension Test Suite', () => {

	vscode.window.showInformationMessage('Start all tests.');
    let doc: vscode.TextDocument;
    let active: vscode.TextEditor | undefined;
    let configStub: sinon.SinonStub;

    const waitForCommand = 100;

    setup(() => {
        const getStub = {
            get: () => '+',
        };
        configStub = sinon.stub(vscode.workspace, 'getConfiguration');
        configStub.returns(getStub as unknown as vscode.WorkspaceConfiguration);
    });

    teardown(async () => {
        configStub.restore();
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    [
        {
            commandName: 'upper-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER_ASDF_YXCV',
        },
        {
            commandName: 'lower-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer_asdf_yxcv',
        },
        {
            commandName: 'each-first-upper-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer_Asdf_Yxcv',
        },
        {
            commandName: 'each-first-lower-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER_aSDF_yXCV',
        },
        {
            commandName: 'upper-double-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER__ASDF__YXCV',
        },
        {
            commandName: 'lower-double-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer__asdf__yxcv',
        },
        {
            commandName: 'each-first-upper-double-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer__Asdf__Yxcv',
        },
        {
            commandName: 'each-first-lower-double-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER__aSDF__yXCV',
        },
        {
            commandName: 'upper-kebap-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER-ASDF-YXCV',
        },
        {
            commandName: 'lower-kebap-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer-asdf-yxcv',
        },
        {
            commandName: 'each-first-upper-kebap-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer-Asdf-Yxcv',
        },
        {
            commandName: 'each-first-lower-kebap-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER-aSDF-yXCV',
        },
        {
            commandName: 'upper-space-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER ASDF YXCV',
        },
        {
            commandName: 'lower-space-case',
            given: 'Qwer Asdf Yxcv',
            expected: 'qwer asdf yxcv',
        },
        {
            commandName: 'each-first-upper-space-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer Asdf Yxcv',
        },
        {
            commandName: 'each-first-lower-space-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER aSDF yXCV',
        },
        {
            commandName: 'upper-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER.ASDF.YXCV',
        },
        {
            commandName: 'lower-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer.asdf.yxcv',
        },
        {
            commandName: 'each-first-upper-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer.Asdf.Yxcv',
        },
        {
            commandName: 'each-first-lower-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER.aSDF.yXCV',
        },
        {
            commandName: 'upper-camel-case',
            given: 'qwer asdf yxcv',
            expected: 'QwerAsdfYxcv',
        },
        {
            commandName: 'lower-camel-case',
            given: 'qwer asdf yxcv',
            expected: 'qwerAsdfYxcv',
        },
        {
            commandName: 'lower-inverse-camel-case',
            given: 'qwer asdf yxcv',
            expected: 'qWERaSDFyXCV',
        },
        {
            commandName: 'upper-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER ASDF YXCV',
        },
        {
            commandName: 'lower-case',
            given: 'Qwer Asdf Yxcv',
            expected: 'qwer asdf yxcv',
        },
        {
            commandName: 'upper-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER+ASDF+YXCV',
        },
        {
            commandName: 'lower-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer+asdf+yxcv',
        },
        {
            commandName: 'each-first-upper-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer+Asdf+Yxcv',
        },
        {
            commandName: 'each-first-lower-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER+aSDF+yXCV',
        },
    ].forEach((testArgs: { commandName: string, given: string, expected: string }) => {

        suite(`with given text and calling command ${testArgs.commandName}`, () => {

            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: testArgs.given,
                });

                await vscode.window.showTextDocument(doc);

                active = vscode.window.activeTextEditor;
                if (!!active) {
                    const range = getRangeOfLines(active);
                    active.selection = new vscode.Selection(range.start, range.end);
                }
            });

            test(`it should convert selection to case`, async () => {

                await vscode.commands.executeCommand(`yet-another-case-changer.${testArgs.commandName}`);
                await sleep(waitForCommand);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, `failed to convert case to ${testArgs.commandName}, result was ${result}`);
            });
        });
    });

    [
        {
            given: 'QWER_ASDF_YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer_asdf_yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer_Asdf_Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER_aSDF_yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QWER__ASDF__YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer__asdf__yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer__Asdf__Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER__aSDF__yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QWER-ASDF-YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer-asdf-yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer-Asdf-Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER-aSDF-yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QWER ASDF YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer asdf yxcv',
            commandName: 'each-first-upper-space-case',
            expected: 'Qwer Asdf Yxcv',
        },
        {
            given: 'Qwer Asdf Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER aSDF yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QWER.ASDF.YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer.asdf.yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer.Asdf.Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER.aSDF.yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QwerAsdfYxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwerAsdfYxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWERaSDFyXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'QWER ASDF YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer asdf yxcv',
            commandName: 'each-first-upper-space-case',
            expected: 'Qwer Asdf Yxcv',
        },
        {
            given: 'QWER+ASDF+YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer+asdf+yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer+Asdf+Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER+aSDF+yXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
    ].forEach((testArgs: { given: string, commandName: string, expected: string }) => {

        suite(`with given case and calling command ${testArgs.commandName}`, () => {

            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: testArgs.given,
                });

                await vscode.window.showTextDocument(doc);

                active = vscode.window.activeTextEditor;
                if (!!active) {
                    const range = getRangeOfLines(active);
                    active.selection = new vscode.Selection(range.start, range.end);
                }
            });

            test(`it should convert selection from given case to another`, async () => {

                await vscode.commands.executeCommand(`yet-another-case-changer.${testArgs.commandName}`);
                await sleep(waitForCommand);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, `failed to convert case to ${testArgs.commandName}, result was ${result}`);
            });
        });
    });

    suite('with multiple lines selected (multi-cursor selection)', () => {

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: 'qwer asdf yxcv\nasdf qwer yxcv yxcv',
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range1 = getRangeOfLines(active, 0, 0);
                const range2 = getRangeOfLines(active, 1, 1);
                active.selections = [ 
                    new vscode.Selection(range1.start, range1.end),
                    new vscode.Selection(range2.start, range2.end),
                ];
            }
        });

        test(`it should convert multiple selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-changer.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === 'QWER_ASDF_YXCV\nASDF_QWER_YXCV_YXCV', `failed to convert case to upper-snake-case, result was ${result}`);
        });
    });

    suite('with multiple lines selected (single selection)', () => {

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: 'qwer asdf yxcv\nasdf qwer yxcv yxcv',
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = getRangeOfLines(active, 0, 1);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test(`it should convert multiple selections line by line`, async () => {

            await vscode.commands.executeCommand('yet-another-case-changer.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === 'QWER_ASDF_YXCV\nASDF_QWER_YXCV_YXCV', `failed to convert case to upper-snake-case, result was ${result}`);
        });
    });

    suite('with multiple lines selected (multi-cursor multiline selections)', () => {

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: 'qwer asdf yxcv\nasdf qwer yxcv yxcv\nyxcv asdf qwer\nqwer yxcv asdf',
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range1 = getRangeOfLines(active, 0, 1);
                const range2 = getRangeOfLines(active, 2, 3);
                active.selections = [ 
                    new vscode.Selection(range1.start, range1.end),
                    new vscode.Selection(range2.start, range2.end),
                ];
            }
        });

        test(`it should convert multiple multiline selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-changer.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 3);
            const result = active?.document.getText(range);
            assert(result === 'QWER_ASDF_YXCV\nASDF_QWER_YXCV_YXCV\nYXCV_ASDF_QWER\nQWER_YXCV_ASDF', `failed to convert case to upper-snake-case, result was ${result}`);
        });
    });
});

function getRangeOfLines(active: vscode.TextEditor | undefined, startLineIndex: number = 0, endLineIndex: number = 0) {

    const startLine = active?.document.lineAt(startLineIndex);
    const endLine = active?.document.lineAt(endLineIndex);
    return new vscode.Range(startLineIndex, startLine?.range?.start?.character ?? 0, endLineIndex, endLine?.range?.end?.character ?? 0);
}

function sleep(time: number): Promise<void> {

    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
