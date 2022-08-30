import { isArray } from "@ruff-web/utils/src/object";

export function capitalize(this: RandomMethods, word: string) {
  return (word + "").charAt(0).toUpperCase() + (word + "").substring(1);
}

export function upper(this: RandomMethods, str: string) {
  return (str + "").toUpperCase();
}

export function lower(this: RandomMethods, str: string) {
  return (str + "").toLowerCase();
}

export function pick<T = any>(
  this: RandomMethods,
  arr: T[],
  minLength: nummeric,
  maxLength: nummeric
) {
  // pick( item1, item2 ... )
  if (!isArray(arr)) {
    arr = [].slice.call(arguments);
    minLength = 1;
    maxLength = 1;
  } else {
    // pick( [ item1, item2 ... ] )
    if (minLength === undefined) minLength = 1;

    // pick( [ item1, item2 ... ], count )
    if (maxLength === undefined) maxLength = minLength;
  }

  if (minLength === 1 && maxLength === 1)
    return arr[this.natural(0, arr.length - 1)];

  return this.shuffle(arr, minLength, maxLength);
}

export function shuffle<T = any>(
  this: RandomMethods,
  arr: T[] = [],
  min?: nummeric,
  max?: nummeric
) {
  const old = arr.slice(0),
    result: T[] = [],
    length = old.length;
  let index = 0;

  for (var i = 0; i < length; i++) {
    index = this.natural(0, old.length - 1);
    result.push(old[index]);
    old.splice(index, 1);
  }

  switch (arguments.length) {
    case 0:
    case 1:
      return result;
    case 2:
      max = min;
    /* falls through */
    case 3:
    default:
      return result.slice(0, this.natural(min as nummeric, max as nummeric));
  }
}

export function repeat<T = any>(item: T | (() => T), time: number = 2) {
  const arr = [];
  for (let index = 0; index < time; index++) {
    arr.push(typeof item === "function" ? (<AnyFn>item)(index) : item);
  }
  return arr;
}
