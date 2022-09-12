type Scalar = boolean | number | string;
type ScalarValue = boolean | number | string | null;
type bool = 0 | 1;
type TimeStamp = number;
type ISOTime = string;

type AnyArray<T = any> = Array<T>;
type AnyList<T = any> = Array<T>;
type AnyFn<R = any, A extends AnyArray = any[]> = (...args: A) => R;
type AnyRecord<T = any> = Record<string, T>;

type ScalarRecord = Record<string, ScalarValue>;
type AnyError = Error & {
  reason?: string;
};
