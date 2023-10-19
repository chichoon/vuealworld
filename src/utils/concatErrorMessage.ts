export function concatErrorMessage(errorObj: Record<string, string>): string {
  const keys = Object.keys(errorObj);

  return keys.reduce((acc, cur) => {
    return acc + `\n${cur}: ${errorObj[cur]}`;
  }, '');
}
