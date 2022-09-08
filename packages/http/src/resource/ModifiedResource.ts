import { formatQueryCondition } from "../utils/index";
import HttpPackagedResource, { ProxiedHttpPackagedResource } from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "../utils";
import IdentifiedResource from "./IdentifiedResource";
import AbstractBaseResource from "./AbstractBaseResource";
import { ResourceMethod } from "../utils/resource-methods";

export default class ModifiedResource<
  T extends RuffHttpResource = any,
  A extends string = any
> extends AbstractBaseResource {
  protected static pageIndex = 1;
  protected static pageSize = 10;

  static set defaultpageSize(size: number) {
    ModifiedResource.pageSize = size;
  }

  protected static defineResource<T extends RuffHttpResource = any, A extends string = any>(
    name: string,
    options: Readonly<RuffResourceDefinationOptions<T, never, A>>,
    query: RuffHttpQueryModel
  ) {
    return new ModifiedResource<T, A>(name, options, query);
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

  query(...qs: RuffHttpQueryCondition[]): ModifiedResource {
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
      const { data } = await this._client.$create_main_resource(
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
      const { data } = await this._client.$create_main_resource_with_attachment(
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
    pageSize: number = ModifiedResource.pageSize,
    pageIndex: number = ModifiedResource.pageIndex
  ): Promise<HttpResourcesList<T, A>> {
    // console.log("this._query", this._query);
    if (!this._options.resource.methods?.includes(ResourceMethod.LIST)) {
      throw new Error('cannot get list of this resource')
    }
    try {
      const { data } = await this._client.$get_main_resources(
        joinPath([this._prefix, this._path]),
        {
          ...this._query,
          pageSize,
          pageIndex,
        } as RuffPageableResourcesQueryModel
      );
      const list = new HttpResourcesList<T, A>(data);
      data?.content?.forEach((item: any) => {
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
      return list;
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
      const { data } = await this._client.$get_main_resource(
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
      const { data } = await this._client.$set_main_resource(
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
      const { data } = await this._client.$remove_main_resource(
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
