import { VeryFirstCaseConversion } from "../_domain/case-conversion";
import { CommandConfig } from "../_domain/command-config";
import {
    firstLower,
    firstUpper,
    lower,
    upper,
} from "../convert-case";
import { SEPARATOR } from "./separator.config";

export function getConvertCommandsConfig(customSeparator: string): CommandConfig[] {

    return [
        {
            commandName: 'constant-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'long-screaming-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-pascal-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-camel-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-long-pascal-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'cobol-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'kebab-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'train-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-kebab-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-train-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'long-screaming-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-train-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-camel-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-long-train-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'title-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-title-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'pascal-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-case',
            separator: SEPARATOR.wholeWord,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-case',
            separator: SEPARATOR.wholeWord,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-flat-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'flat-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
    ];
}
