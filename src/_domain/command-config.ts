import { VeryFirstCaseConversion } from "./case-conversion";
import { Separator } from "./separator";

export enum CommandLevel {
    None = 0,
    Important = 1,
    WhyNot = 2,
    AreYouKidding = 3,
}

export interface CommandConfig {
    commandName: string;
    separator: Separator;
    segmentCaseConversion: (matchedSegment: string) => string;
    veryFirstCaseConversion: VeryFirstCaseConversion;
    commandLevel: CommandLevel;
}
