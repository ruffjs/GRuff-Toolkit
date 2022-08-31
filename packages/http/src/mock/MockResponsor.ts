import { RandomInstance } from "./../../../data-random/index";
import { createRandom } from "@ruff-web/data-random";

import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import HTTP_STATUS_CODES, { StatusCode } from "./status-codes";
import { delay } from "@ruff-web/utils/src/async";
import { interceptors } from "../utils/hooks-mixins";

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
  private _durationRange = [200, 2000];

  private _random: RandomInstance;
  private _delay: number;
  private _client: RuffClientWithHooks;

  constructor(client: RuffClientWithHooks) {
    this._client = client;

    this._random = createRandom();
    this._delay = this._random.natural(
      this._durationRange[0],
      this._durationRange[1]
    );
  }

  async resolve<T, D = any>(
    data: T,
    config: AxiosRequestConfig<D> = {},
    status: StatusCode = 200
  ) {
    await delay(this._delay);
    const statusText = HTTP_STATUS_CODES[status] || HTTP_STATUS_CODES[200];
    const res = new MockResponse(data, status, statusText, config);
    console.log("模拟请求:", `duration: ${this._delay}ms`, "RawData:", res);
    return await Promise.resolve(
      interceptors.__responseFulfilledInterceptor.call(this._client, res)
    );
  }
}
