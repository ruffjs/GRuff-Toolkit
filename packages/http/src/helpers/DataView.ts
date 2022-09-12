import { defineMapping } from "@ruff-web/data-mapping";
import HttpPackagedResource from "../models/HttpPackagedResource";
import { isNotEmpty } from "../utils/formatters";
import { GetterMethod, ResourceMethod } from "../utils/resource-methods";

export default class DataView<
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

  static LIST = ResourceMethod.LIST as GetterMethod;
  static GET = ResourceMethod.GET as GetterMethod;

  private _client: RuffClient;
  private _apiId: string;
  private _method: GetterMethod;

  private _rules: MappingOptions<T[K], K, OK> | null;

  constructor(options: {
    apiId: string;
    // method: GetterMethod;
    client: RuffClient;
    rules?: MappingOptions<T[K], K, OK>;
  }) {
    const { apiId, client, rules } = options;
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

    this._rules = rules && isNotEmpty(rules) ? rules : null;
  }

  getApiId() {
    return this._apiId
  }

  async fetch(idOrKeys: IdOrKeys, query?: RuffHttpQueryModel, subIdOrKeys?: IdOrKeys): Promise<T>;
  async fetch(query?: RuffHttpQueryModel): Promise<T[]>;
  async fetch(): Promise<T | T[]> {
    if (this._method === ResourceMethod.LIST) return this._getArray(arguments[0]);
    else return this._get(arguments[0], arguments[1], arguments[2]);
  }

  private async _getArray(query: RuffHttpQueryModel): Promise<T[]> {
    try {
      // console.log(this._client.isMock)
      const { data } = await this._client.$_call(this._apiId, { query })
      if (data[this._client.listKey]) {
        return data[this._client.listKey].map((item: any) =>
          this._rules ? defineMapping<T>(this._rules, item) : HttpPackagedResource.packageResource<T>(item, {} as any)
        );
      } else {
        throw new Error("This type of resource may not provided LIST method, or check your configurations.")
      }

    } catch (error) {
      // return rawList
      throw error
    }
  }

  private async _get(idOrKeys: IdOrKeys, query: RuffHttpQueryModel, subIdOrKeys?: IdOrKeys): Promise<T> {
    try {
      const { data } = await this._client.$_call(this._apiId, { idOrKeys, subIdOrKeys, query })
      return this._rules ? defineMapping(this._rules, data) : HttpPackagedResource.packageResource<T>(data, {} as any)
    } catch (error) {
      // return defineMapping<T>(this._rules, {});
      throw error
    }
  }
}
