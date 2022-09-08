import { RandomInstance } from "../../../data-random/index";
import { createRandom } from "@ruff-web/data-random";

import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import HTTP_STATUS_CODES, { StatusCode } from "../utils/status-codes";
import { delay } from "@ruff-web/utils/src/async";
import * as mixins from "../utils/mixin-hooks";

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
  public static enableMockLog = true
  private _durationRange = [200, 2000];

  private _random: RandomInstance;

  private _client: RuffClientWithInterceptors;

  constructor(client: RuffClientWithInterceptors) {
    this._client = client;

    this._random = createRandom();
  }

  private get _delay() {
    return this._random.natural(
      this._durationRange[0],
      this._durationRange[1]
    );
  }

  private _log(res: MockResponse<RuffResponseContent>) {
    if (!!MockResponsor.enableMockLog) console.info(`%c[Ruff-Http-Client-Mock-Response](use ${this._delay}ms)`, 'color: orange;', res);
  }

  async resolve<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    data: RuffResponseContent<T>,
    config: AxiosRequestConfig<D> = {},
    status: StatusCode = 200,
  ): Promise<RuffResponseContent<T>> {
    await delay(this._delay);
    const statusText = HTTP_STATUS_CODES[status] || HTTP_STATUS_CODES[200];
    const res = new MockResponse(data, status, statusText, config);
    this._log(res)
    return res.data;
  }

  async reject<T extends RuffDataModel = any, D extends RuffDataModel = any>(
    data: RuffResponseContent<T>,
    config: AxiosRequestConfig<D> = {},
    status: StatusCode = 400,
  ): Promise<RuffResponseContent<T>> {
    await delay(this._delay);
    const statusText = HTTP_STATUS_CODES[status] || HTTP_STATUS_CODES[200];
    const res = new MockResponse(data, status, statusText, config);
    this._log(res)
    return mixins.privates.__responseRejected.call(this._client, new RuffMockError(res, config))
  }
}

class RuffMockError<T extends RuffDataModel = any, D extends RuffDataModel = any> extends Error implements AxiosError {
  readonly name = "RuffMockError"
  readonly code = "ERR_BAD_REQUEST";
  readonly isAxiosError = false;

  readonly config: AxiosRequestConfig<any>;
  readonly request: any;
  readonly response: MockResponse<T, D>;
  readonly status: string | undefined;

  constructor(response: MockResponse<T, D>, config: AxiosRequestConfig<D>) {
    super(`Request failed with status code ${response.status}`)
    this.config = config
    this.status = String(response.status)
    this.request = response.request
    this.response = response
  }

  toJSON() {
    return {
      status: Number(this.status),
      response: this.response,
      message: this.message
    }
  }
}
