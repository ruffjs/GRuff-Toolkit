import HttpPackagedResource from "../models/HttpPackagedResource";
import { formatQueryCondition, joinPath } from "../utils/formatters";
import { ResourceMethod } from "../utils/resource-methods";
import AbstractBaseResource from "./AbstractBaseResource";

export default class AffiliatedResource<T extends RuffHttpResource = any> {
  static defineResource<T extends RuffHttpResource = any>(
    name: string,
    ref: AbstractBaseResource,
    options: RuffCreateAffiliatedResourceConfig<T>
  ) {
    const resource = new AffiliatedResource<T>(name, ref, options);
    const callable = function RuffAffiliatedResourceGetter(subIdOrKeys?: IdOrKeys) {
      return resource.get(subIdOrKeys);
    };

    const bounds = {
      getPrefix: resource.getPrefix.bind(resource),
      getFullPath: resource.getFullPath.bind(resource),
      query: resource.query.bind(resource),
    } as AffiliatedResource;

    if (options.methods?.includes(ResourceMethod.POST)) {
      bounds.post = resource.post.bind(resource);
    }

    if (options.methods?.includes(ResourceMethod.GET)) {
      bounds.get = resource.get.bind(resource);
    }

    if (options.methods?.includes(ResourceMethod.PUT) || options.methods?.includes(ResourceMethod.PATCH)) {
      bounds.set = resource.set.bind(resource);
    }

    if (options.methods?.includes(ResourceMethod.DELETE)) {
      bounds.drop = resource.drop.bind(resource);
    }

    return Object.assign(callable, resource, bounds);
  }

  private _ref: AbstractBaseResource;
  private _name: string;
  private _options: RuffCreateAffiliatedResourceConfig<T>;
  private _query: RuffHttpQueryModel;
  private constructor(
    name: string,
    ref: AbstractBaseResource,
    options: RuffCreateAffiliatedResourceConfig<T>
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

  query(...qs: RuffHttpQueryCondition[]): AffiliatedResource {
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

  async get(
    subIdOrKeys?: IdOrKeys
  ): Promise<HttpPackagedResource<T>> {
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
        return HttpPackagedResource.packageResource<T>(data, {} as any)
      } else {
        const { data } = await this._ref
          .getClient()
          .$_get_affiliated_resource(
            path,
            this._name,
            idOrKeys,
            this._query
          );
        return HttpPackagedResource.packageResource<T>(data, {} as any)
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
