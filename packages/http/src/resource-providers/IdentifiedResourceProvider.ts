import { joinPath } from "../utils/formatters";
import AbstractResourceProvider from "./AbstractResourceProvider";
import FeatureResourceProvider from "./FeatureResourceProvider";
import CallableResourceProvider from "./CallableResourceProvider";
import StatefulResourceProvider from "./StatefulResourceProvider";
import { IHttpPackagedResource } from "../models/HttpPackagedResource";

export type ExtendedIdentifiedResourceProvider<
  T extends RuffHttpResource = any,
  AR extends string = any,
  AC extends string = any,
> = IdentifiedResourceProvider<T, AR, AC> &
  Record<AR, RuffFeatureResourceGetter & FeatureResourceProvider> &
  Record<AC, RuffResourceCaller>;

export type IdentifiableResourceProvider<T extends RuffHttpResource = any, AR extends string = any,
  AC extends string = any,> = (
    idOrKeys: IdOrKeys
  ) => ExtendedIdentifiedResourceProvider<T, AR, AC>;

export default class IdentifiedResourceProvider<
  T extends RuffHttpResource = any,
  AR extends string = any,
  AC extends string = any,
> extends AbstractResourceProvider {
  static defineProvider<T extends RuffHttpResource = any, AR extends string = any,
    AC extends string = any,>(
      name: string,
      idOrKeys: IdOrKeys,
      options: Readonly<RuffResourceProviderDefinationOptions<T, never, AR | AC>>,
      query: RuffHttpQueryModel
    ) {
    const provider = new IdentifiedResourceProvider<T, AR, AC>(name, idOrKeys, options, query) as ExtendedIdentifiedResourceProvider<T, AR, AC>;
    const { client, resource } = options;
    const props = resource["/**/"];

    if (props !== undefined) {
      (Object.keys(props) as Array<AR | AC>).forEach((propname) => {
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
    options: RuffResourceProviderDefinationOptions<T, never, AR | AC>,
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

  async get<DT extends RuffHttpResource = T>(): Promise<IHttpPackagedResource<DT, any>> {
    return StatefulResourceProvider.prototype.get.call(this, this._idOrKeys) as Promise<IHttpPackagedResource<DT, any>>
  }

  async set(payload: T, partially: boolean = false) {
    return StatefulResourceProvider.prototype.set.call(this, this._idOrKeys, payload, partially)
  }

  async drop() {
    return StatefulResourceProvider.prototype.drop.call(this, this._idOrKeys)
  }
}
