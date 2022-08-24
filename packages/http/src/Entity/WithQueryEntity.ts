import HttpPackagedResource from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "../utils";
import EntityRef from "./EntityRef";
import { ResourceMethod } from "./ResourceMethod";

export default class WithQueryEntity<
  CH extends string = any,
  CO extends string = any
> {
  static createEntity<CH extends string = any, CO extends string = any>(
    name: string,
    options: Readonly<RuffEntityOptions<CH, CO>>,
    query: RuffPageableResourcesQueryModel
  ) {
    const entity = new WithQueryEntity(name, options, query);
    return Object.assign(
      entity,
      {} as WithQueryEntity<CH, CO> &
        Record<CH, WithQueryEntity<string, string>> &
        Record<CO, AnyFn>
    );
  }

  protected _client: RuffHttpClient;
  protected _prefix = "api/v1";
  protected _dirname: string;
  protected _options: RuffEntityOptions<CH, CO>;
  protected _query: RuffPageableResourcesQueryModel;

  setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  protected constructor(
    name: string,
    options: RuffEntityOptions<CH, CO>,
    query: RuffPageableResourcesQueryModel
  ) {
    const { client, resource, config } = options;
    this._client = client;
    this._dirname = resource.dirname || name;
    this._options = options;
    this._query = query;
    console.log(
      resource.methods?.map((m) => ResourceMethod[m]),
      resource
    );
  }

  query(condition: AnyRecord) {
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async list(pageSize: number = 10, pageIndex: number = 1) {
    const { data } = await this._client.$getEntitys(
      joinPath([this._prefix, this._dirname]),
      {
        ...this._query,
        pageSize,
        pageIndex,
      }
    );
    console.log(data);
    const list = new HttpResourcesList(data);
    data.content.forEach((item: any) => {
      //   const ref = EntityRef.createEntityRef(this._name, this._options);
      list.push(
        new HttpPackagedResource(item, {
          get(target, p) {
            if (p in item) {
              return item[p];
            }
            if (p === "rawData") {
              return item;
            }
            return undefined;
          },
        })
      );
    });
    return list;
  }

  get() {}
}
