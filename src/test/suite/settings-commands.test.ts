import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import {
    MESSAGE_OPTIONS,
    MESSAGES,
} from '../../_wording/messages';
import { sleep } from '../utils/sleep';
import { WAIT_FOR_COMMAND } from './config';

suite('settings commands', () => {

    let informationMessageStub: sinon.SinonStub<any[], any>;
    let errorMessageStub: sinon.SinonStub;
    let getConfigStub: sinon.SinonStub;
    let inspectStub: sinon.SinonStub;
    let updateStub: sinon.SinonStub;
    let inputBoxStub: sinon.SinonStub;
    let executeCommandStub: sinon.SinonStub;

    setup(() => {
        informationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');

        errorMessageStub = sinon.stub(vscode.window, 'showErrorMessage');

        // NOTE only fake reload of vs code window for tests !
        executeCommandStub = sinon.stub(vscode.commands, 'executeCommand');
        executeCommandStub.withArgs('workbench.action.reloadWindow').callsFake(() => console.log('reload window ...'));
        executeCommandStub.callThrough();

        inspectStub = sinon.stub();
        updateStub = sinon.stub();

        // NOTE It is important to mock configuration.update() ! Otherwise it might change the real settings.
        const configStub = {
            inspect: inspectStub,
            update: updateStub,
        };

        getConfigStub = sinon.stub(vscode.workspace, 'getConfiguration');
        getConfigStub.returns(configStub);

        inputBoxStub = sinon.stub(vscode.window, 'showInputBox');
    });

    teardown(async () => {
        informationMessageStub.restore();
        errorMessageStub.restore();
        getConfigStub.restore();
        inputBoxStub.restore();
        executeCommandStub.restore();
    });

    // NOTE This tests the "update" call for the settings. It is mocked in order not to change the real settings !
    //      The default config values correspond to the entries in the package.json.
    //      If the value which will be set by a config command in the settings equals the default value
    //      than "update" will be called with undefined. This removes the settings entry.
    //      If these values are not equal the settings entry will be set explicitly to true or false.
    // TODO This tests the real config from "convert-commands.config.ts". Maybe there is a way
    //      to mock the method which provides the config with dummy data or find another way to provide the config.
    suite('activation or deactivation of convert commands', () => {

        suite('with message will resolve to "Yes"', () => {

            setup(() => {
                informationMessageStub.withArgs(MESSAGES.EDIT_GLOBAL_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves(MESSAGE_OPTIONS.YES);
            });

            suite('with update resolves', () => {

                setup(() => {
                    updateStub.resolves();
                });

                suite('with default value from extension configuration is true', () => {

                    setup(() => {
                        inspectStub.returns({
                            defaultValue: true,
                        });
                    });

                    suite('with calling command "activate-all-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-all-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', undefined, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', undefined, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', undefined, true));
                        });
                    });

                    suite('with calling command "activate-most-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-most-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', undefined, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', undefined, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', false, true));
                        });
                    });

                    suite('with calling command "activate-important-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-important-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', undefined, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', false, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', false, true));
                        });
                    });

                    suite('with calling command "deactivate-all-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.deactivate-all-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', false, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', false, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', false, true));
                        });
                    });
                });

                suite('with default value from extension configuration is false', () => {

                    setup(() => {
                        inspectStub.returns({
                            defaultValue: false,
                        });
                    });

                    suite('with calling command "activate-all-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-all-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', true, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', true, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', true, true));
                        });
                    });

                    suite('with calling command "activate-most-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-most-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', true, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', true, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', undefined, true));
                        });
                    });

                    suite('with calling command "activate-important-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.activate-important-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', true, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', undefined, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', undefined, true));
                        });
                    });

                    suite('with calling command "deactivate-all-commands"', () => {

                        setup(async () => {
                            await vscode.commands.executeCommand('yet-another-case-converter.deactivate-all-commands');
                            await sleep(WAIT_FOR_COMMAND);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(informationMessageStub.calledOnceWith(
                                MESSAGES.EDIT_GLOBAL_SETTINGS,
                                MESSAGE_OPTIONS.YES,
                                MESSAGE_OPTIONS.NO,
                            ));
                        });

                        test('it should update "important" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.constant-case', undefined, true));
                        });

                        test('it should update "why not" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.pascal-snake-case', undefined, true));
                        });

                        test('it should update "are you kidding" convert command settings', () => {

                            assert.ok(updateStub.calledWith('activate.inverse-pascal-snake-case', undefined, true));
                        });
                    });
                });
            });

            suite('with update rejects error', () => {

                setup(() => {
                    updateStub.rejects();
                });

                test('it should show an error message', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.activate-all-commands');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(errorMessageStub.calledOnceWith(
                        'Failed to update convert commands entries in settings !',
                    ));
                });
            });
        });

        suite('with message will resolve to "No"', () => {

            setup(() => {
                informationMessageStub.withArgs(MESSAGES.EDIT_GLOBAL_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves(MESSAGE_OPTIONS.NO);
            });

            suite('with calling command "activate-all-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-all-commands');
                    await sleep(WAIT_FOR_COMMAND);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(informationMessageStub.calledOnceWith(
                        MESSAGES.EDIT_GLOBAL_SETTINGS,
                        MESSAGE_OPTIONS.YES,
                        MESSAGE_OPTIONS.NO,
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "activate-most-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-most-commands');
                    await sleep(WAIT_FOR_COMMAND);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(informationMessageStub.calledOnceWith(
                        MESSAGES.EDIT_GLOBAL_SETTINGS,
                        MESSAGE_OPTIONS.YES,
                        MESSAGE_OPTIONS.NO,
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "activate-important-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-important-commands');
                    await sleep(WAIT_FOR_COMMAND);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(informationMessageStub.calledOnceWith(
                        MESSAGES.EDIT_GLOBAL_SETTINGS,
                        MESSAGE_OPTIONS.YES,
                        MESSAGE_OPTIONS.NO,
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "deactivate-all-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.deactivate-all-commands');
                    await sleep(WAIT_FOR_COMMAND);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(informationMessageStub.calledOnceWith(
                        MESSAGES.EDIT_GLOBAL_SETTINGS,
                        MESSAGE_OPTIONS.YES,
                        MESSAGE_OPTIONS.NO,
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });
        });
    });

    suite('with execute command set-custom-separator', () => {

        suite('with input box resolves with input string and update resolves', () => {

            setup(() => {
                inputBoxStub.resolves('+-');
                updateStub.resolves();
                informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves();
            });

            test('it should show input box', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(inputBoxStub.calledOnceWith({
                    placeHolder: 'custom separator string',
                    value: '',
                }));
            });

            test('it should set custom separator in command settings', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(updateStub.calledWith('custom1-separator', '+-', true));
            });

            test('it should ask for reload', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(informationMessageStub.calledOnceWith(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO));
            });

            suite('with request for reload resolves to "Yes"', () => {

                setup(() => {
                    informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves(MESSAGE_OPTIONS.YES);
                });

                test('it should call reload command', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(executeCommandStub.withArgs('workbench.action.reloadWindow').calledOnce);
                });
            });

            suite('with request for reload resolves to "No"', () => {

                setup(() => {
                    informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves(MESSAGE_OPTIONS.NO);
                });

                test('it should not call reload command', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(executeCommandStub.withArgs('workbench.action.reloadWindow').notCalled);
                });
            });

            suite('with request for reload resolves to undefined', () => {

                setup(() => {
                    informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves(undefined);
                });

                test('it should not call reload command', async () => {

                    await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                    await sleep(WAIT_FOR_COMMAND);

                    assert.ok(executeCommandStub.withArgs('workbench.action.reloadWindow').notCalled);
                });
            });
        });

        suite('with input box resolves with input string and update rejects', () => {

            setup(() => {
                inputBoxStub.resolves('+-');
                updateStub.rejects();
                informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves();
            });

            test('it should set custom separator in command settings', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(updateStub.calledWith('custom1-separator', '+-', true));
            });

            test('it should show error message', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(errorMessageStub.calledOnceWith('Failed to set custom separator !'));
            });
        });

        suite('with input box resolves with empty input string', () => {

            setup(() => {
                inputBoxStub.resolves('');
                informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves();
            });

            test('it should not set custom separator in command settings', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(updateStub.notCalled);
            });
        });

        suite('with input box resolves with undefined (cancel input)', () => {

            setup(() => {
                inputBoxStub.resolves(undefined);
                informationMessageStub.withArgs(MESSAGES.RELOAD_FOR_SETTINGS, MESSAGE_OPTIONS.YES, MESSAGE_OPTIONS.NO).resolves();
            });

            test('it should not set custom separator in command settings', async () => {

                await vscode.commands.executeCommand('yet-another-case-converter.set-custom-separator');
                await sleep(WAIT_FOR_COMMAND);

                assert.ok(updateStub.notCalled);
            });
        });
    });
});
