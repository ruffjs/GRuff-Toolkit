type RuffClientResourceCallParams<P extends RuffDataModel = any> = {
  payload?: P;
  query?: RuffHttpQueryCondition;
  idOrKeys?: IdOrKeys;
  subIdOrKeys?: IdOrKeys;
};

interface RuffClientBaseAPIs {
  isMock: boolean;
  // 请求需要授权时
  request<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    config: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  get<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  post<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: D,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  put<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: D,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  patch<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: Partial<D>,
    config?: RuffClientRequestConfig<Partial<D>>
  ): Promise<RuffClientResponseContent<T>>;

  delete<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  $_call<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    apiId: string,
    params: RuffClientResourceCallParams<D>,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T | RuffHttpPageableResources<T>>>;
}

interface RuffClientResourceBaseAPIs extends RuffClientBaseAPIs {
  /** 创建资源 */
  $_create_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  /** 获取资源 */
  $_get_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;

  $_get_pageable_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<RuffHttpPageableResources<T>>>;

  /** 写入资源 */
  $_set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    data: Partial<D>,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>,
    partially = false
  ): Promise<RuffClientResponseContent<T>>;

  /** 删除资源 */
  $_remove_resource<
    T extends RuffDataModel = any,
    D extends RuffDataModel = any
  >(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: RuffClientRequestConfig<D>
  ): Promise<RuffClientResponseContent<T>>;
}

interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: RuffClientRequestConfig<D>;
  request?: any;
}
type RuffClientRequestConfig<T = any> = any;
type RuffClientResponse<
  T extends RuffHttpResource = any,
  D extends RuffDataModel = any
> = AxiosResponse<T, D> | any;

interface RuffClientHooks {
  // 请求即将开启时
  beforeRequest(req: RuffClientRequestConfig): void;
  // 请求过程中发生错误
  onError(error: Error, response: false): boolean;
  onError(error: AxiosError, response?: AxiosResponse): boolean;
  onError(error: Error | AxiosError, response: AxiosResponse | false): boolean;
  // 请求过程中发生错误
  onRequestError(error: AxiosError): boolean;
  // 请求失败
  onResponseError(
    status: number,
    error: AxiosError,
    response?: AxiosResponse
  ): boolean;
  // 因为未授权而请求失败
  on401Error(error: AxiosError, response: AxiosResponse): boolean;
  on403Error(error: AxiosError, response: AxiosResponse): boolean;
  on404Error(error: AxiosError, response: AxiosResponse): boolean;
  // 因服务更新重启或其他原因而请求失败
  onServerError(status: number, error: AxiosError): boolean;
  // 请求超时或网络异常
  onNetworkError(error: AxiosError): boolean;
}
interface RuffClient
  extends RuffClientResourceBaseAPIs,
    RuffClientResourceRequestorAPIs,
    RuffClientHooks {
  readonly pageIndex: number;
  pageSize: number;
  listKey: string;
  countKey: string;

  get network(): {
    timeout: number;
    endpoint: string;
  };

  withQueryString(query?: RuffHttpQueryCondition): string;
  toObjectiveQuery(query?: RuffHttpQueryCondition): RuffHttpQueryModel;

  defineApiHub<
    T extends CreateApiHubDefination = any,
    X extends Record<
      string,
      AnyFn<Promise<RuffClientResponseContent<any>>>
    > = {}
  >(
    prefix: string,
    config: CreateApiHubConfig<T>,
    more: X | ((client: RuffClient) => X) = {} as X
  ): { [k in keyof T]: RuffResourceCaller<T[k]["type"], T[k]["model"]> } & X;
}

interface RuffCreateClientOptions {
  host?: string;
  timeout: number;
  prefix: string;
}

type RuffClientResourcesConfigs<R extends string = any> = Record<
  R,
  RuffCreateResourceProviderConfig & { prefix: string }
>;

type RuffClientCallersConfigs<C extends string = any> = Record<
  C,
  RuffCreateCallableResouceProviderConfig & { prefix: string }
>;

interface RuffCreateClientConfigs<
  R extends string = any,
  C extends string = any
> {
  axios?: RuffClientRequestConfig<any>;
  resources?: RuffClientResourcesConfigs<R>;
  calls?: RuffClientCallersConfigs<C>;
}

type RuffClientMockResourcesConfigs<E extends string = any> = Record<
  E,
  RuffCreateResourceMockerConfig
> &
  RuffClientResourcesConfigs<E>;

interface RuffCreateMockClientSimpleConfigs<E extends string = any>
  extends RuffCreateClientConfigs<E> {
  resources: RuffClientMockResourcesConfigs<E>;
}

interface RuffCreateMockClientWithMockRulesConfigs<E extends string = any>
  extends RuffCreateClientConfigs<E> {
  resources: RuffClientResourcesConfigs<E> | RuffClientMockResourcesConfigs<E>;
  mockrules: Record<string, RuffMockRandomConfig>;
}
