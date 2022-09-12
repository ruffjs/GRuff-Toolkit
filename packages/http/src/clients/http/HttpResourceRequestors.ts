import { joinPath as $ } from "../../utils/formatters";
import WithAxiosClient from "./WithAxiosClient";

export default abstract class RESTfulRequestor<R extends string = any, C extends string = any>
  extends WithAxiosClient<R, C>
  implements RuffClientResourceRequestorAPIs {

  async $_create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    return this.$_create_resource<T, D>($(path), payload, query, config);
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
    const body = new FormData();
    for (let [key, value] of Object.entries(payload || {})) {
      body.append(key, value);
    }
    return this.$_create_resource<T, FormData>($(path), body, query, config);
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
    return this.$_create_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      payload,
      query,
      config
    );
  }

  async $_get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    return this.$_get_resource<T, D>($([$(path), $(idOrKeys)]), query, config);
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
    return this.$_get_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
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
    return this.$_get_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      query,
      config
    );
  }

  async $_get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ) {
    return this.$_get_pageable_resource<T, D>($(path), query, config);
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
    return this.$_get_pageable_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
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
    return this.$_set_resource<T, D>(
      $([$(path), $(idOrKeys)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
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
    return this.$_set_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
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
    return this.$_set_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      payload,
      query,
      config,
      (config as any)?.partially || false
    );
  }



  async $_remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ) {
    return this.$_remove_resource<T, D>(
      $([$(path), $(idOrKeys)]),
      query,
      config
    );
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
    return this.$_remove_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath)]),
      query,
      config
    );
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
    return this.$_remove_resource<T, D>(
      $([$(path), $(idOrKeys), $(subPath), $(subIdOrKeys)]),
      query,
      config
    );
  }
}
