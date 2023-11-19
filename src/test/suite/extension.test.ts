import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {

	vscode.window.showInformationMessage('Start all tests.');
    let doc: vscode.TextDocument;
    let active: vscode.TextEditor | undefined;
    let configStub: sinon.SinonStub;

    // NOTE It is necessary to wait for commands to be executed in these tests.
    //      Otherwise tests will fail. However, certain tests may fail sometimes.
    //      Maybe there is a way to get rid of it.
    const waitForCommand = 200;

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
            commandName: 'upper-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER-ASDF-YXCV',
        },
        {
            commandName: 'lower-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer-asdf-yxcv',
        },
        {
            commandName: 'each-first-upper-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer-Asdf-Yxcv',
        },
        {
            commandName: 'each-first-lower-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER-aSDF-yXCV',
        },
        {
            commandName: 'upper-double-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER--ASDF--YXCV',
        },
        {
            commandName: 'lower-double-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer--asdf--yxcv',
        },
        {
            commandName: 'each-first-upper-double-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer--Asdf--Yxcv',
        },
        {
            commandName: 'each-first-lower-double-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER--aSDF--yXCV',
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

                await vscode.commands.executeCommand(`yet-another-case-converter.${testArgs.commandName}`);
                await sleep(waitForCommand);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, failedMsg(testArgs.given, testArgs.commandName, testArgs.expected, result));
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
            given: 'QWER--ASDF--YXCV',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qwer--asdf--yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'Qwer--Asdf--Yxcv',
            commandName: 'lower-space-case',
            expected: 'qwer asdf yxcv',
        },
        {
            given: 'qWER--aSDF--yXCV',
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

                await vscode.commands.executeCommand(`yet-another-case-converter.${testArgs.commandName}`);
                await sleep(waitForCommand);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, failedMsg(testArgs.given, testArgs.commandName, testArgs.expected, result));
            });
        });
    });

    [
        {
            given: 'qwer asdf yxcv42',
            expected: 'QWER_ASDF_YXCV42',
        },
        {
            given: 'qwer asdf yxcv 42',
            expected: 'QWER_ASDF_YXCV_42',
        },
        {
            given: '42qwer asdf yxcv',
            expected: '42QWER_ASDF_YXCV',
        },
        {
            given: '42 qwer asdf yxcv',
            expected: '42_QWER_ASDF_YXCV',
        },
        {
            given: 'qwer asdf42 yxcv',
            expected: 'QWER_ASDF42_YXCV',
        },
        {
            given: 'qwer 42asdf yxcv',
            expected: 'QWER_42ASDF_YXCV',
        },
        {
            given: 'qwer asdf 42 yxcv',
            expected: 'QWER_ASDF_42_YXCV',
        },
        {
            given: '4',
            expected: '4',
        },
        {
            given: '42',
            expected: '42',
        },
        {
            given: '42_4',
            expected: '42_4',
        },
        {
            given: '42_4_4242',
            expected: '42_4_4242',
        },
    ].forEach((testArgs: { given: string, expected: string }) => {

        suite(`with selection containing numbers: ${testArgs.given}`, () => {
    
            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: testArgs.given,
                });
    
                await vscode.window.showTextDocument(doc);
    
                active = vscode.window.activeTextEditor;
                if (!!active) {
                    const range = new vscode.Range(0, 0, 0, testArgs.given.length);
                    active.selection = new vscode.Selection(range.start, range.end);
                }
            });
    
            test('it should convert selection', async () => {
    
                await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                await sleep(waitForCommand);
    
                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, failedMsg(testArgs.given, 'upper-snake-case', testArgs.expected, result));
            });
        });
    });

    suite('with empty selection', () => {

        const given = 'qwer';
        const expected = 'qwer';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 1, 0, 1);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should not change text', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with single character selected', () => {

        const given = 'q';
        const expected = 'Q';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 1);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with single upper character selected', () => {

        const given = 'Q';
        const expected = 'q';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 1);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.lower-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'lower-snake-case', expected, result));
        });
    });

    suite('with first of two characters selected', () => {

        const given = 'qw';
        const expected = 'Qw';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 1);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with last of two characters selected', () => {

        const given = 'qw';
        const expected = 'qW';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 1, 0, 2);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with two characters selected', () => {

        const given = 'qw';
        const expected = 'QW';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 2);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with middle of three characters selected', () => {

        const given = 'qwe';
        const expected = 'qWe';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 1, 0, 2);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with first two of three characters selected', () => {

        const given = 'qwe';
        const expected = 'QWe';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 2);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with last two of three characters selected', () => {

        const given = 'qwe';
        const expected = 'qWE';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 1, 0, 3);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('special cases with separators', () => {

        [
            {
                separator: ' ',
            },
            {
                separator: '.',
            },
            {
                separator: '_',
            },
            {
                separator: '-',
            },
            {
                separator: '  ',
            },
            {
                separator: '..',
            },
            {
                separator: '__',
            },
            {
                separator: '--',
            },
        ].forEach((testArgs: { separator: string }) => {
            
            suite(`with one "${testArgs.separator}" separator selected`, () => {
        
                const given = `${testArgs.separator}`;
                const expected = `${testArgs.separator}`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should not convert separator', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with one "${testArgs.separator}" separator in word selected`, () => {
        
                const given = `q${testArgs.separator}w`;
                const expected = `q${testArgs.separator}w`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 1, 0, 1 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should not convert separator', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with one "${testArgs.separator}" separator at end of word selected`, () => {
        
                const given = `qw${testArgs.separator}`;
                const expected = `qw${testArgs.separator}`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 2, 0, 2 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should not convert separator', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with one "${testArgs.separator}" separator at start of word selected`, () => {
        
                const given = `${testArgs.separator}qw`;
                const expected = `${testArgs.separator}qw`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should not convert separator', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with one "${testArgs.separator}" separator at end of word selected`, () => {
        
                const given = `qw${testArgs.separator}`;
                const expected = `qw${testArgs.separator}`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 2, 0, 2 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should not convert separator', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with word selected starting with "${testArgs.separator}" separator (one letter)`, () => {
        
                const given = `${testArgs.separator}q`;
                const expected = `_Q`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, 1 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should convert selection', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with word selected starting with "${testArgs.separator}" separator (two letters)`, () => {
        
                const given = `${testArgs.separator}qw`;
                const expected = `_QW`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, 2 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should convert selection', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with word selected ending with "${testArgs.separator}" separator (one letter)`, () => {
        
                const given = `q${testArgs.separator}`;
                const expected = `Q_`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, 1 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should convert selection', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        
            suite(`with word selected ending with "${testArgs.separator}" separator (two letters)`, () => {
        
                const given = `qw${testArgs.separator}`;
                const expected = `QW_`;
        
                setup(async () => {
                    doc = await vscode.workspace.openTextDocument({
                        content: given,
                    });
        
                    await vscode.window.showTextDocument(doc);
        
                    active = vscode.window.activeTextEditor;
                    if (!!active) {
                        const range = new vscode.Range(0, 0, 0, 2 + testArgs.separator.length);
                        active.selection = new vscode.Selection(range.start, range.end);
                    }
                });
        
                test('it should convert selection', async () => {
        
                    await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                    await sleep(waitForCommand);
        
                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
                });
            });
        });
    });

    suite('with camel-case word selected ending with one upper character', () => {

        const given = 'qwerAsdfY';
        const expected = `QWER_ASDF_Y`;

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 0, 0, 9);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    [
        {
            lineBreak: '\n',
        },
        {
            lineBreak: '\r\n',
        },
    ].forEach((testArgs: { lineBreak: string }) => {

        suite('with multiple lines selected (multi-cursor selection)', () => {
    
            const given = `qwer asdf yxcv${testArgs.lineBreak}asdf qwer yxcv yxcv`;
            const expected = `QWER_ASDF_YXCV${testArgs.lineBreak}ASDF_QWER_YXCV_YXCV`;

            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: given,
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
    
                await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                await sleep(waitForCommand);
    
                const range = getRangeOfLines(active, 0, 1);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
            });
        });
    
        suite('with multiple lines selected (single selection)', () => {
    
            const given = `qwer asdf yxcv${testArgs.lineBreak}asdf qwer yxcv yxcv`;
            const expected = `QWER_ASDF_YXCV${testArgs.lineBreak}ASDF_QWER_YXCV_YXCV`;

            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: given,
                });
    
                await vscode.window.showTextDocument(doc);
    
                active = vscode.window.activeTextEditor;
                if (!!active) {
                    const range = getRangeOfLines(active, 0, 1);
                    active.selection = new vscode.Selection(range.start, range.end);
                }
            });
    
            test(`it should convert multiple selections line by line`, async () => {
    
                await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                await sleep(waitForCommand);
    
                const range = getRangeOfLines(active, 0, 1);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
            });
        });
    
        suite('with multiple lines selected (multi-cursor multiline selections)', () => {
    
            const given = `qwer asdf yxcv${testArgs.lineBreak}asdf qwer yxcv yxcv${testArgs.lineBreak}yxcv asdf qwer${testArgs.lineBreak}qwer yxcv asdf`;
            const expected = `QWER_ASDF_YXCV${testArgs.lineBreak}ASDF_QWER_YXCV_YXCV${testArgs.lineBreak}YXCV_ASDF_QWER${testArgs.lineBreak}QWER_YXCV_ASDF`;

            setup(async () => {
                doc = await vscode.workspace.openTextDocument({
                    content: given,
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
    
                await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
                await sleep(waitForCommand);
    
                const range = getRangeOfLines(active, 0, 3);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
            });
        });
    });

    suite('with selection not at start of line', () => {

        const given = 'qwer asdf yxcv dfgh';
        const expected = 'qwer ASDF_YXCV_DFGH';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 5, 0, 19);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with selection not at start of line and ends before end of line', () => {

        const given = 'qwer asdf yxcv dfgh cvbn';
        const expected = 'qwer ASDF_YXCV_DFGH cvbn';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 5, 0, 19);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection at same position', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with multiple lines selected (multi-cursor selection) and selections not at start of line and end before end of lines', () => {
    
        const given = `qwer asdf yxcv dfgh cvbn\nqwer asdf yxcv dfgh cvbn rtzu`;
        const expected = 'qwer ASDF_YXCV_DFGH cvbn\nqwer asdf YXCV_DFGH_CVBN rtzu';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range1 = new vscode.Range(0, 5, 0, 19);
                const range2 = new vscode.Range(1, 10, 1, 24);
                active.selections = [ 
                    new vscode.Selection(range1.start, range1.end),
                    new vscode.Selection(range2.start, range2.end),
                ];
            }
        });

        test(`it should convert multiple selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with multiple lines selected (multi-line selection) and selection not at start of first line', () => {
    
        const given = 'qwer asdf yxcv dfgh cvbn\nqwer asdf yxcv dfgh cvbn rtzu';
        const expected = 'qwer ASDF_YXCV_DFGH_CVBN\nQWER_ASDF_YXCV_DFGH cvbn rtzu';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 5, 1, 19);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test(`it should convert multiple selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with multiple lines (3) selected (multi-line selection) and selection not at start of first line', () => {
    
        const given = 'qwer asdf yxcv dfgh cvbn\nwert sdfg fghj ertz\nwert dfgh tzui hjkl dfgh sdfg';
        const expected = 'qwer ASDF_YXCV_DFGH_CVBN\nWERT_SDFG_FGHJ_ERTZ\nWERT_DFGH_TZUI hjkl dfgh sdfg';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 5, 2, 14);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test(`it should convert multiple selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 2);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
        });
    });

    suite('with multiple lines selected (multi-line selection) and selection not at start of first line and end of selection at start of last line', () => {
    
        const given = 'qwer asdf yxcv dfgh cvbn\nqwer asdf yxcv dfgh cvbn rtzu\nsdfg dfgh fghj';
        const expected = 'qwer ASDF_YXCV_DFGH_CVBN\nQWER_ASDF_YXCV_DFGH_CVBN_RTZU\nsdfg dfgh fghj';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = new vscode.Range(0, 5, 2, 0);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test(`it should convert multiple selections`, async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-snake-case');
            await sleep(waitForCommand);

            const range = getRangeOfLines(active, 0, 2);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'upper-snake-case', expected, result));
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

function failedMsg(given: string, commandName: string, expected: string, result = ''): string {

    return `\nFailed to convert "${given}" to "${commandName}".\nExpected "${expected}".\nResult was "${result}" !\n`;
}
