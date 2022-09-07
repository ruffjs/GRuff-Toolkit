import { ResourceMethod } from "../utils/resource-methods";
import { formatQueryCondition, joinPath } from "../utils/index";
import IdentifiedResource, {
  CallableResource
} from "./IdentifiedResource";
import ModifiedResource from "./ModifiedResource";
import CallableAPIs from "./CallableAPIs";

export type ExtendedMainResource<
  T extends RuffHttpResource = any,
  M extends string = any,
  A extends string = any
> = CallableResource<T, A> &
  MainResource<T, M, A> &
  Record<M, CallableResource<T, A> & MainResource<T, M, A> & RuffCallableAPI<T>>;

type FriendlyMainResource<
  MR extends string = any,
  MC extends string = any,
  AR extends string = any,
  AC extends string = any,
  T extends RuffHttpResource = any
> = CallableResource<T, AR | AC> &
  MainResource<T, any, AR | AC> &
  Record<MR, ExtendedMainResource> &
  Record<MC, RuffCallableAPI>;

export default class MainResource<
  T extends RuffHttpResource = any,
  M extends string = any,
  A extends string = any
> extends ModifiedResource<T, A> {
  static defineResource<
    T extends RuffHttpResource = any,
    M extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffResourceDefinationOptions<T, M, A>>) {
    const res = new MainResource(name, options);
    const callable = function CallableResource(idOrKeys: IdOrKeys) {
      return IdentifiedResource.defineResource<T, A>(
        name,
        idOrKeys,
        options,
        {} as RuffHttpQueryModel
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
          attrs[childname] = CallableAPIs.defineApi(childname, {
            client,
            prefix: res.getFullPath(),
            call: opts,
          });
        } else {
          attrs[childname] = MainResource.defineResource(childname, {
            client,
            config,
            prefix: res.getFullPath(),
            resource: opts,
          });
        }
      });
    }

    Object.assign(res, attrs);

    const bounds = {
      setPrefix: res.setPrefix.bind(res),
      getPrefix: res.getPrefix.bind(res),
      getFullPath: res.getFullPath.bind(res),
      $typify: res.$typify.bind(callable),
      query: res.query.bind(res),
    } as MainResource;

    if (methods?.includes(ResourceMethod.POST)) {
      bounds.post = res.post.bind(res);
    } else if (methods?.includes(ResourceMethod.UPLOAD)) {
      bounds.upload = res.upload.bind(res);
    }

    if (methods?.includes(ResourceMethod.GET)) {
      bounds.get = res.get.bind(res);
    }

    if (methods?.includes(ResourceMethod.LIST)) {
      bounds.list = res.list.bind(res);
      if (resource.pickable) {
        bounds.pick = res.pick.bind(res);
      }
    }

    if (methods?.includes(ResourceMethod.PUT) || methods?.includes(ResourceMethod.PATCH)) {
      bounds.set = res.set.bind(res);
    }

    if (methods?.includes(ResourceMethod.DELETE)) {
      bounds.drop = res.drop.bind(res);
    }


    return Object.assign(
      callable,
      res,
      bounds
    ) as unknown as ExtendedMainResource<T, M, A>;
  }

  private constructor(
    name: string,
    options: RuffResourceDefinationOptions<T, M, A>
  ) {
    super(name, options, {} as RuffHttpQueryModel);
  }

  $typify<
    MR extends string = any,
    MC extends string = any,
    AR extends string = any,
    AC extends string = any,
    TI extends RuffHttpResource = any
  >(): FriendlyMainResource<MR, MC, AR, AC, TI> {
    return this as unknown as FriendlyMainResource<MR, MC, AR, AC, TI>;
  }

  query(...qs: RuffHttpQueryCondition[]): ModifiedResource {
    const condition = formatQueryCondition(...qs);
    return ModifiedResource.defineResource<T, A>(
      this._path,
      this._options,
      condition as RuffHttpQueryModel
    );
  }
}
