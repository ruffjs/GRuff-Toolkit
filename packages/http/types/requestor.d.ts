interface RuffClientResourceRequestorAPIs {
  /** 创建资源 **/

  /**
   * ### 创建实体资源
   * #### ResourceMethod.POST
   */
  async $_create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.UPLOAD
   */
  async $_create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<FormData>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.POST
   */
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
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
  async $_get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
  async $_get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
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
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.LIST
   */
  async $_get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<RuffHttpPageableResources<T>>>;

  /**
   * #### ResourceMethod.LIST
   */
  async $_get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<RuffHttpPageableResources<T>>>;

  /** 写入资源 **/

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
  async $_set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<RuffClientResponseContent<T>>;

  /** 删除资源 **/

  /**
   * #### ResourceMethod.DELETE'
   */
  async $_remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.DELETE
   */
  async $_remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /**
   * #### ResourceMethod.DELETE
   */
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
  ): Promise<RuffClientResponseContent<T>>;
}
