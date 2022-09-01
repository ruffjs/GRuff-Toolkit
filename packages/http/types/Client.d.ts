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
  $create_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, any>>;

  /** 获取资源 */
  $get_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  $get_pageable_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<RuffHttpResourcesList<T>>, D>>;

  /** 写入资源 */
  $set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    data: Partial<D>,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>,
    patially = false
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;

  /** 删除资源 */
  $remove_resource<T extends RuffDataModel = any, D = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>, D>>;
}

type RuffRequestConfig<T = any> = AxiosRequestConfig<T> | {};
type RuffResponse<T = any, D = any> = AxiosResponse<T, D> | {};
interface RuffClientInterceptors {
  // 请求需要授权时
  onTokenRequired(req: RuffRequestConfig): string | null;
  // 请求即将开启时
  onBeforeRequest(req: RuffRequestConfig): void;
  // 请求成功
  onResponseFulfilled(res: RuffResponse): any;

  // 请求过程中发生错误
  onRequestError(error: AnyError): boolean;
  // 请求失败
  onResponseRejected(error: AnyError): boolean;
  // 因为未授权而请求失败
  onResponseUnauthorized(error: AnyError, signed: boolean): boolean;
  // 因服务更新重启而请求失败
  onServiceError(error: AnyError): boolean;
}
interface RuffClientWithInterceptors {
  __hooks: RuffClientInterceptors;
}

interface RuffHttpClient
  extends RuffResourceRequestors,
    RuffClientInterceptors {}

interface RuffClientOptions {
  host?: string;
  timeout: number;
  prefix: string;
}

type RuffClientResourcesConfigs<R extends string = any> = Record<
  R,
  RuffResourceConfiguration & { prefix: string }
>;

type RuffClientRPCConfigs<C extends string = any> = Record<
  C,
  RuffHttpRPCConfiguration & { prefix: string }
>;

interface RuffClientConfigs<R extends string = any, C extends string = any> {
  axios?: AxiosRequestConfig<any>;
  resources?: RuffClientResourcesConfigs<R>;
  calls?: RuffClientRPCConfigs<C>;
}

type RuffClientMocksConfigs<E extends string = any> = Record<
  E,
  RuffMockConfiguration
> &
  RuffClientResourcesConfigs<E>;

interface RuffMockClientSimpleConfigs<E extends string = any>
  extends RuffClientConfigs<E> {
  resources: RuffClientMocksConfigs<E>;
  withMock: boolean;
}

interface RuffMockClientWithRandomsConfigs<E extends string = any>
  extends RuffClientConfigs<E> {
  resources: RuffClientResourcesConfigs<E> | RuffClientMocksConfigs<E>;
  withMock?: boolean;
  rules: Record<string, RuffMockRandom>;
}
