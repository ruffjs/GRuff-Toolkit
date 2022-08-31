import { joinPath } from "../utils";
import AbstractBaseResource from "./AbstractBaseResource";
import AffiliatedResource from "./AffiliatedResource";
import Callables from "./CallableAPI";

export type ExtendedIdentifiedResource<
  B extends string = any,
  A extends string = any
  > = IdentifiedResource & Record<B, AffiliatedResourceGetter & AffiliatedResource> & Record<A, Callable>;

export default class IdentifiedResource<
  B extends string = any,
  A extends string = any
  > extends AbstractBaseResource {
  static createResource<B extends string = any, A extends string = any>(
    name: string,
    idOrKeys: IdOrKeys,
    options: Readonly<RuffCreateResourceOptions<never, never, B, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    const ref = new IdentifiedResource(name, idOrKeys, options, query);
    const { client, resource, config } = options;
    const { attrs, acts } = resource;
    // console.log(attrs);
    if (attrs !== undefined) {
      (Object.keys(attrs) as B[]).forEach((attrname) => {
        (ref as AnyRecord)[attrname] = AffiliatedResource.create_affiliated_resource(
          attrname,
          ref,
          options
        );
      });
    }
    if (acts !== undefined) {
      (Object.keys(acts) as A[]).forEach((actionname) => {
        (ref as AnyRecord)[actionname] = Callables.createApi(actionname, {
          client,
          prefix: ref.getFullPath(),
          command: acts[actionname],
        });
      });
    }
    return ref;
  }

  private _idOrKeys: identity[];

  private constructor(
    name: string,
    idOrKeys: IdOrKeys,
    options: RuffCreateResourceOptions<B, A>,
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

  async get() {
    try {
      const { data } = await this._client.$get_main_resource(
        [this._prefix, this._path],
        this._idOrKeys,
        this._query
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
