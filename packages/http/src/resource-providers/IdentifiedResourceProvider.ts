import { joinPath } from "../utils/formatters";
import AbstractResourceProvider from "./AbstractResourceProvider";
import FeatureResourceProvider from "./FeatureResourceProvider";
import CallableResourceProvider from "./CallableResourceProvider";
import StatefulResourceProvider from "./StatefulResourceProvider";

export type ExtendedIdentifiedResourceProvider<
  T extends RuffHttpResource = any,
  A extends string = any
> = IdentifiedResourceProvider<T, A> &
  Record<A, RuffFeatureResourceGetter & FeatureResourceProvider> &
  Record<A, RuffResourceCaller>;

export type IdentifiableResourceProvider<T extends RuffHttpResource = any, A extends string = any> = (
  idOrKeys: IdOrKeys
) => ExtendedIdentifiedResourceProvider<T, A>;

export default class IdentifiedResourceProvider<
  T extends RuffHttpResource = any,
  A extends string = any
> extends AbstractResourceProvider {
  static defineProvider<T extends RuffHttpResource = any, A extends string = any>(
    name: string,
    idOrKeys: IdOrKeys,
    options: Readonly<RuffResourceProviderDefinationOptions<T, never, A>>,
    query: RuffHttpQueryModel
  ) {
    const provider = new IdentifiedResourceProvider<T, A>(name, idOrKeys, options, query) as ExtendedIdentifiedResourceProvider<T, A>;
    const { client, resource } = options;
    const props = resource["/**/"];

    if (props !== undefined) {
      (Object.keys(props) as A[]).forEach((propname) => {
        const propConf = props[propname];
        if ("method" in propConf) {
          (provider as AnyRecord)[propname] = CallableResourceProvider.defineCallApi(propname, {
            client,
            prefix: provider.getPathAndIdentity(),
            call: propConf,
          });
        } else {
          (provider as AnyRecord)[propname] =
            FeatureResourceProvider.defineProvider(
              propname,
              provider,
              propConf
            );
        }
      });
    }
    return provider;
  }

  private _idOrKeys: IdOrKeys;

  private constructor(
    name: string,
    idOrKeys: IdOrKeys,
    options: RuffResourceProviderDefinationOptions<T, never, A>,
    query: RuffHttpQueryModel
  ) {
    super(name, options, query);
    this._idOrKeys =
      typeof idOrKeys === "object" && idOrKeys instanceof Array
        ? idOrKeys
        : [idOrKeys];
  }

  getPathAndIdentity(): [string, string] {
    return [joinPath([this._prefix, this._path]), joinPath(this._idOrKeys)];
  }

  getFullPath() {
    console.log(this._prefix, this._path, this._idOrKeys)
    return joinPath([this._prefix, this._path, joinPath(this._idOrKeys)]);
  }

  query(...qs: RuffHttpQueryCondition[]): IdentifiedResourceProvider {
    return StatefulResourceProvider.prototype.query.apply(this, qs) as unknown as IdentifiedResourceProvider
  }

  async get(): Promise<RuffClientResponseContent<T>> {
    return StatefulResourceProvider.prototype.get.call(this, this._idOrKeys)
  }

  async set(payload: T, partially: boolean) {
    return StatefulResourceProvider.prototype.set.call(this, this._idOrKeys, payload, partially)
  }

  async drop() {
    return StatefulResourceProvider.prototype.drop.call(this, this._idOrKeys)
  }
}
