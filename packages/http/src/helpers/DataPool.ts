import { defineMapping } from "@ruff-web/data-mapping";
// import HttpPackagedResource from "../models/HttpPackagedResource";
import { isNotEmpty } from "../utils/formatters";
import { GetterMethod, ResourceMethod } from "../utils/resource-methods";

class MappingLike<T> {
  data: T;
  constructor(data: T) {
    this.data = data
  }
  getTarget() {
    return this.data;
  }

  getMapped() {
    return this.data;
  }
}

export default class DataPool<
  T extends Record<K, any>,
  K extends string = any,
  OK extends string = any
> {
  static formatApiId(resource: string, method: GetterMethod): string
  static formatApiId(resource: string, subresource: string, method: GetterMethod): string
  static formatApiId(): string {
    if (arguments.length < 2) {
      throw new Error("resource method must be provided")
    }
    if (arguments.length < 3) {
      return `${arguments[0]}:${arguments[1]}`
    }
    return `${arguments[0]}/**/${arguments[1]}:${arguments[2]}`
  }

  static M = ResourceMethod.LIST as GetterMethod;
  static S = ResourceMethod.GET as GetterMethod;

  private _client: RuffClient;
  private _apiId: string;
  private _method: GetterMethod;

  private _mapping: MappingOptions<T[K], K, OK> | null;

  constructor(options: {
    apiId: string;
    // method: GetterMethod;
    client: RuffClient;
    unmap?: K[]
    mapping?: MappingOptions<T[K], K, OK>;
  }) {
    const { apiId, client, unmap, mapping } = options;
    const [_, method] = apiId.split(":");

    this._client = client;
    this._apiId = apiId;
    if (method === String(ResourceMethod.LIST)) {
      this._method = ResourceMethod.LIST
    } else if (method === String(ResourceMethod.GET)) {
      this._method = ResourceMethod.GET
    } else {
      this._method = null
    }
    const _mapping: any = {}
    if (unmap && unmap.length) {
      unmap.forEach((key: K) => {
        _mapping[key] = key
      })
    }
    this._mapping = mapping && isNotEmpty(mapping) ? { ...mapping, ..._mapping } : null;
  }

  getApiId() {
    return this._apiId
  }

  async read(idOrKeys: IdOrKeys, query?: RuffHttpQueryModel, subIdOrKeys?: IdOrKeys): Promise<MappingLike<T>>;
  async read(query?: RuffHttpQueryModel): Promise<MappingLike<T>[]>;
  async read(): Promise<MappingLike<T> | MappingLike<T>[]> {
    if (this._method === ResourceMethod.LIST) return this._getArray(arguments[0]);
    else return this._get(arguments[0], arguments[1], arguments[2]);
  }

  private async _getArray(query: RuffHttpQueryModel): Promise<MappingLike<T>[]> {
    try {
      // console.log(this._client.isMock)
      const { data } = await this._client.$_call(this._apiId, { query: { pageIndex: 1, pageSize: 10, ...query } })
      if (data[this._client.listKey]) {
        return data[this._client.listKey].map((item: any) =>
          this._mapping ? (defineMapping(this._mapping, item) as unknown as MappingLike<T>) : new MappingLike(item as T)
        );
      } else {
        throw new Error("This type of resource may not provided LIST method, or check your configurations.")
      }

    } catch (error) {
      // return rawList
      throw error
    }
  }

  private async _get(idOrKeys: IdOrKeys, query: RuffHttpQueryModel, subIdOrKeys?: IdOrKeys): Promise<MappingLike<T>> {
    try {
      const { data } = await this._client.$_call(this._apiId, { idOrKeys, subIdOrKeys, query })
      return this._mapping ? (defineMapping(this._mapping, data) as unknown as MappingLike<T>) : new MappingLike(data as T)
    } catch (error) {
      // return defineMapping<T>(this._mapping, {});
      throw error
    }
  }
}
