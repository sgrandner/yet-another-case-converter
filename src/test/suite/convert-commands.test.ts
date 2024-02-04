import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { ApostropheHandling } from '../../_domain/apostrophe-handling';
import {
    MESSAGE_OPTIONS,
    MESSAGES,
} from '../../_wording/messages';
import { sleep } from '../utils/sleep';
import { WAIT_FOR_COMMAND } from './config';

suite('convert commands', () => {

    let doc: vscode.TextDocument;
    let active: vscode.TextEditor | undefined;
    let getConfigStub: sinon.SinonStub;
    let getStub: sinon.SinonStub;
    let inspectStub: sinon.SinonStub;
    let updateStub: sinon.SinonStub;

    const INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE = [
        MESSAGES.APOSTROPHE_HANDLING_TYPE,
        MESSAGE_OPTIONS.KEEP,
        MESSAGE_OPTIONS.REMOVE,
        MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD,
        MESSAGE_OPTIONS.CANCEL,
    ];

    const INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE = [
        MESSAGES.APOSTROPHE_HANDLING_SAVE,
        MESSAGE_OPTIONS.YES,
        MESSAGE_OPTIONS.NO,
        MESSAGE_OPTIONS.DONT_ASK_AGAIN,
    ];

    setup(() => {

        getStub = sinon.stub();
        inspectStub = sinon.stub();
        updateStub = sinon.stub();

        const configStub = {
            get: getStub,
            inspect: inspectStub,
            update: updateStub,
        };

        getStub.withArgs('custom1-separator').returns('+');

        getConfigStub = sinon.stub(vscode.workspace, 'getConfiguration');
        getConfigStub.returns(configStub as unknown as vscode.WorkspaceConfiguration);
    });

    teardown(async () => {
        getConfigStub.restore();
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });

    [
        {
            commandName: 'constant-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER_ASDF_YXCV',
        },
        {
            commandName: 'snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer_asdf_yxcv',
        },
        {
            commandName: 'pascal-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer_Asdf_Yxcv',
        },
        {
            commandName: 'camel-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer_Asdf_Yxcv',
        },
        {
            commandName: 'inverse-pascal-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER_aSDF_yXCV',
        },
        {
            commandName: 'long-screaming-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER__ASDF__YXCV',
        },
        {
            commandName: 'long-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer__asdf__yxcv',
        },
        {
            commandName: 'long-pascal-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer__Asdf__Yxcv',
        },
        {
            commandName: 'long-camel-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer__Asdf__Yxcv',
        },
        {
            commandName: 'inverse-long-pascal-snake-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER__aSDF__yXCV',
        },
        {
            commandName: 'cobol-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER-ASDF-YXCV',
        },
        {
            commandName: 'kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer-asdf-yxcv',
        },
        {
            commandName: 'train-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer-Asdf-Yxcv',
        },
        {
            commandName: 'camel-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer-Asdf-Yxcv',
        },
        {
            commandName: 'inverse-train-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER-aSDF-yXCV',
        },
        {
            commandName: 'long-screaming-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER--ASDF--YXCV',
        },
        {
            commandName: 'long-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer--asdf--yxcv',
        },
        {
            commandName: 'long-train-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer--Asdf--Yxcv',
        },
        {
            commandName: 'long-camel-kebab-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer--Asdf--Yxcv',
        },
        {
            commandName: 'inverse-long-train-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER--aSDF--yXCV',
        },
        {
            commandName: 'screaming-space-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER ASDF YXCV',
        },
        {
            commandName: 'lower-space-case',
            given: 'Qwer Asdf Yxcv',
            expected: 'qwer asdf yxcv',
        },
        {
            commandName: 'title-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer Asdf Yxcv',
        },
        {
            commandName: 'camel-space-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer Asdf Yxcv',
        },
        {
            commandName: 'inverse-title-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER aSDF yXCV',
        },
        {
            commandName: 'screaming-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER.ASDF.YXCV',
        },
        {
            commandName: 'lower-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer.asdf.yxcv',
        },
        {
            commandName: 'pascal-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer.Asdf.Yxcv',
        },
        {
            commandName: 'camel-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer.Asdf.Yxcv',
        },
        {
            commandName: 'inverse-pascal-dot-case',
            given: 'qwer asdf yxcv',
            expected: 'qWER.aSDF.yXCV',
        },
        {
            commandName: 'pascal-case',
            given: 'qwer asdf yxcv',
            expected: 'QwerAsdfYxcv',
        },
        {
            commandName: 'camel-case',
            given: 'qwer asdf yxcv',
            expected: 'qwerAsdfYxcv',
        },
        {
            commandName: 'inverse-pascal-case',
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
            commandName: 'upper-flat-case',
            given: 'qwer asdf yxcv',
            expected: 'QWERASDFYXCV',
        },
        {
            commandName: 'flat-case',
            given: 'Qwer Asdf Yxcv',
            expected: 'qwerasdfyxcv',
        },
        {
            commandName: 'screaming-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'QWER+ASDF+YXCV',
        },
        {
            commandName: 'lower-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer+asdf+yxcv',
        },
        {
            commandName: 'pascal-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'Qwer+Asdf+Yxcv',
        },
        {
            commandName: 'camel-custom1-case',
            given: 'qwer asdf yxcv',
            expected: 'qwer+Asdf+Yxcv',
        },
        {
            commandName: 'inverse-pascal-custom1-case',
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
                await sleep(WAIT_FOR_COMMAND);

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
            commandName: 'title-case',
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
            commandName: 'title-case',
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
                await sleep(WAIT_FOR_COMMAND);

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
                    const range = getRangeOfLines(active);
                    active.selection = new vscode.Selection(range.start, range.end);
                }
            });

            test('it should convert selection', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                assert(result === testArgs.expected, failedMsg(testArgs.given, 'constant-case', testArgs.expected, result));
            });
        });
    });

    suite('with selection containing apostrophe', () => {

        const given = 'qwer \'bout don\'t walkin\' asdf\n\'bout walkin\'';

        let apostropheMessageStub: sinon.SinonStub;
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

            apostropheMessageStub = sinon.stub(vscode.window, 'showInformationMessage');
            apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE).resolves();
            apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).resolves();
        });

        teardown(async () => {
            apostropheMessageStub.restore();
        });

        suite('with answer is not saved in settings', () => {

            setup(() => {
                getStub.withArgs('apostrophe-handling').returns(undefined);
            });

            test('it should ask for apostrophe handling', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE).calledOnce);
            });

            [
                {
                    option: MESSAGE_OPTIONS.KEEP,
                    type: 'KEEP' as ApostropheHandling,
                    expected: 'QWER_\'BOUT_DON\'T_WALKIN\'_ASDF\n\'BOUT_WALKIN\'',
                },
                {
                    option: MESSAGE_OPTIONS.REMOVE,
                    type: 'REMOVE' as ApostropheHandling,
                    expected: 'QWER_BOUT_DONT_WALKIN_ASDF\nBOUT_WALKIN',
                },
                {
                    option: MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD,
                    type: 'HANDLE_AS_SEPARATOR_WITHIN_WORD' as ApostropheHandling,
                    expected: 'QWER_BOUT_DON_T_WALKIN_ASDF\nBOUT_WALKIN',
                },
            ].forEach((testArgs: { option: string, type: ApostropheHandling, expected: string }) => {

                suite(`with apostrophe handling is "${testArgs.option}"`, () => {

                    setup(() => {
                        apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE).resolves(testArgs.option);
                    });

                    [
                        {
                            askingAllowed: undefined,
                        },
                        {
                            askingAllowed: true,
                        },
                    ].forEach((testArgs2: { askingAllowed: boolean | undefined }) => {

                        suite('with asking to save answer is allowed', () => {

                            setup(() => {
                                getStub.withArgs('ask-for-apostrophe-handling').returns(testArgs2.askingAllowed);
                            });

                            test('it should ask to save answer to settings', async () => {

                                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                await sleep(WAIT_FOR_COMMAND);

                                assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).calledOnce);
                            });

                            suite(`with answer is ${MESSAGE_OPTIONS.YES}`, () => {

                                setup(() => {
                                    updateStub.resolves();
                                    apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).resolves(MESSAGE_OPTIONS.YES);
                                });

                                test('it should save answer to settings', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    assert.ok(updateStub.calledOnceWith('apostrophe-handling', testArgs.type, true));
                                });

                                test('it should convert selection', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    const range = getRangeOfLines(active, 0, 1);
                                    const result = active?.document.getText(range);
                                    const expected = testArgs.expected;
                                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                                });
                            });

                            suite(`with answer is ${MESSAGE_OPTIONS.NO}`, () => {

                                setup(() => {
                                    updateStub.resolves();
                                    apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).resolves(MESSAGE_OPTIONS.NO);
                                });

                                // NOTE in this case the setting should not exist anyway, however this behavior may change in the future
                                test('it should unset answer in settings', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    assert.ok(updateStub.calledOnceWith('apostrophe-handling', undefined, true));
                                });

                                test('it should convert selection', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    const range = getRangeOfLines(active, 0, 1);
                                    const result = active?.document.getText(range);
                                    const expected = testArgs.expected;
                                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                                });
                            });

                            suite(`with answer is ${MESSAGE_OPTIONS.DONT_ASK_AGAIN}`, () => {

                                setup(() => {
                                    updateStub.resolves();
                                    apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).resolves(MESSAGE_OPTIONS.DONT_ASK_AGAIN);
                                });

                                test('it should not save answer in settings', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    // TODO has mocha or sinon an any matcher for the second argument (undefined, KEEP etc.) !?
                                    assert.ok(updateStub.withArgs('apostrophe-handling', undefined, true).notCalled);
                                });

                                test('it should save no to ask again in settings', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    assert.ok(updateStub.calledOnceWith('ask-for-apostrophe-handling', false, true));
                                });

                                test('it should convert selection', async () => {

                                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                                    await sleep(WAIT_FOR_COMMAND);

                                    const range = getRangeOfLines(active, 0, 1);
                                    const result = active?.document.getText(range);
                                    const expected = testArgs.expected;
                                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                                });
                            });
                        });
                    });

                    suite('with asking to save answer is not allowed', () => {

                        setup(() => {
                            getStub.withArgs('ask-for-apostrophe-handling').returns(false);
                        });

                        test('it should not ask to save answer to settings', async () => {

                            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                            await sleep(WAIT_FOR_COMMAND);

                            assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).notCalled);
                        });

                        test('it should not save answer in settings', async () => {

                            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                            await sleep(WAIT_FOR_COMMAND);

                            // TODO has mocha or sinon an any matcher for the second argument (undefined, KEEP etc.) !?
                            assert.ok(updateStub.withArgs('apostrophe-handling', undefined, true).notCalled);
                        });

                        test('it should convert selection', async () => {

                            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                            await sleep(WAIT_FOR_COMMAND);

                            const range = getRangeOfLines(active, 0, 1);
                            const result = active?.document.getText(range);
                            const expected = testArgs.expected;
                            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                        });
                    });
                });
            });

            suite(`with apostrophe handling is "${MESSAGE_OPTIONS.CANCEL}"`, () => {

                setup(() => {
                    apostropheMessageStub.resolves(MESSAGE_OPTIONS.CANCEL);
                });

                test('it should not ask to save answer to settings', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).notCalled);
                });

                test('it should not convert selection', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active, 0, 1);
                    const result = active?.document.getText(range);
                    const expected = given;
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                });
            });
        });


        [
            {
                option: MESSAGE_OPTIONS.KEEP,
                type: 'KEEP' as ApostropheHandling,
                expected: 'QWER_\'BOUT_DON\'T_WALKIN\'_ASDF\n\'BOUT_WALKIN\'',
            },
            {
                option: MESSAGE_OPTIONS.REMOVE,
                type: 'REMOVE' as ApostropheHandling,
                expected: 'QWER_BOUT_DONT_WALKIN_ASDF\nBOUT_WALKIN',
            },
            {
                option: MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD,
                type: 'HANDLE_AS_SEPARATOR_WITHIN_WORD' as ApostropheHandling,
                expected: 'QWER_BOUT_DON_T_WALKIN_ASDF\nBOUT_WALKIN',
            },
        ].forEach((testArgs: { type: ApostropheHandling, expected: string }) => {

            suite(`with saved apostrophe handling type is ${testArgs.type}`, () => {

                setup(() => {
                    getStub.withArgs('apostrophe-handling').returns(testArgs.type);
                });

                test('it should not ask for apostrophe handling', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE).notCalled);
                });

                test('it should not ask to save answer to settings', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(apostropheMessageStub.withArgs(...INFO_MESSAGE_APOSTROPHE_HANDLING_SAVE).notCalled);
                });

                test('it should convert selection', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active, 0, 1);
                    const result = active?.document.getText(range);
                    const expected = testArgs.expected;
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
                });
            });
        });
    });

    suite('with selection containing apostrophe (camel case)', () => {

        const given = '\'boutDon\'tWalkin\'Asdf';

        let apostropheMessageStub: sinon.SinonStub;
        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = getRangeOfLines(active);
                active.selection = new vscode.Selection(range.start, range.end);
            }

            apostropheMessageStub = sinon.stub(vscode.window, 'showInformationMessage');
            apostropheMessageStub.resolves();
        });

        teardown(async () => {
            apostropheMessageStub.restore();
        });

        test('it should call "showInformationMessage"', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            assert.ok(apostropheMessageStub.calledOnceWith(
                ...INFO_MESSAGE_APOSTROPHE_HANDLING_TYPE,
            ));
        });

        suite(`with apostrophe handling is "${MESSAGE_OPTIONS.KEEP}"`, () => {

            setup(() => {
                apostropheMessageStub.resolves(MESSAGE_OPTIONS.KEEP);
            });

            test('it should convert selection', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                const expected = '\'BOUT_DON\'T_WALKIN\'_ASDF';
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
            });
        });

        suite(`with apostrophe handling is "${MESSAGE_OPTIONS.REMOVE}"`, () => {

            setup(() => {
                apostropheMessageStub.resolves(MESSAGE_OPTIONS.REMOVE);
            });

            test('it should convert selection', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                const expected = 'BOUT_DONT_WALKIN_ASDF';
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
            });
        });

        suite(`with apostrophe handling is "${MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD}"`, () => {

            setup(() => {
                apostropheMessageStub.resolves(MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD);
            });

            test('it should convert selection', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                const expected = 'BOUT_DON_T_WALKIN_ASDF';
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
            });
        });

        suite(`with apostrophe handling is "${MESSAGE_OPTIONS.CANCEL}"`, () => {

            setup(() => {
                apostropheMessageStub.resolves(MESSAGE_OPTIONS.CANCEL);
            });

            test('it should not convert selection', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active);
                const result = active?.document.getText(range);
                const expected = given;
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
            });
        });
    });

    suite('with selection containing apostrophe (wholeWord conversion)', () => {

        const given = 'Convert-To-Upp\'r-CASE';

        setup(async () => {
            doc = await vscode.workspace.openTextDocument({
                content: given,
            });

            await vscode.window.showTextDocument(doc);

            active = vscode.window.activeTextEditor;
            if (!!active) {
                const range = getRangeOfLines(active);
                active.selection = new vscode.Selection(range.start, range.end);
            }
        });

        test('it should convert selection', async () => {

            await vscode.commands.executeCommand('yet-another-case-converter.upper-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            const expected = 'CONVERT-TO-UPP\'R-CASE';
            assert(result === expected, failedMsg(given, 'upper-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.snake-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'snake-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                    await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                    await sleep(WAIT_FOR_COMMAND);

                    const range = getRangeOfLines(active);
                    const result = active?.document.getText(range);
                    assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active, 0, 1);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active, 0, 1);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

                await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
                await sleep(WAIT_FOR_COMMAND);

                const range = getRangeOfLines(active, 0, 3);
                const result = active?.document.getText(range);
                assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active, 0, 1);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active, 0, 2);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
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

            await vscode.commands.executeCommand('yet-another-case-converter.constant-case');
            await sleep(WAIT_FOR_COMMAND);

            const range = getRangeOfLines(active, 0, 2);
            const result = active?.document.getText(range);
            assert(result === expected, failedMsg(given, 'constant-case', expected, result));
        });
    });
});

function getRangeOfLines(active: vscode.TextEditor | undefined, startLineIndex: number = 0, endLineIndex: number = 0) {

    const startLine = active?.document.lineAt(startLineIndex);
    const endLine = active?.document.lineAt(endLineIndex);
    return new vscode.Range(startLineIndex, startLine?.range?.start?.character ?? 0, endLineIndex, endLine?.range?.end?.character ?? 0);
}

function failedMsg(given: string, commandName: string, expected: string, result = ''): string {

    return `\nFailed to convert "${given}" to "${commandName}".\nExpected "${expected}".\nResult was "${result}" !\n`;
}
