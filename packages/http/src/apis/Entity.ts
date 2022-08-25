import { formatQueryCondition, joinPath } from "../utils/index";
import EntityRef, { ExtendedEntityRef } from "./EntityRef";
import WithQueryEntity from "./WithQueryEntity";
import Callables from "./Callables";

type CallableEntity<B extends string = any, A extends string = any> = (
  idOrKeys: IdOrKeys
) => ExtendedEntityRef<B, A>;

export type ExtendedEntity<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
> = CallableEntity<B, A> &
  Entity &
  Record<C, CallableEntity & Entity> &
  Record<X, Command>;

export default class Entity<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
> extends WithQueryEntity<B, A> {
  static createEntity<
    C extends string = any,
    X extends string = any,
    B extends string = any,
    A extends string = any
  >(name: string, options: Readonly<RuffEntityOptions<C, X, B, A>>) {
    const entity = new Entity(name, options);
    const callable = function CallableEntity(idOrKeys: IdOrKeys) {
      return EntityRef.createRef(
        name,
        idOrKeys,
        options,
        {} as RuffPageableResourcesQueryModel
      );
    } as unknown as CallableEntity<B, A>;
    const { client, resource, config } = options;

    const { children, commands } = resource;
    if (children !== undefined) {
      (Object.keys(children) as C[]).forEach((childname) => {
        (callable as AnyRecord)[childname] = (entity as AnyRecord)[childname] =
          Entity.createEntity(childname, {
            client,
            config,
            prefix: entity.getChildrenPrefix(),
            resource: children[childname],
          });
      });
    }
    if (commands !== undefined) {
      (Object.keys(commands) as X[]).forEach((commandname) => {
        (callable as AnyRecord)[commandname] = (entity as AnyRecord)[
          commandname
        ] = Callables.createApi(commandname, {
          client,
          prefix: entity.getChildrenPrefix(),
          command: commands[commandname],
        });
      });
    }

    return Object.assign(callable, {
      setPrefix: entity.setPrefix.bind(entity),
      getPrefix: entity.getPrefix.bind(entity),
      list: entity.list.bind(entity),
      get: entity.get.bind(entity),
      query: entity.query.bind(entity),
    } as unknown as ExtendedEntity<C, X, B, A>);
  }

  static idealizeEntity<
    CI extends string = any,
    XI extends string = any,
    BI extends string = any,
    AI extends string = any
  >(entity: Entity, options: RuffEntityConfiguration<CI, XI, BI, AI>) {
    return entity as ExtendedEntity<CI, XI, BI, AI>;
  }

  private constructor(name: string, options: RuffEntityOptions<C, X, B, A>) {
    super(name, options, {} as RuffPageableResourcesQueryModel);
  }

  getChildrenPrefix(): string {
    return joinPath([this._prefix, this._dirname]);
  }

  query(...qs: RuffHttpQueryCondition[]): WithQueryEntity {
    const condition = formatQueryCondition(...qs);
    return WithQueryEntity.createEntity(
      this._dirname,
      this._options,
      condition as RuffPageableResourcesQueryModel
    );
  }
}
