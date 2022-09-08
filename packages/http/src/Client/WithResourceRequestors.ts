import { AxiosRequestConfig, AxiosResponse } from "axios";
import { joinPath as $, withQuery as q } from "../utils";
import AbstractBaseClient from "./AbstractBaseClient";

export default class RESTfulRequestor
  extends AbstractBaseClient
  implements RuffResourceMethods, RuffResourceRequestors {
  get isMock() { return false }
  withQuery = q;

  async $create_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.post<T, D>(pathname + q(query), payload, config);
  }

  async $create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$create_resource<T, D>($(path), payload, query, config);
  }

  async $create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ) {
    const body = new FormData();
    for (let [key, value] of Object.entries(payload || {})) {
      body.append(key, value);
    }
    return this.$create_resource<T, FormData>($(path), body, query, config);
  }

  async $create_affiliated_resource<
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
    return this.$create_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      payload,
      query,
      config
    );
  }

  async $get_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<T, D>(pathname + q(query), config);
  }

  async $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_resource<T, D>($([pathname, id]), query, config);
  }

  async $get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_resource<T, D>($([$(path), $(idOrKeys)]), query, config);
  }

  async $get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
  }

  async $get_identifiable_affiliated_resource<
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
    return this.$get_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      query,
      config
    );
  }

  async $get_pageable_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<RuffHttpResourcesList<T>, D>(pathname + q(query), config);
  }

  async $get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_pageable_resource<T, D>($(path), query, config);
  }

  async $get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_pageable_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
  }

  async $set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    data: Partial<D>,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>,
    partially = false
  ) {
    if (partially) {
      return this.patch<T, D>(pathname + q(query), data, config);
    }
    return this.put<T, D>(pathname + q(query), data as D, config);
  }

  async $set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$set_resource<T, D>(
      $([$(path), $(idOrKeys)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
  }

  async $set_affiliated_resource<
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
    return this.$set_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
  }

  async $set_identifiable_affiliated_resource<
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
    return this.$set_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
  }

  async $remove_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.delete<T, D>(pathname + q(query), config);
  }

  async $remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$remove_resource<T, D>(
      $([$(path), $(idOrKeys)]),
      query,
      config
    );
  }

  async $remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$remove_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
  }

  async $remove_identifiable_affiliated_resource<
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
    return this.$remove_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      query,
      config
    );
  }

  async $call<T extends RuffDataModel = any, D extends RuffDataModel = any>(): Promise<RuffResponseContent<T>> {
    throw new Error(
      "You cannot invock this method of a Http Client, please use an Mock Client instead."
    );
  }
}
