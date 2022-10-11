import { ResourceMethod } from "../utils/resource-methods";
import { formatQueryCondition } from "../utils/formatters";
import IdentifiedResourceProvider, {
  IdentifiableResourceProvider
} from "./IdentifiedResourceProvider";
import StatefulResourceProvider from "./StatefulResourceProvider";
import CallableResourceProvider from "./CallableResourceProvider";

export type IExtendedResourceProvider<
  T extends RuffHttpResource = any,
  S extends string = any,
  A extends string = any
> = IdentifiableResourceProvider<T, A> &
  StatelessResourceProvider<T, S, A> &
  Record<S, IdentifiableResourceProvider<T, A> & StatelessResourceProvider<T, S, A> & RuffResourceCaller<T>>;

export type IFriendlyResourceProvider<
  SR extends string = any,
  SC extends string = any,
  AR extends string = any,
  AC extends string = any,
  T extends RuffHttpResource = any
> = IdentifiableResourceProvider<T, AR | AC> &
  StatelessResourceProvider<T, any, AR | AC> &
  Record<SR, IExtendedResourceProvider> &
  Record<SC, RuffResourceCaller>;

export default class StatelessResourceProvider<
  T extends RuffHttpResource = any,
  S extends string = any,
  A extends string = any
> extends StatefulResourceProvider<T, A> {
  static defineProvider<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffResourceProviderDefinationOptions<T, S, A>>) {
    const provider = new StatelessResourceProvider(name, options);
    const identifiable = function createIdentifiableResource(idOrKeys: IdOrKeys) {
      return IdentifiedResourceProvider.defineProvider<T, A>(
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
          attrs[childname] = CallableResourceProvider.defineCallApi(childname, {
            client,
            prefix: [provider.getFullPath()],
            call: opts,
          });
        } else {
          attrs[childname] = StatelessResourceProvider.defineProvider(childname, {
            client,
            config,
            prefix: provider.getFullPath(),
            resource: opts,
          });
        }
      });
    }

    Object.assign(provider, attrs);

    const bounds = {
      setPrefix: provider.setPrefix.bind(provider),
      getPrefix: provider.getPrefix.bind(provider),
      getFullPath: provider.getFullPath.bind(provider),
      $typify: provider.$typify.bind(identifiable),
      query: provider.query.bind(provider),
    } as StatelessResourceProvider;

    if (methods?.includes(ResourceMethod.POST)) {
      bounds.post = provider.post.bind(provider);
    } else if (methods?.includes(ResourceMethod.UPLOAD)) {
      bounds.upload = provider.upload.bind(provider);
    }

    if (methods?.includes(ResourceMethod.GET)) {
      bounds.get = provider.get.bind(provider);
    }

    if (methods?.includes(ResourceMethod.LIST)) {
      bounds.list = provider.list.bind(provider);
      if (resource.pickable) {
        bounds.pick = provider.pick.bind(provider);
      }
    }

    if (methods?.includes(ResourceMethod.PUT) || methods?.includes(ResourceMethod.PATCH)) {
      bounds.set = provider.set.bind(provider);
    }

    if (methods?.includes(ResourceMethod.DELETE)) {
      bounds.drop = provider.drop.bind(provider);
    }


    return Object.assign(
      identifiable,
      provider,
      bounds
    ) as unknown as IExtendedResourceProvider<T, S, A>;
  }

  private constructor(
    name: string,
    options: RuffResourceProviderDefinationOptions<T, S, A>
  ) {
    super(name, options, {} as RuffHttpQueryModel);
  }

  $typify<
    SR extends string = any,
    SC extends string = any,
    AR extends string = any,
    AC extends string = any,
    TI extends RuffHttpResource = any
  >(): IFriendlyResourceProvider<SR, SC, AR, AC, TI> {
    return this as unknown as IFriendlyResourceProvider<SR, SC, AR, AC, TI>;
  }

  query(...qs: RuffHttpQueryCondition[]): StatefulResourceProvider {
    const condition = formatQueryCondition(...qs);
    return StatefulResourceProvider.defineProvider<T, A>(
      this._path,
      this._options,
      condition as RuffHttpQueryModel
    );
  }
}
