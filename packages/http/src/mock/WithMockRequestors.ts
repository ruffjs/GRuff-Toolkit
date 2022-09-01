import { Payload } from "./../../../../node_modules/vuex/types/index.d";
import { AxiosRequestConfig } from "axios";
import { ResourceMethod as M } from "../utils/resource-methods";
import { joinPath as $, withQuery as q } from "../utils";
import { registerResources } from "../utils/resources-helper";
import MockResponsor from "../responses/MockResponsor";

export default class MockRequestor<
  R extends string = any,
  C extends string = any
  > implements RuffResourceRequestors {
  private _mockResponsor: MockResponsor;
  private _config: AxiosRequestConfig<any>;
  private _randomRules: Record<string, RuffMockRandom>;

  withQuery = q;

  protected constructor(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    config: AxiosRequestConfig<any> = {},
    resources: RuffClientResourcesConfigs<R>,
    calls: RuffClientRPCConfigs<C>,
    randomRules: Record<string, RuffMockRandom> = {}
  ) {
    if (options) {
    }

    registerResources(resources, calls, this as any);

    this._config = config || {};
    this._randomRules = randomRules;
    this._mockResponsor = new MockResponsor(
      this as unknown as RuffClientWithInterceptors
    );
    console.log(this._randomRules);
  }

  $create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    data: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${path}`;
    console.log("apiId:", apiId);

    return this._mockResponsor.resolve(
      {
        data,
        message: "OK",
        status: 200,
      },
      {
        ...config,
        method: "post",
        url: $(path) + q(query),
        data,
      }
    );
  }

  $create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    data: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ) {
    const body = new FormData();
    for (let [key, value] of Object.entries(data || {})) {
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

  $create_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    id: Id,
    data: D,
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

  $get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrkeys: IdOrKeys,
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

  $get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
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

  $get_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
    subIdOrkeys: IdOrKeys,
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

  $get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.LIST}`;
    const random = this._randomRules[apiId];
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

  $get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
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

  $set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    data: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this._mockResponsor.resolve(
      {
        data,
        message: "OK",
        status: 200,
      },
      config
    );
  }

  $set_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
    data: D,
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

  $set_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
    subIdOrkeys: IdOrKeys,
    data: D,
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

  $remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
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

  $remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
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

  $remove_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrkeys: IdOrKeys,
    subIdOrkeys: IdOrKeys,
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

  $call<T extends RuffDataModel = any, P extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    Payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
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

  $call_by_id_or_keys<T extends RuffDataModel = any, P extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    Payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
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
