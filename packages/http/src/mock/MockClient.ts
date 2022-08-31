import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { withQuery } from "../utils";
import { defaultHooks, hooksProps } from "../utils/hooks-mixins";
import MockRequestor from "./MockRequestor";

export default class MockClient<E extends string = any>
  extends MockRequestor<E>
  implements RuffClientHooks
{
  private _endpoint: string = "mock://";
  private _timeout = 0;

  private __hooks: RuffClientHooks = {} as RuffClientHooks;

  public constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {},
    entitis: RuffClientEntitisConfigs<E>,
    randomRules: Record<string, RuffMockRandom> = {}
  ) {
    super(options, config, entitis, randomRules);
    Object.assign(this.__hooks, defaultHooks);

    Object.defineProperties(this, {
      ...hooksProps(this as unknown as RuffClientWithHooks),
    });

    if (options && typeof options === "object") {
      (Object.keys(defaultHooks) as (keyof RuffClientHooks)[]).forEach(
        (hook) => {
          this[hook] = options[hook] as any;
        }
      );
    }
  }

  onTokenRequired(req: RuffRequestConfig): string | null {
    throw new Error("Method not implemented.");
  }
  onBeforeRequest(req: RuffRequestConfig): void {
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
