interface RuffResourceRequestor {
  /** 创建资源 **/

  /**
   * ### 创建实体资源
   * #### ResourceMethod.POST
   * @param entityPath
   * @param model
   * @param query
   * @param config
   */
  $createEntity<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  /**
   * #### ResourceMethod.UPLOAD
   * @param entityPath
   * @param model
   * @param query
   * @param config
   */
  $createEntityWithAttachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<FormData>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, FormData>>;

  /**
   * #### ResourceMethod.REFER
   */
  $addReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.WRITE
   */
  $addBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    id: Id,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.GET
   */
  $getEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.GET_BY_KEYS
   */
  $getEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.READ_BY_IDS
   */
  $getIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: IdOrKeys,
    bidOrAkeys: IdOrKeys,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.ENUM
   */
  $getEnumerableEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffDataRecords<T>>, D>>;

  /**
   * #### ResourceMethod.ENUM
   */
  $getEnumerableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffDataRecords<T>>, D>>;

  /**
   * #### ResourceMethod.ENUM
   */
  $getEnumerableBelongings<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffDataRecords<T>>, D>>;

  /**
   * #### ResourceMethod.ENUM_BY_IDS
   */
  $getEnumerableAndIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    bidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffDataRecords<T>>, D>>;

  /**
   * #### ResourceMethod.LIST
   */
  $getEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  /**
   * #### ResourceMethod.TAKE
   */
  $getPageableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  /**
   * #### ResourceMethod.LOG
   */
  $getPeriodBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<
    AxiosResponse<RuffHttpResponse<RuffPeriodData<RuffHttpResourcesList<T>>>, D>
  >;

  /** 写入资源 **/

  /**
   * #### ResourceMethod.PUT
   */
  $setEntityById<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    idOrKeys: Id | Id[],
    model: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.PATCH
   */
  $setEntityPatiallyById<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    idOrKeys: Id | Id[],
    model: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.MOD
   */
  $setBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /** 删除资源 **/

  /**
   * #### ResourceMethod.DELETE
   * @param entityPath
   * @param id
   * @param config
   */
  $removeEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.DELETE_BY_KEYS'
   */
  $removeEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.DROP
   */
  $removeBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * #### ResourceMethod.UNREF
   */
  $clearReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /**
   * ### 实体RPC风格接口
   * @param entityPath
   * @param command
   * @param args
   * @param query
   * @param config
   */
  $runCommand<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    args: A,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<A>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, A>>;

  /**
   * ### 附属资源RPC风格接口
   * #### /api/v1/device/{devicaId}/acquisition/refresh
   * @param entityPath
   * @param command
   * @param idOrKeys
   * @param args
   * @param query
   * @param config
   */
  $takeAction<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    idOrKeys: Id | Id[],
    args: A,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<A>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, A>>;
}
