
export type ArrayWithIsLastGenerator = Generator<{
    value: RegExpMatchArray,
    isLast: boolean | undefined,
}>;

/**
 * Generator function returning a generator (special type of iterator)
 * for the given RegExpMatchArray iterator with entries containing
 * the value and the information whether it is the last entry.
 *
 * Each value contains the whole match (index 0) and the single capturing groups of this match (index >= 1).
 *
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
 *     https://stackoverflow.com/questions/54116774/detect-last-iteration-in-for-of-loop-in-es6-javascript
 *
 * usage example:
 *    const regex = /([a-z]+)-([0-9]+)/;
 *    for (const match of regExpMatchArrayWithIsLast(text.matchAll(regex))) {
 *        const isLast = match.isLast;
 *        console.log(match.value[ 1 ], match.value[ 2 ]);
 *    }
 * @param iterableRegExpMatchArray string or number array
 */
export function* regExpMatchArrayWithIsLast(iterableRegExpMatchArray: IterableIterator<RegExpMatchArray>): ArrayWithIsLastGenerator {

    const iterator = iterableRegExpMatchArray[ Symbol.iterator ]();
    let current = iterator.next();
    let next = iterator.next();

    while (!current.done) {
        yield {
            value: current.value,
            isLast: next.done,
        };
        current = next;
        next = iterator.next();
    }
}
