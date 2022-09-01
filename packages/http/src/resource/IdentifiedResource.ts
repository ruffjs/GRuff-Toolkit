import { AxiosResponse } from "axios";
import { joinPath } from "../utils";
import AbstractBaseResource from "./AbstractBaseResource";
import AffiliatedResource from "./AffiliatedResource";
import Callables from "./CallableAPIs";

export type ExtendedIdentifiedResource<
  T = any,
  A extends string = any
> = IdentifiedResource<T, A> &
  Record<A, AffiliatedResourceGetter & AffiliatedResource> &
  Record<A, CallableAPI>;

export default class IdentifiedResource<
  T = any,
  A extends string = any
> extends AbstractBaseResource {
  static createResource<T = any, A extends string = any>(
    name: string,
    idOrKeys: IdOrKeys,
    options: Readonly<RuffCreateResourceOptions<T, never, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    const ref = new IdentifiedResource<T, A>(name, idOrKeys, options, query);
    const { client, resource, config } = options;
    const props = resource["/**/"];

    if (props !== undefined) {
      (Object.keys(props) as A[]).forEach((propname) => {
        const propConf = props[propname];
        if ("method" in propConf) {
          (ref as AnyRecord)[propname] = Callables.createApi(propname, {
            client,
            prefix: ref.getFullPath(),
            call: propConf,
          });
        } else {
          (ref as AnyRecord)[propname] =
            AffiliatedResource.createAffiliatedResource(
              propname,
              ref,
              propConf
            );
        }
      });
    }
    return ref as ExtendedIdentifiedResource<T, A>;
  }

  private _idOrKeys: IdOrKeys;

  private constructor(
    name: string,
    idOrKeys: IdOrKeys,
    options: RuffCreateResourceOptions<T, never, A>,
    query: RuffPageableResourcesQueryModel
  ) {
    super(name, options, query);
    this._idOrKeys =
      typeof idOrKeys === "object" && idOrKeys instanceof Array
        ? idOrKeys
        : [idOrKeys];
  }

  getFullPath() {
    return joinPath([this._prefix, this._path, joinPath(this._idOrKeys)]);
  }

  async get(): Promise<AxiosResponse<RuffHttpResponse<T>, any>> {
    const { data } = await this._client.$get_main_resource(
      [this._prefix, this._path],
      this._idOrKeys,
      this._query
    );
    return data;
  }
}
