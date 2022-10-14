import FeatureResourceProvider from "../resource-providers/FeatureResourceProvider";
import { ExtendedIdentifiedResourceProvider } from "../resource-providers/IdentifiedResourceProvider";

export type IHttpPackagedResource<
  T extends RuffHttpResource = any,
  AR extends string = any,
  AC extends string = any
> = HttpPackagedResource<T, AR, AC> & T &
  Record<AR, RuffFeatureResourceGetter & FeatureResourceProvider> &
  Record<AC, RuffResourceCaller> & {
    $raw: T
  };

const packageScalarValue = (raw: any) => ({
  value: raw,
  valueOf() { return raw }
})

export default class HttpPackagedResource<
  T extends RuffHttpResource = any,
  AR extends string = any,
  AC extends string = any
> {
  static packageResource<
    T extends RuffHttpResource = any,
    AR extends string = any,
    AC extends string = any
  >(raw: T, ref: ExtendedIdentifiedResourceProvider<T, AR, AC>) {
    return new HttpPackagedResource(raw, ref) as IHttpPackagedResource<T, AR, AC>
  }

  private constructor(raw: T, ref: ExtendedIdentifiedResourceProvider<T, AR, AC>) {
    (this as any).__proto__ = new Proxy(typeof raw === 'object' ? (raw || packageScalarValue(raw)) : packageScalarValue(raw), {
      get(target: any, p: AR | AC) {
        if (p === "$raw") {
          return target;
        }
        if (p in target) {
          return target[p];
        }
        if (p in ref && typeof ref[p] === "function") {
          return ref[p];
        }
        return undefined;
      },
      set(target: any, p: AR | AC, v: any) {
        if (p in target) {
          target[p] = v;
          return true
        }
        return false;
      },
    });
  }
}
