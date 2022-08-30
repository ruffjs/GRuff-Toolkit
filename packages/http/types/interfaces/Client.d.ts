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

interface RuffResourceMethods extends RuffClientBasicMethods {
  /** 创建资源 */
  $addResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  /** 获取资源 */
  $getResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  $getData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  $getIdentifiableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    id: Id,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  $getEnumerableData<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffDataRecords<T>>, D>>;

  $getPageableResources<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  $getPeriodData<T extends RuffPeriodDataItem = any, D = any>(
    pathname: string,
    query?: RuffPeriodDataQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffPeriodData<T>>, D>>;

  /** 写入资源 */
  $setResource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    model: D,
    config?: AxiosRequestConfig<D>,
    patially = false
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /** 删除资源 */
  $delResource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;
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

interface RuffHttpClient extends RuffResourceRequestor, RuffClientHooks {}

interface RuffClientOptions {
  host?: string;
  timeout: number;
  prefix: string;
}

type RuffClientEntitisConfigs<E extends string = any> = Record<
  E,
  RuffEntityConfiguration & { prefix: string }
>;

interface RuffClientConfigs<E extends string = any> {
  axios?: AxiosRequestConfig<any>;
  entitis?: RuffClientEntitisConfigs<E>;
}

type RuffClientMocksConfigs<E extends string = any> = Record<
  E,
  RuffMockConfiguration
>;

interface RuffMockClientConfigs<E extends string = any>
  extends RuffClientConfigs<E> {
  mock: RuffClientMocksConfigs<E>;
}

interface RuffRandomsClientConfigs<E extends string = any>
  extends RuffClientConfigs<E> {
  randoms: Record<string, RuffMockRandom>;
}
