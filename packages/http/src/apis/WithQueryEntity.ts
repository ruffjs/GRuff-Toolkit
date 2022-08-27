import { formatQueryCondition } from "../utils/index";
import HttpPackagedResource from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "../utils";
import EntityRef from "./EntityRef";
import AbsoluteBase from "./AbsoluteBase";
import { AxiosResponse } from "axios";

export default class WithQueryEntity<
  B extends string = any,
  A extends string = any
> extends AbsoluteBase {
  static createEntity<B extends string = any, A extends string = any>(
    name: string,
    options: Readonly<RuffEntityOptions<any, any, B, A>>,
    query: RuffPageableResourcesQueryModel
  ) {
    return new WithQueryEntity(name, options, query);
  }

  setPrefix(prefix: string) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  protected constructor(
    name: string,
    options: RuffEntityOptions<any, any, B, A>,
    query: RuffPageableResourcesQueryModel
  ) {
    super(name, options, query);
  }

  query(...qs: RuffHttpQueryCondition[]): WithQueryEntity {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async list(pageSize: number = 10, pageIndex: number = 1) {
    // console.log("this._query", this._query);
    const { data } = await this._client.$getEntitys(
      joinPath([this._prefix, this._dirname]),
      {
        ...this._query,
        pageSize,
        pageIndex,
      }
    );
    // console.log(data);
    const list = new HttpResourcesList(data);
    data.content.forEach((item: any) => {
      const ref: any = EntityRef.createRef(
        this._dirname,
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
