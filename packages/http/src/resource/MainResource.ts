import { ResourceMethod } from "../utils/resource-methods";
import { formatQueryCondition, joinPath } from "../utils/index";
import IdentifiedResource, {
  ExtendedIdentifiedResource,
} from "./IdentifiedResource";
import ModifiedResource from "./ModifiedResource";
import Callables from "./CallableAPIs";

type CallableResource<T = any, A extends string = any> = (
  idOrKeys: IdOrKeys
) => ExtendedIdentifiedResource<T, A>;

export type ExtendedMainResource<
  T = any,
  M extends string = any,
  A extends string = any
> = CallableResource<T, A> &
  MainResource<T, M, A> &
  Record<M, CallableResource<T, A> & MainResource<T, M, A> & CallableAPI<T>>;

type FriendlyMainResource<
  MR extends string = any,
  MC extends string = any,
  AR extends string = any,
  AC extends string = any,
  T = any
> = CallableResource<T, AR | AC> &
  MainResource<T> &
  Record<MR, ExtendedMainResource> &
  Record<MC, CallableAPI>;

export default class MainResource<
  T = any,
  M extends string = any,
  A extends string = any
> extends ModifiedResource<T, A> {
  static createResource<
    T = any,
    M extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffCreateResourceOptions<T, M, A>>) {
    const res = new MainResource(name, options);
    const callable = function CallableResource(idOrKeys: IdOrKeys) {
      return IdentifiedResource.createResource<T, A>(
        name,
        idOrKeys,
        options,
        {} as RuffPageableResourcesQueryModel
      );
    };
    const { client, resource, config } = options;

    const methods = resource.methods;
    const children = resource["/"];
    const attrs = {} as Record<M, any>;
    if (children !== undefined) {
      (Object.keys(children) as M[]).forEach((childname) => {
        const opts = children[childname];
        if ("method" in opts) {
          attrs[childname] = Callables.createApi(childname, {
            client,
            prefix: res.getFullPath(),
            call: opts,
          });
        } else {
          attrs[childname] = MainResource.createResource(childname, {
            client,
            config,
            prefix: res.getFullPath(),
            resource: opts,
          });
        }
      });
    }

    const bounds = {
      setPrefix: res.setPrefix.bind(callable),
      getPrefix: res.getPrefix.bind(callable),
      getFullPath: res.getFullPath.bind(callable),
      idealize: res.idealize.bind(callable),
      query: res.query.bind(callable),
    } as MainResource;

    if (methods?.includes(ResourceMethod.GET)) {
      bounds.get = res.get.bind(callable);
    }

    if (methods?.includes(ResourceMethod.POST)) {
      bounds.post = res.post.bind(callable);
    }

    if (methods?.includes(ResourceMethod.LIST)) {
      bounds.list = res.list.bind(callable);
    }

    if (methods?.includes(ResourceMethod.POST)) {
      bounds.post = res.post.bind(callable);
    }

    // Object.assign(res, attrs);
    return Object.assign(
      callable,
      res,
      attrs,
      bounds
    ) as unknown as ExtendedMainResource<T, M, A>;
  }

  private constructor(
    name: string,
    options: RuffCreateResourceOptions<T, M, A>
  ) {
    super(name, options, {} as RuffPageableResourcesQueryModel);
  }

  idealize<
    MR extends string = any,
    MC extends string = any,
    AR extends string = any,
    AC extends string = any,
    TI = any
  >(): FriendlyMainResource<MR, MC, AR, AC, TI> {
    return this as unknown as FriendlyMainResource<MR, MC, AR, AC, TI>;
  }

  getFullPath(): string {
    return joinPath([this._prefix, this._path]);
  }

  query(...qs: RuffHttpQueryCondition[]): ModifiedResource {
    const condition = formatQueryCondition(...qs);
    return ModifiedResource.createResource<T, A>(
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
