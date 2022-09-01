import { AxiosInstance, AxiosRequestConfig } from "axios";
import { withQuery } from "../utils";
import * as mixins from "../utils/interceptors-mixins";
import MockRequestor from "./WithMockRequestors";

export default class MockClient<R extends string = any, C extends string = any>
  extends MockRequestor<R>
  implements RuffClientInterceptors
{
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

  onTokenRequired(req: any): string | null {
    throw new Error("Method not implemented.");
  }
  onBeforeRequest(req: any): void {
    throw new Error("Method not implemented.");
  }
  onResponseFulfilled(res: any) {
    throw new Error("Method not implemented.");
  }
  onRequestError(error: AnyError): boolean {
    throw new Error("Method not implemented.");
  }
  onResponseRejected(error: AnyError): boolean {
    throw new Error("Method not implemented.");
  }
  onResponseUnauthorized(error: AnyError, signed: boolean): boolean {
    throw new Error("Method not implemented.");
  }
  onServiceError(error: AnyError): boolean {
    throw new Error("Method not implemented.");
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
}
