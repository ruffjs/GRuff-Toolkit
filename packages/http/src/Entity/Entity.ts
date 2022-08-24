import HttpPackagedResource from "../responses/HttpPackagedResource";
import HttpResourcesList from "../responses/HttpResourcesList";
import { joinPath } from "./../utils/index";
import EntityRef from "./EntityRef";
import { ResourceMethod } from "./ResourceMethod";
import WithQueryEntity from "./WithQueryEntity";

export default class Entity<
  CH extends string = any,
  CO extends string = any
> extends WithQueryEntity<CH, CO> {
  static createEntity<CH extends string = any, CO extends string = any>(
    name: string,
    options: Readonly<RuffEntityOptions<CH, CO>>
  ) {
    const entity = new Entity(name, options);
    const callable = function CallableEntity(idOrKeys: Id | Id[]) {
      return "";
    };
    return Object.assign(callable, {
      setPrefix: entity.setPrefix.bind(entity),
      getPrefix: entity.getPrefix.bind(entity),
      list: entity.list.bind(entity),
      get: entity.get.bind(entity),
      query: entity.query.bind(entity),
    } as Entity<CH, CO> & Record<CH, WithQueryEntity<string, string>> & Record<CO, AnyFn>);
  }

  private constructor(name: string, options: RuffEntityOptions<CH, CO>) {
    console.log("Create Entity");
    super(name, options, {} as RuffPageableResourcesQueryModel);
  }

  query(condition: AnyRecord) {
    return WithQueryEntity.createEntity(
      this._dirname,
      this._options,
      condition as RuffPageableResourcesQueryModel
    );
  }
}
