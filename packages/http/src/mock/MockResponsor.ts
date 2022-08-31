import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import HTTP_STATUS_CODES, { StatusCode } from "./status-codes";

class MockRequestInfo<D> {
  method: string;
  url: string;
  payload?: D;

  constructor(method: string, url: string, payload?: D) {
    this.method = method;
    this.url = url;
    this.payload = payload;
  }
}
class MockResponse<T, D = any> implements AxiosResponse {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request: MockRequestInfo<D>;

  constructor(
    data: T,
    status: number,
    statusText: string,
    config: AxiosRequestConfig<D>
  ) {
    // console.log(data);
    this.data = data;
    this.status = status;
    this.statusText = statusText;
    this.headers = {};
    this.config = config;
    const { method, url, data: payload } = config;
    this.request = new MockRequestInfo(method || "get", url || "/", payload);
  }
}

export default class MockResponsor {
  async resolve<T, D = any>(
    data: T,
    config: AxiosRequestConfig<D> = {},
    status: StatusCode = 200
  ) {
    const statusText = HTTP_STATUS_CODES[status] || HTTP_STATUS_CODES[200];
    return await Promise.resolve(
      new MockResponse(data, status, statusText, config)
    );
  }
}
