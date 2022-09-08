interface RuffResourceRequestors {
  /** 创建资源 **/

  /**
   * ### 创建实体资源
   * #### ResourceMethod.POST
   */
  async $create_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.UPLOAD
   */
  async $create_main_resource_with_attachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<FormData>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.POST
   */
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
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
  async $get_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
  async $get_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.GET
   */
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
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.LIST
   */
  async $get_main_resources<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<RuffHttpResourcesList<T>>>;

  /**
   * #### ResourceMethod.LIST
   */
  async $get_pageable_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<RuffHttpResourcesList<T>>>;

  /** 写入资源 **/

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
  async $set_main_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    payload: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.PUT
   * #### ResourceMethod.PATCH
   */
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
  ): Promise<RuffResponseContent<T>>;

  /** 删除资源 **/

  /**
   * #### ResourceMethod.DELETE'
   */
  async $remove_main_resource<T extends RuffDataModel = any, D = any>(
    path: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.DELETE
   */
  async $remove_affiliated_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    path: RuffResourcePath,
    subPath: RuffResourcePath,
    idOrKeys: IdOrKeys,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /**
   * #### ResourceMethod.DELETE
   */
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
  ): Promise<RuffResponseContent<T>>;
}
