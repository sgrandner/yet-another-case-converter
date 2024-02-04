import { ApostropheHandling } from "../_domain/apostrophe-handling";

export const MESSAGES = {
    EDIT_GLOBAL_SETTINGS: 'Do you want to continue to edit the global settings?',
    RELOAD_FOR_SETTINGS: 'Reload VS Code to apply changes in settings ?',
    APOSTROPHE_HANDLING_TYPE: 'The selected text contains apostrophes. How should I handle them?',
    APOSTROPHE_HANDLING_SAVE: 'Lorem Ipsum',
};

export const MESSAGE_OPTIONS = {
    YES: 'Yes',
    NO: 'No',
    DONT_ASK_AGAIN: 'Don\'t ask again',
    KEEP: 'Keep',
    REMOVE: 'Remove',
    HANDLE_AS_SEPARATOR_WITHIN_WORD: 'As separator in words',
    CANCEL: 'Cancel',
};

export function getApostropheHandlingTypeByMessage(message: string | undefined) {

    let type: ApostropheHandling | undefined;

    switch (message) {
        case MESSAGE_OPTIONS.KEEP:
            type = 'KEEP';
            break;
        case MESSAGE_OPTIONS.REMOVE:
            type = 'REMOVE';
            break;
        case MESSAGE_OPTIONS.HANDLE_AS_SEPARATOR_WITHIN_WORD:
            type = 'HANDLE_AS_SEPARATOR_WITHIN_WORD';
            break;
        case MESSAGE_OPTIONS.CANCEL:
            type = 'CANCEL';
            break;
        default:
            type = undefined;
    }

    return type;
}
