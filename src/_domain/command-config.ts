import { VeryFirstCaseConversion } from "./case-conversion";
import { Separator } from "./separator";

export interface CommandConfig {
    commandName: string;
    separator: Separator | string;
    segmentCaseConversion: (matchedSegment: string) => string;
    veryFirstCaseConversion: VeryFirstCaseConversion;
}
