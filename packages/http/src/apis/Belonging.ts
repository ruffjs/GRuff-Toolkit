import { AxiosResponse } from "axios";
import { formatQueryCondition, joinPath } from "../utils/index";
import AbsoluteBase from "./AbsoluteBase";

export default class Belonging<
  CH extends string = any,
  CO extends string = any
> {
  static createBelonging<CH extends string = any, CO extends string = any>(
    name: string,
    ref: AbsoluteBase,
    options: Readonly<RuffBelongingConfiguration>
  ) {
    const belonging = new Belonging(name, ref, options);
    const callable = function CallableBelonging() {
      return belonging.get();
    };
    return Object.assign(callable, {
      get: belonging.get.bind(belonging),
    } as Belonging<CH, CO> & Record<CO, AnyFn>);
  }

  private _ref: AbsoluteBase;
  private _name: string;
  private _query: RuffPageableResourcesQueryModel;
  private constructor(
    name: string,
    ref: AbsoluteBase,
    options: Readonly<RuffBelongingConfiguration>
  ) {
    this._ref = ref;
    this._name = name;
    this._query = {} as RuffPageableResourcesQueryModel;
  }

  query(...qs: RuffHttpQueryCondition[]): Belonging {
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
    const { data } = await this._ref
      .getClient()
      .$getResource(
        joinPath([this._ref.getBelongingsPrefix(), this._name]),
        this._query
      );
    return data;
  }
}
