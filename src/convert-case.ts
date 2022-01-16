export function upper(matchedSegment: string): string {

    return matchedSegment.toUpperCase();
}

export function lower(matchedSegment: string): string {

    return matchedSegment.toLowerCase();
}

export function firstUpper(matchedSegment: string): string {

    return matchedSegment.charAt(0).toUpperCase() + matchedSegment.substring(1).toLowerCase();
}

export function firstLower(matchedSegment: string): string {

    return matchedSegment.charAt(0).toLowerCase() + matchedSegment.substring(1).toUpperCase();
}

export function veryFirstUpper(word: string): string {

    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function veryFirstLower(word: string): string {

    return word.charAt(0).toLowerCase() + word.substring(1);
}
