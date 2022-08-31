import { AxiosRequestConfig } from "axios";
import { ResourceMethod as M } from "../resource/ResourceMethod";
import { joinPath, withQuery } from "../utils";
import registerEntities from "../utils/registerEntities";
import MockResponsor from "./MockResponsor";

export default class MockRequestor<E extends string = any>
  implements RuffResourceRequestor {
  private _mockResponsor: MockResponsor;
  private _config: AxiosRequestConfig<any>;
  private _randoms: Record<string, RuffMockRandom>;

  protected constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {},
    entitis: RuffClientEntitisConfigs<E>,
    randoms: Record<string, RuffMockRandom> = {}
  ) {
    if (options) {
    }

    registerEntities(entitis, this as any);

    this._config = config || {};
    this._randoms = randoms;
    this._mockResponsor = new MockResponsor
    console.log(this._randoms);
  }

  $createEntity<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${entityPath}`;
    console.log("apiId:", apiId);

    return this._mockResponsor.resolve(
      {
        data: model,
        message: "OK",
        status: 200,
      },
      {
        ...config,
        method: "post",
        url: joinPath(entityPath) + withQuery(query),
        data: model,
      }
    );
  }

  $createEntityWithAttachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ) {
    const body = new FormData();
    for (let [key, value] of Object.entries(model || {})) {
      body.append(key, value);
    }
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $addReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $addBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    id: Id,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aid: IdOrKeys,
    bid: IdOrKeys,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableBelongings<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEnumerableBelonging = this.$getEnumerableBelongings;

  $getEnumerableAndIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    bidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${joinPath(entityPath)}:${M.LIST}`;
    const random = this._randoms[apiId];
    // console.log(random)
    if (typeof random === "function") {
      return this._mockResponsor.resolve(
        {
          data: random(query, {}, config),
          message: "OK",
          status: 200,
        },
        config
      );
    }

    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getPageableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $getPeriodBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $setEntityById<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    model: D,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $setEntityPatiallyById<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    model: D,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $setBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $removeEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ) {
    return {} as any;
  }

  $removeEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $removeBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $clearReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $runCommand<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $takeAction<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    idOrKeys: IdOrKeys,
    args: A,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<A>
  ) {
    return this._mockResponsor.resolve(
      {
        data: {},
        message: "OK",
        status: 200,
      },
      config
    );
  }
}
