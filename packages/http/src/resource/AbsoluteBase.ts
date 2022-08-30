import { formatQueryCondition } from "../utils";

export default class AbsoluteBase {
  protected _client: RuffResourceRequestor;
  protected _prefix;
  protected _dirname: string;
  protected _options: RuffEntityOptions;
  protected _query: RuffPageableResourcesQueryModel;

  getClient() {
    return this._client;
  }

  getPrefix() {
    return this._prefix;
  }

  getChildrenPrefix(): string {
    throw new Error("你需要在衍生类中实现该方法");
  }

  getBelongingsPrefix(): string {
    throw new Error("你需要在衍生类中实现该方法");
  }

  protected constructor(
    name: string,
    options: RuffEntityOptions,
    query: RuffPageableResourcesQueryModel
  ) {
    const { client, prefix, resource, config } = options;
    this._client = client;
    this._prefix = prefix || 'api/v1';
    this._dirname = resource.dirname || name;
    this._options = options;
    this._query = query;
  }

  query(...qs: RuffHttpQueryCondition[]): AbsoluteBase {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }
}
