
type CallParams<P extends RuffDataModel = any> = {
  payload?: P,
  query?: RuffHttpQueryCondition,
  idOrKeys?: IdOrKeys,
  subIdOrKeys?: IdOrKeys,
}
interface RuffClientBasicMethods {
  isMock: boolean;
  // 请求需要授权时
  async request<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    config: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  async get<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  async post<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  async put<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  async patch<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<Partial<D>>
  ): Promise<RuffResponseContent<T>>;

  async delete<T extends RuffHttpResource = any, D extends RuffDataModel = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  async $call<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    apiId: string,
    params: CallParams<D>,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  get network(): {
    timeout: number;
    endpoint: string;
  };
}

interface RuffResourceMethods extends RuffClientBasicMethods {
  /** 创建资源 */
  $create_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    model: D,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  /** 获取资源 */
  $get_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>>;

  $get_pageable_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    query?: RuffPageableResourcesQueryModel,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<RutpResourcesList<T>>>;

  /** 写入资源 */
  $set_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    data: Partial<D>,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>,
    partially = false
  ): Promise<RuffResponseContent<T>>;

  /** 删除资源 */
  $remove_resource<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    pathname: string,
    query?: RuffHttpQueryCondition,
    config?: AxiosRequestConfig<D>,
  ): Promise<RuffResponseContent<T>>;
}

type RuffRequestConfig<T = any> = AxiosRequestConfig<T> | {};
type RuffResponse<T extends RuffHttpResource = any, D extends RuffDataModel = any> = AxiosResponse<T, D> | {};
interface RuffClientInterceptors {
  // 请求即将开启时
  beforeRequest(req: RuffRequestConfig): void;
  // 请求过程中发生错误
  onError(error: Error, response: false): boolean;
  onError(error: AxiosError, response?: AxiosResponse): boolean;
  onError(error: Error | AxiosError, response: AxiosResponse | false): boolean;
  // 请求过程中发生错误
  onRequestError(error: AxiosError): boolean;
  // 请求失败
  onResponseError(status: number, error: AxiosError, response?: AxiosResponse): boolean;
  // 因为未授权而请求失败
  on401Error(error: AxiosError, response: AxiosResponse): boolean;
  on403Error(error: AxiosError, response: AxiosResponse): boolean;
  on404Error(error: AxiosError, response: AxiosResponse): boolean;
  // 因服务更新重启而请求失败
  onServerError(status: number, error: AxiosError): boolean;
}
interface RuffClientWithInterceptors {
  __hooks: RuffClientInterceptors;
}

interface RuffHttpClient
  extends RuffResourceRequestors,
  RuffClientInterceptors { }

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
