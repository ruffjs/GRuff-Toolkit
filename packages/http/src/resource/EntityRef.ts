import { joinPath } from "../utils";
import AbsoluteBase from "./AbsoluteBase";
import Belonging from "./Belonging";
import Callables from "./Callables";

export type ExtendedEntityRef<
  B extends string = any,
  A extends string = any
> = EntityRef & Record<B, CallableBelonging & Belonging> & Record<A, Command>;

export default class EntityRef<
  B extends string = any,
  A extends string = any
> extends AbsoluteBase {
  static createRef<B extends string = any, A extends string = any>(
    name: string,
    idOrKeys: IdOrKeys,
    options: Readonly<RuffEntityOptions<never, never, B, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    const ref = new EntityRef(name, idOrKeys, options, query);
    const { client, resource, config } = options;
    const { attrs, acts } = resource;
    // console.log(attrs);
    if (attrs !== undefined) {
      (Object.keys(attrs) as B[]).forEach((attrname) => {
        (ref as AnyRecord)[attrname] = Belonging.createBelonging(
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
          prefix: ref.getBelongingsPrefix(),
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
    options: RuffEntityOptions<B, A>,
    query: RuffPageableResourcesQueryModel
  ) {
    // console.log("Create Entity Ref", name, idOrKeys);
    super(name, options, query);
    this._idOrKeys =
      typeof idOrKeys === "object" && idOrKeys instanceof Array
        ? idOrKeys
        : [idOrKeys];
  }

  getBelongingsPrefix() {
    return joinPath([this._prefix, this._dirname, joinPath(this._idOrKeys)]);
  }

  async get() {
    try {
      const { data } = await this._client.$getEntityByKeys(
        joinPath([this._prefix, this._dirname]),
        this._idOrKeys,
        this._query
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
