interface RuffResourceRequestors {
  /** 创建资源 **/

  /**
   * ### 创建实体资源
   * #### ResourceMethod.POST
   */
  $create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  /**
   * #### ResourceMethod.UPLOAD
   */
  $create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, FormData>>;

  /**
   * #### ResourceMethod.POST
   */
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
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.GET
   */
  $get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.GET
   */
  $get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.GET
   */
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
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.LIST
   */
  $get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  /**
   * #### ResourceMethod.LIST
   */
  $get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  /** 写入资源 **/

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
  $set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /** 删除资源 **/

  /**
   * #### ResourceMethod.DELETE'
   */
  $remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.DELETE
   */
  $remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.DELETE
   */
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
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * ### 主RPC风格接口
   * @param path
   * @param command
   * @param payload
   * @param query
   * @param config
   */
  $call<T extends RuffDataModel = any, A extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, P>>;

  /**
   * ### 附属RPC风格接口
   * #### /api/v1/device/{deviceId}/acquisition/refresh
   * @param path
   * @param command
   * @param idOrKeys
   * @param payload
   * @param query
   * @param config
   */
  $call_by_id_or_keys<T extends RuffDataModel = any, P extends AnyRecord = any>(
    path: RuffResourcePath,
    callPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: P,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<P>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, P>>;
}
