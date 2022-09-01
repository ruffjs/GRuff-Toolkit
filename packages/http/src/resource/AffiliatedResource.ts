import { AxiosResponse } from "axios";
import { formatQueryCondition, joinPath } from "../utils/index";
import AbstractBase from "./AbstractBaseResource";

export default class AffiliatedResource<T = any> {
  static createAffiliatedResource<T = any>(
    name: string,
    ref: AbstractBase,
    options: RuffAffiliatedResourceConfiguration<T>
  ) {
    const resource = new AffiliatedResource<T>(name, ref, options);
    const callable = function AffiliatedResourceGetter() {
      return resource.get();
    };
    return Object.assign(callable, {
      get: resource.get.bind(AffiliatedResource),
    });
  }

  private _ref: AbstractBase;
  private _name: string;
  private _query: RuffPageableResourcesQueryModel;
  private constructor(
    name: string,
    ref: AbstractBase,
    options: RuffAffiliatedResourceConfiguration<T>
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

  async get(
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
    return {} as any;
  }
}
