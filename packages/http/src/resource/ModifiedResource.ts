import { formatQueryCondition } from "../utils/index";
import HttpPackagedResource from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "../utils";
import IdentifiedResource from "./IdentifiedResource";
import AbstractBaseResource from "./AbstractBaseResource";
import { AxiosResponse } from "axios";

export default class ModifiedResource<
  T = any,
  A extends string = any
> extends AbstractBaseResource {
  protected static pageIndex = 1;
  protected static pageSize = 10;

  static set defaultpageSize(size: number) {
    ModifiedResource.pageSize = size;
  }

  static createResource<T = any, A extends string = any>(
    name: string,
    options: Readonly<RuffCreateResourceOptions<T, never, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    return new ModifiedResource<T, A>(name, options, query);
  }

  setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  protected constructor(
    name: string,
    options: RuffCreateResourceOptions<T, never, A>,
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

  async list(
    pageSize: number = ModifiedResource.pageSize,
    pageIndex: number = ModifiedResource.pageIndex
  ) {
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

  get(): Promise<AxiosResponse<RuffHttpResponse<T>, any>> {
    throw new Error("Method not implemented.");
  }
}
