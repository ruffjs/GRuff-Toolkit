import { defineMapping } from "@ruff-web/data-mapping";
import { GetterMethod, ResourceMethod } from "../utils/resource-methods";

export default class DataView<
  T extends Record<K, any>,
  K extends string = any,
  OK extends string = any
  > {
  static LIST = ResourceMethod.LIST as GetterMethod;
  static GET = ResourceMethod.GET as GetterMethod;

  private _path: string;
  private _subPath: string;
  private _method: GetterMethod;
  private _client: RuffResourceRequestors;
  private _rules: MappingOptions<T[K], K, OK>;

  constructor(options: {
    apiId: string;
    method: GetterMethod;
    client: RuffResourceRequestors;
    rules: MappingOptions<T[K], K, OK>;
  }) {
    const { apiId, method, client, rules } = options;
    const [path, subPath] = apiId.split("/**/");

    console.log(path, subPath, method, client);
    this._path = path;
    this._subPath = subPath;
    this._method = method;
    this._client = client;
    this._rules = rules;
  }

  getApiId() {
    if (this._subPath) {
      return `${this._path}/**/${this._subPath}:${this._method}`;
    }
    return `${this._path}:${this._method}`;
  }

  getData(
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    query: RuffHttpQueryModel
  ): T;
  getData(idOrKeys: IdOrKeys, query: RuffHttpQueryModel): T;
  getData(query: RuffHttpQueryModel): T[];
  getData(...a: any[]): T | T[] {
    if (this._method === ResourceMethod.LIST) return this._getArray();
    else return this._get();
  }

  private _getArray(): T[] {
    const { _randomRules } = this._client as any;
    let rawList = [];
    if (_randomRules[this.getApiId()]) {
      rawList = _randomRules[this.getApiId()]().content;
    }
    return rawList.map((element: any) =>
      defineMapping<T>(this._rules, element)
    );
  }

  private _get(): T {
    const apiId = this.getApiId();
    const { _randomRules } = this._client as any;
    if (_randomRules[apiId]) {
      return defineMapping(this._rules, _randomRules[apiId]());
    }
    return defineMapping<T>(this._rules, {});
  }
}
