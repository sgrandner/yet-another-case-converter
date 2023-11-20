import { VeryFirstCaseConversion } from "./case-conversion";

export interface CommandConfig {
    commandName: string ;
    separator: string;
    segmentCaseConversion: (matchedSegment: string) => string;
    veryFirstCaseConversion: VeryFirstCaseConversion;
}
