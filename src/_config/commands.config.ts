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
            commandName: 'upper-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-snake-case',
            separator: Separator.snake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-double-snake-case',
            separator: Separator.doubleSnake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-kebab-case',
            separator: Separator.kebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-double-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-double-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-upper-double-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-double-kebab-case',
            separator: Separator.doubleKebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-space-case',
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
            commandName: 'each-first-upper-space-case',
            separator: Separator.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-space-case',
            separator: Separator.space,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-dot-case',
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
            commandName: 'each-first-upper-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-dot-case',
            separator: Separator.dot,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'lower-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
        },
        {
            commandName: 'lower-inverse-camel-case',
            separator: Separator.camel,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },

        {
            commandName: 'upper-custom1-case',
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
            commandName: 'each-first-upper-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
        {
            commandName: 'each-first-lower-custom1-case',
            separator: customSeparator,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
        },
    ];
}
