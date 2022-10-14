import { formatQueryCondition } from "../utils/formatters";
import HttpPackagedResource, { IHttpPackagedResource } from "../models/HttpPackagedResource";
import { joinPath } from "../utils/formatters";
import IdentifiedResourceProvider from "./IdentifiedResourceProvider";
import AbstractResourceProvider from "./AbstractResourceProvider";
import { ResourceMethod } from "../utils/resource-methods";
import HttpResourcesList from "../models/HttpResourcesList";

export default class StatefulResourceProvider<
  T extends RuffHttpResource = any,
  AR extends string = any,
  AC extends string = any,
> extends AbstractResourceProvider {


  protected static defineProvider<
    T extends RuffHttpResource = any,
    AR extends string = any,
    AC extends string = any,
  >(
    name: string,
    options: Readonly<RuffResourceProviderDefinationOptions<T, never, AR | AC>>,
    query: RuffHttpQueryModel
  ) {
    return new StatefulResourceProvider<T, AR, AC>(name, options, query);
  }

  setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  getFullPath(): string {
    return joinPath([this._prefix, this._path]);
  }

  query(...qs: RuffHttpQueryCondition[]): StatefulResourceProvider {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async post(payload: T) {
    if (!this._options.resource.methods?.includes(ResourceMethod.POST)) {
      throw new Error('this resource cannot be posted')
    }
    try {
      const { data } = await this._client.$_create_main_resource(
        joinPath([this._prefix, this._path]),
        payload,
        this._query
      );
      const ref = IdentifiedResourceProvider.defineProvider<T, AR, AC>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, AR, AC>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async upload(payload: T) {
    if (!this._options.resource.methods?.includes(ResourceMethod.UPLOAD)) {
      throw new Error('this resource cannot be uploaded')
    }

    try {
      const { data } = await this._client.$_create_main_resource_with_attachment(
        joinPath([this._prefix, this._path]),
        payload,
        this._query
      );
      const ref = IdentifiedResourceProvider.defineProvider<T, AR, AC>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, AR, AC>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async list<DT extends RuffHttpResource = T>(
    pageSize: number = this._client.pageSize,
    pageIndex: number = this._client.pageIndex
  ): Promise<HttpResourcesList<DT, AR, AC>> {
    // console.log("this._query", this._query);
    if (!this._options.resource.methods?.includes(ResourceMethod.LIST)) {
      throw new Error('cannot get list of this resource')
    }
    try {
      const { data } = await this._client.$_get_main_resources<DT, AR | AC>(
        joinPath([this._prefix, this._path]),
        {
          ...this._query,
          pageSize,
          pageIndex,
        } as RuffPageableResourcesQueryModel
      );
      if (data) {
        const list = new HttpResourcesList<DT, AR, AC>(data);
        const array = data[this._client.listKey]
        if (typeof array === 'object' && array instanceof Array) {
          array.forEach((item: any) => {
            let ref: any
            if (item.id) {
              ref = IdentifiedResourceProvider.defineProvider<DT, AR, AC>(
                this._path,
                item.id,
                this._options,
                {}
              );
            } else {
              ref = {}
            }
            list.push(HttpPackagedResource.packageResource<DT, AR, AC>(item, ref));
          });
        }
        return list;
      }
      throw new Error("get main resources data error")
    } catch (error) {
      throw error
    }
  }

  async pick(ids: identity[]): Promise<HttpResourcesList<T, AR, AC>> {
    if (this._options.resource.pickable) return this.query(typeof this._options.resource.pickable === 'string' ? { [this._options.resource.pickable]: ids } : { ids }).list(ids.length, 1)
    throw new Error('this resource cannot be picked')
  }

  async get<DT extends RuffHttpResource = T>(idOrKeys: IdOrKeys): Promise<IHttpPackagedResource<DT, AR, AC>> {
    if (!this._options.resource.methods?.includes(ResourceMethod.GET)) {
      console.log(this._options.resource.methods, ResourceMethod.GET)
      throw new Error('cannot get this resource by id or keys')
    }
    try {
      const { data } = await this._client.$_get_main_resource(
        joinPath([this._prefix, this._path]),
        idOrKeys,
        this._query
      );
      const ref = IdentifiedResourceProvider.defineProvider<DT, AR, AC>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<DT, AR, AC>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async set(idOrKeys: IdOrKeys, payload: T, partially: boolean): Promise<IHttpPackagedResource<T, AR, AC>> {
    if (!this._options.resource.methods?.includes(ResourceMethod.PUT) && !partially) {
      throw new Error('cannot update this resource by id or keys')
    }
    if (partially && !this._options.resource.methods?.includes(ResourceMethod.PATCH)) {
      throw new Error('cannot update this resource by id or keys')
    }
    try {
      const { data } = await this._client.$_set_main_resource(
        joinPath([this._prefix, this._path]),
        idOrKeys,
        payload,
        this._query,
        { partially }
      );
      const ref = IdentifiedResourceProvider.defineProvider<T, AR, AC>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, AR, AC>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async drop(idOrKeys: IdOrKeys): Promise<HttpPackagedResource<any>> {
    if (!this._options.resource.methods?.includes(ResourceMethod.DELETE)) {
      throw new Error('cannot delete this resource by id or keys')
    }
    try {
      const { data } = await this._client.$_remove_main_resource(
        joinPath([this._prefix, this._path]),
        idOrKeys,
        this._query,
      );
      return HttpPackagedResource.packageResource(data, {} as any)
    } catch (error) {
      throw error
    }
  }
}
