import { AxiosRequestConfig } from "axios";
import { joinPath as $, withQuery as q } from "../utils";
import AbstractBaseClient from "./AbstractBaseClient";

export default class RESTfulRequestor
  extends AbstractBaseClient
  implements RuffResourceMethods, RuffResourceRequestors
{
  withQuery = q;

  $create_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    data: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.post<T, D>(pathname + q(query), data, config);
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
    return this.$create_resource<T, D>($(path), data, query, config);
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
    return this.$create_resource<T, FormData>($(path), body, query, config);
  }

  $create_affiliated_resource<
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
    return this.$create_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath)]),
      data,
      query,
      config
    );
  }

  $get_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<T, D>(pathname + q(query), config);
  }

  $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_resource<T, D>($([pathname, id]), query, config);
  }

  $get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrkeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_resource<T, D>($([$(path), $(idOrkeys)]), query, config);
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
    return this.$get_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath)]),
      query,
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
    return this.$get_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath), $(subIdOrkeys)]),
      query,
      config
    );
  }

  $get_pageable_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.get<RuffHttpResourcesList<T>, D>(pathname + q(query), config);
  }

  $get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ) {
    return this.$get_pageable_resource<T, D>($(path), query, config);
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
    return this.$get_pageable_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath)]),
      query,
      config
    );
  }

  $set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    data: Partial<D>,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>,
    patially = false
  ) {
    if (patially) {
      return this.patch<T, D>(pathname + q(query), data, config);
    }
    return this.put<T, D>(pathname + q(query), data as D, config);
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
    return this.$set_resource<T, D>(
      $([$(path), $(idOrKeys)]),
      data,
      query,
      config,
      (config as any)?.patially || false
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
    return this.$set_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath)]),
      data,
      query,
      config,
      (config as any)?.patially || false
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
    return this.$set_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath), $(subIdOrkeys)]),
      data,
      query,
      config,
      (config as any)?.patially || false
    );
  }

  $remove_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ) {
    return this.delete<T, D>(pathname + q(query), config);
  }

  $remove_main_resource<T extends RuffDataModel = any, D = any>(
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
    return this.$remove_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath)]),
      query,
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
    return this.$remove_resource<T, D>(
      $([$(path), $(idOrkeys), $(subPath), $(subIdOrkeys)]),
      query,
      config
    );
  }

  $call<T extends RuffDataModel = any, P extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
  ) {
    return this.request<T, P>({
      method: "post",
      ...config,
      url: $([$(path), $(callPath)]) + q(query),
      data: payload,
    });
  }

  $call_by_id_or_keys<T extends RuffDataModel = any, P extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
  ) {
    return this.request<T, P>({
      method: "post",
      ...config,
      url: $([$(path), $(idOrKeys), $(callPath)]) + q(query),
      data: payload,
    });
  }
}
