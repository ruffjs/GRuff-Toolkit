import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { withQuery } from "../utils";
import * as mixins from "../utils/mixin-hooks";
import MockRequestor from "./WithMockRequestors";

export default class MockClient<R extends string = any, C extends string = any>
  extends MockRequestor<R>
  implements RuffClientInterceptors {
  private _endpoint: string = "mock://";
  private _timeout = 0;

  private __hooks: RuffClientInterceptors = {} as RuffClientInterceptors;

  public constructor(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    config: AxiosRequestConfig<any> = {},
    resources: RuffClientResourcesConfigs<R>,
    calls: RuffClientRPCConfigs<C>,
    randomRules: Record<string, RuffMockRandom> = {}
  ) {
    super(options, config, resources, calls, randomRules);
    Object.assign(this.__hooks, mixins.defaults);

    Object.defineProperties(this, {
      ...mixins.publics(this as unknown as RuffClientWithInterceptors),
    });

    if (options && typeof options === "object") {
      (
        Object.keys(mixins.defaults) as (keyof RuffClientInterceptors)[]
      ).forEach((hook) => {
        this[hook] = options[hook] as any;
      });
    }
  }

  get network() {
    return {
      timeout: this._timeout,
      endpoint: this._endpoint,
    };
  }

  get axiosInstance(): AxiosInstance {
    return {} as AxiosInstance;
  }

  withQuery = withQuery;

  request(): Promise<Error> {
    throw new Error(
      "You cannot invock this method of a Mock Client, please use an Http Client instead."
    );
  }
  get = this.request.bind(this);
  post = this.request.bind(this);
  put = this.request.bind(this);
  patch = this.request.bind(this);
  delete = this.request.bind(this);

  beforeRequest(req: any): void { throw new Error("Method not implemented.") }
  onError(error: Error, response: false): boolean;
  onError(error: AxiosError, response?: AxiosResponse<any, any> | undefined): boolean;
  onError(error: any, response: false | AxiosResponse<any, any>): boolean;
  onError(error: unknown, response?: unknown): boolean { throw new Error("Method not implemented.") }
  onRequestError(error: AxiosError): boolean { throw new Error("Method not implemented.") }
  onResponseError(status: number, error: AxiosError, response?: AxiosResponse<any, any> | undefined): boolean { throw new Error("Method not implemented.") }
  on401Error(error: AxiosError, response: AxiosResponse<any, any>): boolean { throw new Error("Method not implemented.") }
  on403Error(error: AxiosError, response: AxiosResponse<any, any>): boolean { throw new Error("Method not implemented.") }
  on404Error(error: AxiosError, response: AxiosResponse<any, any>): boolean { throw new Error("Method not implemented.") }
  onServerError(status: number, error: AxiosError): boolean { throw new Error("Method not implemented.") }
}
