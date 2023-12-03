export type ApostropheHandling = 'keep' | 'remove' | 'handleAsSeparatorWithinWord' | 'cancel';

export const APOSTROPHE_HANDLING_WORDING: { [ key in ApostropheHandling ]: string } = {
    'keep': 'Keep',
    'remove': 'Remove',
    'handleAsSeparatorWithinWord': 'As separator in words',
    'cancel': 'Cancel',
};
