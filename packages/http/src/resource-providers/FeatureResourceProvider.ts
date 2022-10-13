import HttpPackagedResource from "../models/HttpPackagedResource";
import { formatQueryCondition, joinPath } from "../utils/formatters";
import { ResourceMethod } from "../utils/resource-methods";
import AbstractResourceProvider from "./AbstractResourceProvider";

export default class FeatureResourceProvider<T extends RuffHttpResource = any> {
  static defineProvider<T extends RuffHttpResource = any>(
    name: string,
    ref: AbstractResourceProvider,
    options: RuffCreateFeatureResourceProviderConfig<T>
  ) {
    const provider = new FeatureResourceProvider<T>(name, ref, options);
    const callable = function RuffFeatureResourceGetter<DT extends RuffHttpResource = T>(subIdOrKeys?: IdOrKeys) {
      return provider.get<DT>(subIdOrKeys);
    };

    const bounds = {
      getPrefix: provider.getPrefix.bind(provider),
      getFullPath: provider.getFullPath.bind(provider),
      query: provider.query.bind(provider),
    } as FeatureResourceProvider;

    if (options.methods?.includes(ResourceMethod.POST)) {
      bounds.post = provider.post.bind(provider);
    }

    if (options.methods?.includes(ResourceMethod.GET)) {
      bounds.get = provider.get.bind(provider);
    }

    if (options.methods?.includes(ResourceMethod.PUT) || options.methods?.includes(ResourceMethod.PATCH)) {
      bounds.set = provider.set.bind(provider);
    }

    if (options.methods?.includes(ResourceMethod.DELETE)) {
      bounds.drop = provider.drop.bind(provider);
    }

    return Object.assign(callable, provider, bounds);
  }

  private _ref: AbstractResourceProvider;
  private _name: string;
  private _options: RuffCreateFeatureResourceProviderConfig<T>;
  private _query: RuffHttpQueryModel;
  private constructor(
    name: string,
    ref: AbstractResourceProvider,
    options: RuffCreateFeatureResourceProviderConfig<T>
  ) {
    this._ref = ref;
    this._name = name;
    this._options = options
    this._query = {} as RuffHttpQueryModel;
  }

  getPrefix() {
    return this._ref.getFullPath();
  }

  getFullPath(): string {
    return joinPath([this.getPrefix(), this._name]);
  }

  query(...qs: RuffHttpQueryCondition[]): FeatureResourceProvider {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async post(payload: T): Promise<HttpPackagedResource<T>> {
    if (!this._options.methods?.includes(ResourceMethod.POST)) {
      throw new Error('cannot add this affiliated resource to the related entity')
    }
    try {
      const [path, idOrKeys] = this._ref.getPathAndIdentity()
      const { data } = await this._ref
        .getClient()
        .$_create_affiliated_resource(
          path,
          this._name,
          idOrKeys,
          payload,
          this._query
        );
      return HttpPackagedResource.packageResource<T>(data, {} as any)
    } catch (error) {
      throw error
    }
  }

  async get<DT extends RuffHttpResource = T>(
    subIdOrKeys?: IdOrKeys
  ): Promise<HttpPackagedResource<DT>> {
    if (!this._options.methods?.includes(ResourceMethod.GET)) {
      throw new Error('cannot get this affiliated resource of the related entity')
    }
    try {
      const [path, idOrKeys] = this._ref.getPathAndIdentity()
      if (subIdOrKeys) {
        const { data } = await this._ref
          .getClient()
          .$_get_identifiable_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            subIdOrKeys,
            this._query
          );
        return HttpPackagedResource.packageResource<DT>(data, {} as any)
      } else {
        const { data } = await this._ref
          .getClient()
          .$_get_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            this._query
          );
        return HttpPackagedResource.packageResource<DT>(data, {} as any)
      }
    } catch (error) {
      throw error
    }
  }

  async set(payload: T, partially: boolean, subIdOrKeys?: IdOrKeys): Promise<HttpPackagedResource<T>> {
    if (!this._options.methods?.includes(ResourceMethod.PUT) && !partially) {
      throw new Error('cannot modify this affiliated resource of the related entity')
    }
    if (!partially && !this._options.methods?.includes(ResourceMethod.PATCH)) {
      throw new Error('cannot modify this affiliated resource of the related entity')
    }
    try {
      const [path, idOrKeys] = this._ref.getPathAndIdentity()
      if (subIdOrKeys) {
        const { data } = await this._ref
          .getClient()
          .$_set_identifiable_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            subIdOrKeys,
            payload,
            this._query
          );
        return HttpPackagedResource.packageResource<T>(data, {} as any)
      } else {
        const { data } = await this._ref
          .getClient()
          .$_set_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            payload,
            this._query,
            {
              partially
            }
          );
        return HttpPackagedResource.packageResource<T>(data, {} as any)
      }
    } catch (error) {
      throw error
    }
  }

  async drop(subIdOrKeys?: IdOrKeys): Promise<HttpPackagedResource<any>> {
    if (!this._options.methods?.includes(ResourceMethod.DELETE)) {
      throw new Error('cannot drop this affiliated resource of the related entity')
    }
    try {
      const [path, idOrKeys] = this._ref.getPathAndIdentity()
      if (subIdOrKeys) {
        const { data } = await this._ref
          .getClient()
          .$_remove_identifiable_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            subIdOrKeys,
            this._query
          );
        return HttpPackagedResource.packageResource<T>(data, {} as any)
      } else {
        const { data } = await this._ref
          .getClient()
          .$_remove_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            this._query
          );
        return HttpPackagedResource.packageResource(data, {} as any)
      }
    } catch (error) {
      throw error
    }
  }
}
