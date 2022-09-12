import { formatQueryCondition } from "../utils/formatters";
import HttpPackagedResource, { ProxiedHttpPackagedResource } from "../models/HttpPackagedResource";
import { joinPath } from "../utils/formatters";
import IdentifiedResource from "./IdentifiedResource";
import AbstractBaseResource from "./AbstractBaseResource";
import { ResourceMethod } from "../utils/resource-methods";
import HttpResourcesList from "../models/HttpResourcesList";

export default class StatefulResource<
  T extends RuffHttpResource = any,
  A extends string = any
> extends AbstractBaseResource {


  protected static defineResource<T extends RuffHttpResource = any, A extends string = any>(
    name: string,
    options: Readonly<RuffResourceDefinationOptions<T, never, A>>,
    query: RuffHttpQueryModel
  ) {
    return new StatefulResource<T, A>(name, options, query);
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

  query(...qs: RuffHttpQueryCondition[]): StatefulResource {
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
      const ref = IdentifiedResource.defineResource<T, A>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, A>(data, ref)
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
      const ref = IdentifiedResource.defineResource<T, A>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, A>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async list(
    pageSize: number = this._client.pageSize,
    pageIndex: number = this._client.pageIndex
  ): Promise<HttpResourcesList<T, A>> {
    // console.log("this._query", this._query);
    if (!this._options.resource.methods?.includes(ResourceMethod.LIST)) {
      throw new Error('cannot get list of this resource')
    }
    try {
      const { data } = await this._client.$_get_main_resources<T, A>(
        joinPath([this._prefix, this._path]),
        {
          ...this._query,
          pageSize,
          pageIndex,
        } as RuffPageableResourcesQueryModel
      );
      if (data) {
        const list = new HttpResourcesList<T, A>(data);
        const array = data[this._client.listKey]
        if (typeof array === 'object' && array instanceof Array) {
          array.forEach((item: any) => {
            let ref: any
            if (item.id) {
              ref = IdentifiedResource.defineResource<T, A>(
                this._path,
                item.id,
                this._options,
                {}
              );
            } else {
              ref = {}
            }
            list.push(HttpPackagedResource.packageResource<T, A>(item, ref));
          });
        }
        return list;
      }
      throw new Error("get main resources data error")
    } catch (error) {
      throw error
    }
  }

  async pick(ids: identity[]): Promise<HttpResourcesList<T, A>> {
    if (this._options.resource.pickable) return this.query(typeof this._options.resource.pickable === 'string' ? { [this._options.resource.pickable]: ids } : { ids }).list(ids.length, 1)
    throw new Error('this resource cannot be picked')
  }

  async get(idOrKeys: IdOrKeys): Promise<ProxiedHttpPackagedResource<T, A>> {
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
      const ref = IdentifiedResource.defineResource<T, A>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, A>(data, ref)
    } catch (error) {
      throw error
    }
  }

  async set(idOrKeys: IdOrKeys, payload: T, partially: boolean): Promise<ProxiedHttpPackagedResource<T, A>> {
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
      const ref = IdentifiedResource.defineResource<T, A>(
        this._path,
        data.id,
        this._options,
        {}
      );
      return HttpPackagedResource.packageResource<T, A>(data, ref)
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
