import { AxiosResponse } from "axios";
import { joinPath } from "../utils/formatters";
import AbstractBaseResource from "./AbstractBaseResource";
import AffiliatedResource from "./AffiliatedResource";
import CallableResource from "./CallableResource";
import StatefulResource from "./StatefulResource";

export type ExtendedIdentifiedResource<
  T extends RuffHttpResource = any,
  A extends string = any
> = IdentifiedResource<T, A> &
  Record<A, RuffAffiliatedResourceGetter & AffiliatedResource> &
  Record<A, RuffResourceCaller>;

export type IdentifiableResource<T extends RuffHttpResource = any, A extends string = any> = (
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
          (ref as AnyRecord)[propname] = CallableResource.defineCallApi(propname, {
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
    return StatefulResource.prototype.query.apply(this, qs) as unknown as IdentifiedResource
  }

  async get(): Promise<RuffClientResponseContent<T>> {
    return StatefulResource.prototype.get.call(this, this._idOrKeys)
  }

  async set(payload: T, partially: boolean) {
    return StatefulResource.prototype.set.call(this, this._idOrKeys, payload, partially)
  }

  async drop() {
    return StatefulResource.prototype.drop.call(this, this._idOrKeys)
  }
}
