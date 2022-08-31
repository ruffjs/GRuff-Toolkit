import { AxiosResponse } from "axios";
import { formatQueryCondition, joinPath } from "../utils/index";
import AbstractBase from "./AbstractBase";

export default class AffiliatedResource<
  CH extends string = any,
  CO extends string = any
  > {
  static create_affiliated_resource<CH extends string = any, CO extends string = any>(
    name: string,
    ref: AbstractBase,
    options: Readonly<RuffAffiliatedResourceConfiguration>
  ) {
    const resource = new AffiliatedResource(name, ref, options);
    const callable = function AffiliatedResourceGetter() {
      return resource.get();
    };
    return Object.assign(callable, {
      get: resource.get.bind(AffiliatedResource),
    } as AffiliatedResource<CH, CO> & Record<CO, AnyFn>);
  }

  private _ref: AbstractBase;
  private _name: string;
  private _query: RuffPageableResourcesQueryModel;
  private constructor(
    name: string,
    ref: AbstractBase,
    options: Readonly<RuffAffiliatedResourceConfiguration>
  ) {
    this._ref = ref;
    this._name = name;
    this._query = {} as RuffPageableResourcesQueryModel;
  }

  query(...qs: RuffHttpQueryCondition[]): AffiliatedResource {
    const condition = formatQueryCondition(...qs);
    this._query = {
      ...this._query,
      ...condition,
    };
    return this;
  }

  async get<T extends RuffDataModel = any, D = any>(
    condition?: RuffHttpQueryCondition
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>> {
    // try {

    // } catch (error) {
    //   console.log(error);
    // }
    // const { data } = await this._ref
    //   .getClient()
    //   .$get_resource(
    //     joinPath([this._ref.getFullPath(), this._name]),
    //     this._query
    //   );
    // return data;
    return {} as any
  }
}
