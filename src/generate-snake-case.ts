export function generateSnakeCase(text: string): string {

    const regex = /([A-Z]{0,1}(?<![a-z0-9])[A-Za-z0-9]+)[ ._-]{1}|((?<=[ ._-]{1})[A-Za-z0-9]+)|([A-Za-z][a-z0-9]+|[A-Z0-9])/g;

    const replacedString = text.replace(regex, '$1$2$3_');

    return replacedString.slice(0, replacedString.length - 1);
}
