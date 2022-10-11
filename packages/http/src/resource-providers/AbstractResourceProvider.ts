import { formatQueryCondition } from "../utils/formatters";

export default abstract class AbstractResourceProvider {

  protected _client: RuffClient;
  protected _prefix;
  protected _path: string;
  protected _options: RuffResourceProviderDefinationOptions;
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
    options: RuffResourceProviderDefinationOptions,
    query: RuffHttpQueryModel
  ) {
    const { client, prefix, resource } = options;
    this._client = client;
    this._prefix = prefix || 'api/v1';
    this._path = resource.path || name;
    this._options = options;
    this._query = query || {};
    this._partially = false
  }

  query(...qs: RuffHttpQueryCondition[]): AbstractResourceProvider {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }
}
