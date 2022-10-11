import { ResourceMethod as M } from "../../utils/resource-methods";
import { joinPath as $, withQueryString as q, toObjectiveQuery as _ } from "../../utils/formatters";
import HTTP_STATUS_CODES, { StatusCode } from "../../utils/status-codes";
import MockResponsor from "../../models/MockResponsor";
import AbstractBaseClient from "../core/AbstractClient";

export default abstract class MockRequestor<
  R extends string = any,
  C extends string = any
> extends AbstractBaseClient<R, C> implements RuffClientResourceRequestorAPIs {
  private _mockResponsor: MockResponsor;
  private _config: RuffClientRequestConfig<any>;
  private _mockRules: Record<string, RuffMockRandomConfig>;
  private _mockParser: any

  protected constructor(
    options: (RuffCreateClientOptions & Partial<RuffClientHooks>) | string,
    config: RuffClientRequestConfig<any> = {},
    resources: RuffClientResourcesConfigs<R>,
    calls: RuffClientCallersConfigs<C>,
    mockRules: Record<string, RuffMockRandomConfig> = {}
  ) {
    super(options, resources, calls)
    if (options) {
    }

    this._config = config || {};
    this._mockRules = mockRules;
    this._mockResponsor = new MockResponsor(this as unknown as RuffClient);
  }

  get isMock() { return true }

  async $_create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.POST}`
    // console.log("apiId:", apiId);
    return this.$_call<T, D>(apiId, { payload, query }, config)
  }

  async $_create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<FormData>
  ) {
    return this.$_create_main_resource(path, payload, query, config as unknown as RuffClientRequestConfig<D>)
  }

  async $_create_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.POST}`
    return this.$_call<T, D>(apiId, { idOrKeys, payload, query }, config)
  }

  async $_get_main_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.GET}`
    return this.$_call<T, D>(apiId, { idOrKeys, query }, config)
  }

  async $_get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.GET}`
    return this.$_call<T, D>(apiId, { idOrKeys, query }, config)
  }

  async $_get_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.GET}`
    return this.$_call<T, D>(apiId, { idOrKeys, subIdOrKeys, query }, config)
  }

  async $_get_main_resources<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.LIST}`;
    return this.$_call<T, D>(apiId, { query }, config)
  }

  async $_get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.LIST}`
    return this.$_call<T, D>(apiId, { idOrKeys, query }, config)
  }

  async $_set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}:${mockPort}`
    return this.$_call<T, D>(apiId, { idOrKeys, payload, query }, config)
  }

  async $_set_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}/**/${$(subPath)}:${mockPort}`
    return this.$_call<T, D>(apiId, { idOrKeys, payload, query }, config)
  }

  async $_set_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const mockPort = (config as any)?.partially ? M.PATCH : M.PUT
    const apiId = `${$(path)}/**/${$(subPath)}:${mockPort}`
    return this.$_call<T, D>(apiId, { idOrKeys, subIdOrKeys, payload, query }, config)
  }

  async $_remove_main_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}:${M.DELETE}`
    return this.$_call<T, D>(apiId, { idOrKeys, query }, config)
  }

  async $_remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.DELETE}`
    return this.$_call<T, D>(apiId, { idOrKeys, query }, config)
  }

  async $_remove_identifiable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    subIdOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    const apiId = `${$(path)}/**/${$(subPath)}:${M.DELETE}`
    return this.$_call<T, D>(apiId, { idOrKeys, subIdOrKeys, query }, config)
  }

  async $_call<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    apiId: string,
    { payload, query, idOrKeys, subIdOrKeys }: RuffClientResourceCallParams<D> = {},
    config: RuffClientRequestConfig<D> = {}
  ) {
    // console.log(apiId, payload, query, idOrKeys)
    const random = this._mockRules[apiId];
    switch (typeof random) {
      case 'function': {
        try {
          const data = await random({ payload, query: _(query), idOrKeys: $(idOrKeys) || undefined, subIdOrKeys: $(subIdOrKeys) || undefined }, config)
          const status = data?.code in HTTP_STATUS_CODES ? data.code as StatusCode : 200
          return this._mockResponsor.resolve<T, D>(
            data,
            config,
            status
          );
        } catch (error: any) {
          // console.log("$_call", error)
          const status = error?.code in HTTP_STATUS_CODES ? error.code as StatusCode : 400
          return this._mockResponsor.reject<T, D>(
            error,
            config,
            status
          );
        }
      }
      case 'object': {
        const data = this._mockParser.parse(random, { payload, query: _(query), idOrKeys: $(idOrKeys) || undefined, subIdOrKeys: $(subIdOrKeys) || undefined, config })
        const status = data?.code in HTTP_STATUS_CODES ? data.code as StatusCode : 200
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
