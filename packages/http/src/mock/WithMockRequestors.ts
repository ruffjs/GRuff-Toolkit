import { AxiosRequestConfig } from "axios";
import { ResourceMethod as M } from "../utils/resource-methods";
import { joinPath as $, withQuery as q, toObjectiveQuery as _ } from "../utils";
import { registerResources } from "../utils/resources-helper";
import MockResponsor from "../responses/MockResponsor";
import HTTP_STATUS_CODES from "../utils/status-codes";

export default class MockRequestor<
  R extends string = any,
  C extends string = any
> implements RuffResourceRequestors {
  private _mockResponsor: MockResponsor;
  private _config: AxiosRequestConfig<any>;
  private _randomRules: Record<string, RuffMockRandom>;
  private _mockParser: any

  withQuery = q;
  toObjectiveQuery = _

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
    // console.log(this._randomRules);
  }

  get isMock() { return true }

  $create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.POST}`
    console.log("apiId:", apiId);
    return this.$call<T, D>(apiId, { payload, query }, config)

    return this._mockResponsor.resolve(
      {
        data: payload as unknown as T,
        message: "OK",
        code: 200,
      },
      {
        ...config,
        method: "post",
        url: $(path) + q(query),
        data: payload,
      }
    );
  }

  $create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ) {
    return this.$create_main_resource(path, payload, query, config as unknown as AxiosRequestConfig<D>)
  }

  $create_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.POST}`
    return this.$call<T, D>(apiId, { idOrKeys, payload, query }, config)
  }

  $get_main_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.GET}`
    return this.$call<T, D>(apiId, { idOrKeys, query }, config)
  }

  $get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.GET}`
    return this.$call<T, D>(apiId, { idOrKeys, query }, config)
  }

  $get_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.GET}`
    return this.$call<T, D>(apiId, { idOrKeys, subIdOrKeys, query }, config)
  }

  $get_main_resources<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.LIST}`;
    return this.$call<T, D>(apiId, { query }, config)
  }

  $get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.LIST}`
    return this.$call<T, D>(apiId, { idOrKeys, query }, config)
  }

  $set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}:${mockPort}`
    return this.$call<T, D>(apiId, { idOrKeys, payload, query }, config)
    return this._mockResponsor.resolve(
      {
        data: payload as unknown as T,
        message: "OK",
        code: 200,
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
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}/**/${$(subPath)}:${mockPort}`
    return this.$call<T, D>(apiId, { idOrKeys, payload, query }, config)
  }

  $set_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}/**/${$(subPath)}:${mockPort}`
    return this.$call<T, D>(apiId, { idOrKeys, subIdOrKeys, payload, query }, config)
  }

  $remove_main_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.DELETE}`
    return this.$call<T, D>(apiId, { idOrKeys, query }, config)
  }

  $remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.DELETE}`
    return this.$call<T, D>(apiId, { idOrKeys, query }, config)
  }

  $remove_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.DELETE}`
    return this.$call<T, D>(apiId, { idOrKeys, subIdOrKeys, query }, config)
  }

  $call<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    apiId: string,
    { payload, query, idOrKeys, subIdOrKeys }: CallParams<D> = {},
    config: AxiosRequestConfig<D> = {}
  ) {
    console.log(apiId, payload, query, idOrKeys)
    const random = this._randomRules[apiId];
    switch (typeof random) {
      case 'function': {
        const data = random({ payload, query: _(query), idOrKeys: $(idOrKeys), subIdOrKeys: $(subIdOrKeys) }, config)
        const status = data?.code in HTTP_STATUS_CODES ? data.code : 200
        return this._mockResponsor.resolve<T, D>(
          data,
          config,
          status
        );
      }
      case 'object': {
        const data = this._mockParser.parse(random, { payload, query: _(query), idOrKeys: $(idOrKeys), subIdOrKeys: $(subIdOrKeys), config })
        const status = data?.code in HTTP_STATUS_CODES ? data.code : 200
        return this._mockResponsor.resolve<T, D>(
          data,
          config,
          status
        );
      }
      case 'undefined':
      default:
        return this._mockResponsor.reject<T, D>(
          {
            message: `Mock handler for api ${apiId} not found`,
            code: 404,
          },
          config,
          404
        );
    }
  }
}
