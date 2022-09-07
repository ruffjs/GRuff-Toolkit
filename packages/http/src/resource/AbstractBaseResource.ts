import { formatQueryCondition } from "../utils";

export default abstract class AbstractBaseResource {

  protected _client: RuffResourceRequestors;
  protected _prefix;
  protected _path: string;
  protected _options: RuffResourceDefinationOptions;
  protected _query: RuffHttpQueryModel;
  protected _partially: boolean

  getClient() {
    return this._client;
  }

  getPrefix() {
    return this._prefix;
  }

  getFullPath(): string {
    throw new Error("你需要在衍生类中实现该方法");
  }

  getPathAndIdentity(): [string, string] {
    throw new Error("你需要在衍生类中实现该方法.");
  }

  protected constructor(
    name: string,
    options: RuffResourceDefinationOptions,
    query: RuffHttpQueryModel
  ) {
    const { client, prefix, resource, config } = options;
    this._client = client;
    this._prefix = prefix || 'api/v1';
    this._path = resource.path || name;
    this._options = options;
    this._query = query || {};
    this._partially = false

  }

  query(...qs: RuffHttpQueryCondition[]): AbstractBaseResource {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }
}
