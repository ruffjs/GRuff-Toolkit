import { AxiosResponse } from "axios";
import { joinPath } from "../utils";
import AbstractBaseResource from "./AbstractBaseResource";
import AffiliatedResource from "./AffiliatedResource";
import CallableAPIs from "./CallableAPIs";
import ModifiedResource from "./ModifiedResource";

export type ExtendedIdentifiedResource<
  T extends RuffHttpResource = any,
  A extends string = any
> = IdentifiedResource<T, A> &
  Record<A, RuffAffiliatedResourceGetter & AffiliatedResource> &
  Record<A, RuffCallableAPI>;

export type CallableResource<T extends RuffHttpResource = any, A extends string = any> = (
  idOrKeys: IdOrKeys
) => ExtendedIdentifiedResource<T, A>;

export default class IdentifiedResource<
  T extends RuffHttpResource = any,
  A extends string = any
> extends AbstractBaseResource {
  static defineResource<T extends RuffHttpResource = any, A extends string = any>(
    name: string,
    idOrKeys: IdOrKeys,
    options: Readonly<RuffResourceDefinationOptions<T, never, A>>,
    query: RuffHttpQueryModel
  ) {
    const ref = new IdentifiedResource<T, A>(name, idOrKeys, options, query) as ExtendedIdentifiedResource<T, A>;
    const { client, resource, config } = options;
    const props = resource["/**/"];

    if (props !== undefined) {
      (Object.keys(props) as A[]).forEach((propname) => {
        const propConf = props[propname];
        if ("method" in propConf) {
          (ref as AnyRecord)[propname] = CallableAPIs.defineApi(propname, {
            client,
            prefix: ref.getPathAndIdentity(),
            call: propConf,
          });
        } else {
          (ref as AnyRecord)[propname] =
            AffiliatedResource.defineResource(
              propname,
              ref,
              propConf
            );
        }
      });
    }
    return ref;
  }

  private _idOrKeys: IdOrKeys;

  private constructor(
    name: string,
    idOrKeys: IdOrKeys,
    options: RuffResourceDefinationOptions<T, never, A>,
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

  query(...qs: RuffHttpQueryCondition[]): IdentifiedResource {
    return ModifiedResource.prototype.query.apply(this, qs) as unknown as IdentifiedResource
  }

  async get(): Promise<AxiosResponse<RuffHttpResponse<T>, any>> {
    return ModifiedResource.prototype.get.call(this, this._idOrKeys)
  }

  async set(payload: T, partially: boolean) {
    return ModifiedResource.prototype.set.call(this, this._idOrKeys, payload, partially)
  }

  async drop() {
    return ModifiedResource.prototype.drop.call(this, this._idOrKeys)
  }
}
