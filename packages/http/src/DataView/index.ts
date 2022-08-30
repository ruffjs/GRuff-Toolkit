import { GetterMethod, ResourceMethod } from "../resource/ResourceMethod";

export default class DataView<
  T extends Record<K, any>,
  K extends string = any,
  OK extends string = any
> {
  static LIST = ResourceMethod.LIST as GetterMethod;
  static PICK = ResourceMethod.PICK as GetterMethod;
  static TAKE = ResourceMethod.TAKE as GetterMethod;
  static LOG = ResourceMethod.LOG as GetterMethod;
  static ENUM = ResourceMethod.ENUM as GetterMethod;
  static ENUM_BY_IDS = ResourceMethod.ENUM_BY_IDS as GetterMethod;
  static GET = ResourceMethod.GET as GetterMethod;
  static GET_BY_KEYS = ResourceMethod.GET_BY_KEYS as GetterMethod;
  static READ = ResourceMethod.READ as GetterMethod;
  static READ_BY_IDS = ResourceMethod.READ_BY_IDS as GetterMethod;
  // static Methods = getterMethods;

  private _entityPath: string;
  private _belongingPath: string;
  private _method: GetterMethod;
  private _client: RuffResourceRequestor;
  private _rules: MappingOptions<T[K], K, OK>;

  constructor(options: {
    apiId: string;
    method: GetterMethod;
    client: RuffResourceRequestor;
    rules: MappingOptions<T[K], K, OK>;
  }) {
    const { apiId, method, client, rules } = options;
    const [entityPath, belongingPath] = apiId.split("/@/");

    console.log(entityPath, belongingPath, method, client);
    this._entityPath = entityPath;
    this._belongingPath = belongingPath;
    this._method = method;
    this._client = client;
    this._rules = rules;
  }

  getApiId() {
    if (this._belongingPath) {
      return `${this._entityPath}/@/${this._belongingPath}:${this._method}`;
    }
    return `${this._entityPath}:${this._method}`;
  }

  getData(
    aidOrAkeys: IdOrKeys,
    bidOrAkeys: IdOrKeys,
    query: RuffHttpQueryModel
  ): T;
  getData(idOrAkeys: IdOrKeys, query: RuffHttpQueryModel): T;
  getData(query: RuffHttpQueryModel): T[];
  getData(...args: unknown[]): T | T[] {
    const { _randoms } = this._client as any;
    if (_randoms[this.getApiId()]) {
      // console.log(_randoms[this.getApiId()]);
      return _randoms[this.getApiId()]();
    }
    return [];
  }
}
