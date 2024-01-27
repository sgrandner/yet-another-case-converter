import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

suite('settings commands', () => {

    let activateCommandsMessageStub: sinon.SinonStub;
    let errorMessageStub: sinon.SinonStub;
    let getConfigStub: sinon.SinonStub;
    let inspectStub: sinon.SinonStub;
    let updateStub: sinon.SinonStub;

    setup(() => {
        activateCommandsMessageStub = sinon.stub(vscode.window, 'showInformationMessage');
        activateCommandsMessageStub.resolves();

        errorMessageStub = sinon.stub(vscode.window, 'showErrorMessage');

        inspectStub = sinon.stub();
        updateStub = sinon.stub();

        // NOTE It is important to mock configuration.update() ! Otherwise it might change the real settings.
        const configStub = {
            inspect: inspectStub,
            update: updateStub,
        };

        getConfigStub = sinon.stub(vscode.workspace, 'getConfiguration');
        getConfigStub.returns(configStub);
    });

    teardown(async () => {
        activateCommandsMessageStub.restore();
        errorMessageStub.restore();
        getConfigStub.restore();
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
                activateCommandsMessageStub.resolves('Yes');
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                            await sleep(200);
                        });

                        test('it should call "showInformationMessage"', () => {

                            assert.ok(activateCommandsMessageStub.calledOnceWith(
                                'Do you want to continue to edit the global settings?',
                                'Yes',
                                'No',
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
                    await sleep(200);

                    assert.ok(errorMessageStub.calledWith(
                        'Failed to update convert commands entries in settings !',
                    ));
                });
            });
        });

        suite('with message will resolve to "No"', () => {

            setup(() => {
                activateCommandsMessageStub.resolves('No');
            });

            suite('with calling command "activate-all-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-all-commands');
                    await sleep(200);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(activateCommandsMessageStub.calledOnceWith(
                        'Do you want to continue to edit the global settings?',
                        'Yes',
                        'No',
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "activate-most-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-most-commands');
                    await sleep(200);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(activateCommandsMessageStub.calledOnceWith(
                        'Do you want to continue to edit the global settings?',
                        'Yes',
                        'No',
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "activate-important-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.activate-important-commands');
                    await sleep(200);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(activateCommandsMessageStub.calledOnceWith(
                        'Do you want to continue to edit the global settings?',
                        'Yes',
                        'No',
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });

            suite('with calling command "deactivate-all-commands"', () => {

                setup(async () => {
                    await vscode.commands.executeCommand('yet-another-case-converter.deactivate-all-commands');
                    await sleep(200);
                });

                test('it should call "showInformationMessage"', () => {

                    assert.ok(activateCommandsMessageStub.calledOnceWith(
                        'Do you want to continue to edit the global settings?',
                        'Yes',
                        'No',
                    ));
                });

                test('it should not call update convert command settings', () => {

                    assert.ok(updateStub.notCalled);
                });
            });
        });
    });
});

function sleep(time: number): Promise<void> {

    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
