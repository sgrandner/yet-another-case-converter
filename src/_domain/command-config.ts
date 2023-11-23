import { VeryFirstCaseConversion } from "./case-conversion";
import { Separator } from "./separator";

export interface CommandConfig {
    commandName: string;
    separator: Separator;
    segmentCaseConversion: (matchedSegment: string) => string;
    veryFirstCaseConversion: VeryFirstCaseConversion;
}
