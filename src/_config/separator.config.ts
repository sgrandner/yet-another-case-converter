import {
    Separator,
    SeparatorType,
} from "../_domain/separator";

export const SEPARATOR: { [ key in SeparatorType ]: Separator } = {
    snake: {
        name: 'snake',
        value: '_',
    },
    doubleSnake: {
        name: 'doubleSnake',
        value: '__',
    },
    kebab: {
        name: 'kebab',
        value: '-',
    },
    doubleKebab: {
        name: 'doubleKebab',
        value: '--',
    },
    space: {
        name: 'space',
        value: ' ',
    },
    dot: {
        name: 'dot',
        value: '.',
    },
    none: {
        name: 'none',
        value: '',
    },
};
