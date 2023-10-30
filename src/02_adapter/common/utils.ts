import type { Message } from '@/00_domain/common/value';

export function concatErrorMessage(errorObj: Record<string, Message>): Message {
  const keys = Object.keys(errorObj);

  return keys.reduce((acc, cur) => {
    return acc + `\n${cur}: ${errorObj[cur]}`;
  }, '');
}

function returnString(value: string | number) {
  if (typeof value === 'number') return value.toString();
  return value;
}

export function createURLParams(url: string, object?: Record<string, string | number | undefined>): string {
  if (!object) return url;
  const newObj: Record<string, string> = {};
  Object.keys(object).forEach((key) => object[key] && (newObj[key] = returnString(object[key] as string | number)));
  const paramsString = new URLSearchParams(newObj).toString();

  return `${url}?${paramsString}`;
}
