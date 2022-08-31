import { ResourceMethod } from "../utils/resource-methods";
import { formatQueryCondition, joinPath } from "../utils/index";
import IdentifiedResource, { ExtendedIdentifiedResource } from "./IdentifiedResource";
import ModifiedResource from "./ModifiedResource";
import Callables from "./CallableAPI";

type CallableResource<B extends string = any, A extends string = any> = (
  idOrKeys: IdOrKeys
) => ExtendedIdentifiedResource<B, A>;

export type ExtendedMainResource<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > = CallableResource<B, A> &
  MainResource &
  Record<C, CallableResource & MainResource> &
  Record<X, Callable>;

export default class MainResource<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > extends ModifiedResource<B, A> {
  static createResource<
    C extends string = any,
    X extends string = any,
    B extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffCreateResourceOptions<C, X, B, A>>) {
    const res = new MainResource(name, options);
    const callable = function CallableResource(idOrKeys: IdOrKeys) {
      return IdentifiedResource.createResource(
        name,
        idOrKeys,
        options,
        {} as RuffPageableResourcesQueryModel
      );
    } as unknown as ExtendedMainResource<C, X, B, A>;
    const { client, resource, config } = options;

    const { methods, children, commands } = resource;
    if (children !== undefined) {
      (Object.keys(children) as C[]).forEach((childname) => {
        (callable as AnyRecord)[childname] = (res as AnyRecord)[childname] =
          MainResource.createResource(childname, {
            client,
            config,
            prefix: res.getFullPath(),
            resource: children[childname],
          });
      });
    }
    if (commands !== undefined) {
      (Object.keys(commands) as X[]).forEach((commandname) => {
        (callable as AnyRecord)[commandname] = (res as AnyRecord)[
          commandname
        ] = Callables.createApi(commandname, {
          client,
          prefix: res.getFullPath(),
          command: commands[commandname],
        });
      });
    }

    const bounds = {
      setPrefix: res.setPrefix.bind(res),
      getPrefix: res.getPrefix.bind(res),
      list: res.list.bind(res),
      query: res.query.bind(res),
    } as MainResource;

    if (methods?.includes(ResourceMethod.GET)) {
      bounds.get = res.get.bind(res);
    }

    if (methods?.includes(ResourceMethod.POST)) {
      bounds.post = res.post.bind(res);
    }

    return Object.assign(callable, bounds);
  }

  static idealize<
    CI extends string = any,
    XI extends string = any,
    BI extends string = any,
    AI extends string = any
  >(res: MainResource, options: RuffResourceConfiguration<CI, XI, BI, AI>) {
    return res as ExtendedMainResource<CI, XI, BI, AI>;
  }

  private constructor(name: string, options: RuffCreateResourceOptions<C, X, B, A>) {
    super(name, options, {} as RuffPageableResourcesQueryModel);
  }

  getFullPath(): string {
    return joinPath([this._prefix, this._path]);
  }

  query(...qs: RuffHttpQueryCondition[]): ModifiedResource {
    const condition = formatQueryCondition(...qs);
    return ModifiedResource.createResource(
      this._path,
      this._options,
      condition as RuffPageableResourcesQueryModel
    );
  }

  async post(data: any) {
    return this._client.$create_main_resource(
      joinPath([this._prefix, this._path]),
      data,
      this._query
    );
  }
}
