import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const DefaultServer: RuffClientOptions = {
  host: "/",
  timeout: 1000 * 30,
  prefix: ""
};

export default abstract class AbstractBaseClient {
  // 与前端静态文件同域的服务器
  static readonly DefaultServer: RuffClientOptions = {
    ...DefaultServer,
  };

  private _endpoint: string = "/";
  protected _axiosInstance: AxiosInstance;
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

  async request<T extends RuffHttpResource = any, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).request<
        T,
        RuffResponseContent<T>,
        D
      >(config);
    return Promise.reject("Axios Instance not found.");
  }
  async get<T extends RuffHttpResource = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).get<
        T,
        RuffResponseContent<T>,
        D
      >(url, config);
    return Promise.reject("Axios Instance not found.");
  }
  async post<T extends RuffHttpResource = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>> {
    if (this._axiosInstance) {
      try {
        return (this._axiosInstance as AxiosInstance).post(url, data, config)
      } catch (error) {
        console.log(error)
      }
    }
    return Promise.reject("Axios Instance not found.");
  }
  async put<T extends RuffHttpResource = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).put(url, data, config);
    return Promise.reject("Axios Instance not found.");
  }
  async patch<T extends RuffHttpResource = any, D = any>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<Partial<D>>
  ): Promise<RuffResponseContent<T>> {
    if (this._axiosInstance)
      return (this._axiosInstance as AxiosInstance).patch(url, data, config);
    return Promise.reject("Axios Instance not found.");
  }
  async delete<T extends RuffHttpResource = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RuffResponseContent<T>> {
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
}
