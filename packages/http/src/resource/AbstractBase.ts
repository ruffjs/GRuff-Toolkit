import { formatQueryCondition } from "../utils";

export default abstract class AbstractBase {
  protected _client: RuffResourceRequestors;
  protected _prefix;
  protected _path: string;
  protected _options: RuffCreateResourceOptions;
  protected _query: RuffPageableResourcesQueryModel;

  getClient() {
    return this._client;
  }

  getPrefix() {
    return this._prefix;
  }

  getFullPath(): string {
    throw new Error("你需要在衍生类中实现该方法");
  }

  protected constructor(
    name: string,
    options: RuffCreateResourceOptions,
    query: RuffPageableResourcesQueryModel
  ) {
    const { client, prefix, resource, config } = options;
    this._client = client;
    this._prefix = prefix || 'api/v1';
    this._path = resource.path || name;
    this._options = options;
    this._query = query;
  }

  query(...qs: RuffHttpQueryCondition[]): AbstractBase {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }
}
