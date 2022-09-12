import { ResourceMethod } from "../utils/resource-methods";
import { formatQueryCondition, joinPath } from "../utils/formatters";
import IdentifiedResource, {
  IdentifiableResource
} from "./IdentifiedResource";
import StatefulResource from "./StatefulResource";
import CallableResource from "./CallableResource";

export type ExtendedResourceInterface<
  T extends RuffHttpResource = any,
  S extends string = any,
  A extends string = any
> = IdentifiableResource<T, A> &
  StatelessResource<T, S, A> &
  Record<S, IdentifiableResource<T, A> & StatelessResource<T, S, A> & RuffResourceCaller<T>>;

export type FriendlyResourceInterface<
  SR extends string = any,
  SC extends string = any,
  AR extends string = any,
  AC extends string = any,
  T extends RuffHttpResource = any
> = IdentifiableResource<T, AR | AC> &
  StatelessResource<T, any, AR | AC> &
  Record<SR, ExtendedResourceInterface> &
  Record<SC, RuffResourceCaller>;

export default class StatelessResource<
  T extends RuffHttpResource = any,
  S extends string = any,
  A extends string = any
> extends StatefulResource<T, A> {
  static defineResource<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffResourceDefinationOptions<T, S, A>>) {
    const res = new StatelessResource(name, options);
    const identifiable = function createIdentifiableResource(idOrKeys: IdOrKeys) {
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
    const attrs = {} as Record<S, any>;
    if (children !== undefined) {
      (Object.keys(children) as S[]).forEach((childname) => {
        const opts = children[childname];
        if ("method" in opts) {
          attrs[childname] = CallableResource.defineCallApi(childname, {
            client,
            prefix: [res.getFullPath()],
            call: opts,
          });
        } else {
          attrs[childname] = StatelessResource.defineResource(childname, {
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
      $typify: res.$typify.bind(identifiable),
      query: res.query.bind(res),
    } as StatelessResource;

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
      identifiable,
      res,
      bounds
    ) as unknown as ExtendedResourceInterface<T, S, A>;
  }

  private constructor(
    name: string,
    options: RuffResourceDefinationOptions<T, S, A>
  ) {
    super(name, options, {} as RuffHttpQueryModel);
  }

  $typify<
    SR extends string = any,
    SC extends string = any,
    AR extends string = any,
    AC extends string = any,
    TI extends RuffHttpResource = any
  >(): FriendlyResourceInterface<SR, SC, AR, AC, TI> {
    return this as unknown as FriendlyResourceInterface<SR, SC, AR, AC, TI>;
  }

  query(...qs: RuffHttpQueryCondition[]): StatefulResource {
    const condition = formatQueryCondition(...qs);
    return StatefulResource.defineResource<T, A>(
      this._path,
      this._options,
      condition as RuffHttpQueryModel
    );
  }
}
