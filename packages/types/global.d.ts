type AnyArray<T = any> = Array<T>;
type AnyList<T = any> = Array<T>;
type AnyFn<A extends AnyArray = any[], R = any> = (...args: A) => R;
type AnyRecord<T = any> = Record<string, T>;
type AnyError = Error;

type bool = 0 | 1;
type Id = number | string;
type TimeStamp = number;
type ISOTime = string;
