import { VeryFirstCaseConversion } from "../_domain/case-conversion";
import {
    CommandConfig,
    CommandLevel,
} from "../_domain/command-config";
import {
    firstLower,
    firstUpper,
    lower,
    upper,
} from "../convert-case";
import { SEPARATOR } from "./separator.config";

export function getConvertCommandsConfig(customSeparator: string | undefined): CommandConfig[] {

    return [
        {
            commandName: 'constant-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'pascal-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'camel-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'inverse-pascal-snake-case',
            separator: SEPARATOR.snake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'long-screaming-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'long-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'long-pascal-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'long-camel-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'inverse-long-pascal-snake-case',
            separator: SEPARATOR.doubleSnake,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'cobol-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'kebab-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'train-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'camel-kebab-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'inverse-train-case',
            separator: SEPARATOR.kebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'long-screaming-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'long-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'long-train-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'long-camel-kebab-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'inverse-long-train-case',
            separator: SEPARATOR.doubleKebab,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'screaming-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'lower-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'title-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'camel-space-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'inverse-title-case',
            separator: SEPARATOR.space,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'screaming-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'lower-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'pascal-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'camel-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.AreYouKidding,
        },
        {
            commandName: 'inverse-pascal-dot-case',
            separator: SEPARATOR.dot,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'pascal-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'camel-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'inverse-pascal-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },

        {
            commandName: 'upper-case',
            separator: SEPARATOR.wholeWord,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },
        {
            commandName: 'lower-case',
            separator: SEPARATOR.wholeWord,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.Important,
        },

        {
            commandName: 'upper-flat-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'flat-case',
            separator: SEPARATOR.none,
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },

        {
            commandName: 'screaming-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: upper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'lower-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: lower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'pascal-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'camel-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstUpper,
            veryFirstCaseConversion: VeryFirstCaseConversion.lower,
            commandLevel: CommandLevel.WhyNot,
        },
        {
            commandName: 'inverse-pascal-custom1-case',
            separator: {
                name: undefined,
                value: customSeparator,
            },
            segmentCaseConversion: firstLower,
            veryFirstCaseConversion: VeryFirstCaseConversion.none,
            commandLevel: CommandLevel.AreYouKidding,
        },
    ];
}
