import { Separator } from './_domain/separator';

export function generateCase(text: string, separator: Separator): string {

    const regex = /([A-Z]{0,1}(?<![a-z0-9])[A-Za-z0-9]+)[ ._-]{1}|((?<=[ ._-]{1})[A-Za-z0-9]+)|([A-Za-z][a-z0-9]+|[A-Z0-9])/g;

    const replacedString = text.replace(regex, `$1$2$3${separator}`);

    return replacedString.slice(0, replacedString.length - 1);
}
