export type SeparatorType =
    'snake' |
    'doubleSnake' |
    'kebab' |
    'doubleKebab' |
    'space' |
    'dot' |
    'none';

export interface Separator {
    name: SeparatorType | undefined;
    value: string | undefined;
}
