import { VeryFirstCaseConversion } from "../_domain/case-conversion";
import { CommandConfig } from "../_domain/command-config";
import { Separator } from "../_domain/separator";
import {
    firstLower,
    firstUpper,
    lower,
    upper,
} from "../convert-case";

export function getCommandsConfig(customSeparator: string): CommandConfig[] {

    return [
        {
            commandName: 'constant-case',
            separator: Separator.snake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'snake-case',
            separator: Separator.snake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'long-screaming-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-pascal-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-camel-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-long-pascal-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'cobol-case',
            separator: Separator.kebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'train-case',
            separator: Separator.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-train-case',
            separator: Separator.kebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'long-screaming-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-train-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'long-camel-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-long-train-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-space-case',
            separator: Separator.space,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-space-case',
            separator: Separator.space,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'title-case',
            separator: Separator.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-space-case',
            separator: Separator.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-title-case',
            separator: Separator.space,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'pascal-case',
            separator: Separator.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-case',
            separator: Separator.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-case',
            separator: Separator.none,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        // NOTE upper-case and lower-case are handled separately

        {
            commandName: 'upper-flat-case',
            separator: Separator.none,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'flat-case',
            separator: Separator.none,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'screaming-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'pascal-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'camel-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'inverse-pascal-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
    ];
}
