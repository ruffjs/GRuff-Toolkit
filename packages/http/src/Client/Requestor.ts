import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const DefaultServer: RuffClientOptions = {
  host: "/",
  timeout: 1000 * 30,
};

export default abstract class Requestor {
  // 与前端静态文件同域的服务器
  static readonly DefaultServer: RuffClientOptions = {
    ...DefaultServer,
  };

  private _endpoint: string = "/";
  private _axiosInstance: AxiosInstance;
  private _timeout = 0;

  constructor(
    options: RuffClientOptions | string = DefaultServer,
    config: AxiosRequestConfig<any> = {}
  ) {
    if (options) {
      if (typeof options === "string") {
        this._endpoint = options;
        this._timeout = DefaultServer.timeout;
      } else {
        this._endpoint =
          options.host === undefined
            ? (DefaultServer.host as string)
            : options.host;
        this._timeout = options.timeout || DefaultServer.timeout;
      }
    } else {
      this._endpoint = DefaultServer.host as string;
      this._timeout = DefaultServer.timeout;
    }
    this._endpoint = (this._endpoint + "/").replace(/\/+$/, "/");
    this._axiosInstance = axios.create({
      ...config,
      baseURL: this._endpoint,
      timeout: this._timeout,
    });
  }

  request<T = any, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).request<
        T,
        AxiosResponse<RuffHttpResponse<T>>,
        D
      >(config);
    return Promise.reject("Axios Instance not found.");
  }
  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).get<
        T,
        AxiosResponse<RuffHttpResponse<T>>,
        D
      >(url, config);
    return Promise.reject("Axios Instance not found.");
  }
  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).post(url, data, config);
    return Promise.reject("Axios Instance not found.");
  }
  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).put(url, data, config);
    return Promise.reject("Axios Instance not found.");
  }
  patch<T = any, D = any>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<Partial<D>>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).patch(url, data, config);
    return Promise.reject("Axios Instance not found.");
  }
  delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).delete(url, config);
    return Promise.reject("Axios Instance not found.");
  }

  get network() {
    return {
      timeout: this._timeout,
      endpoint: this._endpoint,
    };
  }

  get axiosInstance() {
    return this._axiosInstance;
  }
}
