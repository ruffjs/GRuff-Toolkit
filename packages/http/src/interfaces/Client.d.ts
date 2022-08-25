interface RuffClientBasicMethods {
  // 请求需要授权时
  request<T = any, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  patch<T = any, D = any>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<Partial<D>>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>>;

  get network(): {
    timeout: number;
    endpoint: string;
  };

  get axiosInstance(): AxiosInstance;
}

interface RuffClientResourceMethods {
  /** 创建资源 **/
  $addResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  $createEntity<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  $createEntityWithAttachment<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<FormData>
  );

  $addReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $createBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    id: Id,
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  /** 获取资源 **/
  $getResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  $getData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    config?: AxiosRequestConfig<D>
  );

  $getEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  );

  $getEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    config?: AxiosRequestConfig<D>
  );

  $getIdentifiableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aid: Id | Id[],
    bid: Id | Id[],
    config?: AxiosRequestConfig<D>
  );

  $getEnumerableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $getEnumerableEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  );
  $getEnumerableBelongings<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $getEnumerableBelonging;

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
  );

  $getPageableResources<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  );

  $getEntitys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, any>>;

  $getPageableBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  );

  $getPeriodData<T extends RuffPeriodDataItem = any, D = any>(
    pathname: string,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  );

  $getPeriodBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  );

  /** 写入资源 **/
  $setResource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    model: D,
    config?: AxiosRequestConfig<D>,
    patially = false
  );

  $setEntityById<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    idOrKeys: Id | Id[],
    model: D,
    config?: AxiosRequestConfig<D>
  );

  $setEntityPatiallyById<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    idOrKeys: Id | Id[],
    model: D,
    config?: AxiosRequestConfig<D>
  );

  $setBelonging<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $setBelongingPatially<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    model: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  /** 删除资源 **/
  $delResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );
  $removeEntityById<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    id: Id,
    config?: AxiosRequestConfig<D>
  );

  $removeEntityByKeys<T extends RuffDataModel = any, D = any>(
    entityPath: RuffResourcePath,
    keys: Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $removeBelonging<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    entityPath: RuffResourcePath,
    belongingPath: RuffResourcePath,
    aidOrAkeys: Id | Id[],
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  $clearReferences<
    T extends RuffDataModel = any,
    D extends RuffReferencesDescription = any
  >(
    entityPath: RuffResourcePath,
    description: D,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<D>
  );

  /** RPC风格接口 **/
  $runCommand<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    args: A,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<A>
  );

  // /api/v1/device/{devicaId}/acquisition/refresh
  $takeAction<T extends RuffDataModel = any, A extends AnyRecord = any>(
    entityPath: RuffResourcePath,
    command: string,
    idOrKeys: Id | Id[],
    args: A,
    query?: RuffHttpQueryModel | string,
    config?: AxiosRequestConfig<A>
  );
}

interface RuffClientHooks {
  // 请求需要授权时
  onTokenRequired(req: AxiosRequestConfig<any>): void;
  // 请求即将开启时
  onBeforeRequest(req: AxiosRequestConfig<any>): void;
  // 请求过程中发生错误
  onRequestError(error: AnyError): void;
  // 请求成功
  onResponseFulfilled(res: AxiosResponse<any, any>): void;
  // 请求成功，但响应不符合预期
  onResponseUnexpected(res: AxiosResponse<any, any>): void;
  // 请求失败
  onResponseRejected(error: AnyError): void;
  // 因为未授权而请求失败
  onResponseUnauthorized(error: AnyError, signed: boolean): void;
  // 因服务更新重启而请求失败
  onServiceError(error: AnyError): void;
}

interface RuffHttpClient
  extends RuffClientBasicMethods,
    RuffClientResourceMethods,
    RuffClientHooks {}

interface RuffClientOptions {
  host?: string;
  timeout: number;
}
