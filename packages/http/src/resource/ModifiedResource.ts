import { formatQueryCondition } from "../utils/index";
import HttpPackagedResource from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "../utils";
import IdentifiedResource from "./IdentifiedResource";
import AbstractBase from "./AbstractBase";
import { AxiosResponse } from "axios";

export default class ModifiedResource<
  B extends string = any,
  A extends string = any
  > extends AbstractBase {
  protected static pageIndex = 1;
  protected static pageSize = 10;

  static set defaultpageSize(size: number) {
    ModifiedResource.pageSize = size;
  }

  static createResource<B extends string = any, A extends string = any>(
    name: string,
    options: Readonly<RuffCreateResourceOptions<any, any, B, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    return new ModifiedResource(name, options, query);
  }

  setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  protected constructor(
    name: string,
    options: RuffCreateResourceOptions<any, any, B, A>,
    query: RuffPageableResourcesQueryModel
  ) {
    super(name, options, query);
  }

  query(...qs: RuffHttpQueryCondition[]): ModifiedResource {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async list(pageSize: number = ModifiedResource.pageSize, pageIndex: number = ModifiedResource.pageIndex) {
    // console.log("this._query", this._query);
    const { data } = await this._client.$get_main_resources(
      joinPath([this._prefix, this._path]),
      {
        ...this._query,
        pageSize,
        pageIndex,
      }
    );
    console.log(data);
    const list = new HttpResourcesList(data);
    data?.content?.forEach((item: any) => {
      const ref: any = IdentifiedResource.createResource(
        this._path,
        item.id,
        this._options,
        this._query
      );
      list.push(
        new HttpPackagedResource(item, {
          get(target, p) {
            if (p === "rawData") {
              return item;
            }
            if (p in item) {
              return item[p];
            }
            if (p in ref && typeof ref[p] === "function") {
              return ref[p];
            }
            return undefined;
          },
        })
      );
    });
    return list;
  }

  get<T extends RuffDataModel = any>(): Promise<
    AxiosResponse<RuffHttpResponse<T>, any>
  > {
    throw new Error("Method not implemented.");
  }
}
