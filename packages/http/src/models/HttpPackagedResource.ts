import AffiliatedResourceProvider from "../resource-providers/AffiliatedResourceProvider";
import { ExtendedIdentifiedResourceProvider } from "../resource-providers/IdentifiedResourceProvider";

export type ProxiedHttpPackagedResource<T extends RuffHttpResource = any, A extends string = any> = HttpPackagedResource<T, A> & T &
  Record<A, RuffAffiliatedResourceGetter & AffiliatedResourceProvider> &
  Record<A, RuffResourceCaller> & {
    $raw: T
  };

const packageScalarValue = (raw: any) => ({
  value: raw,
  valueOf() { return raw }
})

export default class HttpPackagedResource<T extends RuffHttpResource = any, A extends string = any> {
  static packageResource<T extends RuffHttpResource = any, A extends string = any>(raw: T, ref: ExtendedIdentifiedResourceProvider<T, A>) {
    return new HttpPackagedResource(raw, ref) as ProxiedHttpPackagedResource<T, A>
  }

  private constructor(raw: T, ref: ExtendedIdentifiedResourceProvider<T, A>) {
    (this as any).__proto__ = new Proxy(typeof raw === 'object' ? (raw || packageScalarValue(raw)) : packageScalarValue(raw), {
      get(target: any, p: A) {
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
      set(target: any, p: A, v: any) {
        if (p in target) {
          target[p] = v;
          return true
        }
        return false;
      },
    });
  }
}
