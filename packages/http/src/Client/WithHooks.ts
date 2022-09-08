import { AxiosError } from "axios";
import * as mixins from "../utils/mixin-hooks";
import RESTfulRequestor from "./WithResourceRequestors";

export default class WithHooks
  extends RESTfulRequestor
  implements RuffClientInterceptors {
  private __hooks: RuffClientInterceptors = {} as RuffClientInterceptors;

  constructor(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    config: RuffRequestConfig = {}
  ) {
    super(options, config);
    Object.assign(this.__hooks, mixins.defaults);
    Object.defineProperties(this, {
      ...mixins.publics(this as unknown as RuffClientWithInterceptors),
    });

    if (options && typeof options === "object") {
      (Object.keys(mixins.defaults) as (keyof RuffClientInterceptors)[]).forEach(
        (hook) => {
          this[hook] = options[hook] as any;
        }
      );
    }

    this._axiosInstance.interceptors.request.use(
      mixins.privates.__requestFulfilled.bind(
        this as unknown as RuffClientWithInterceptors
      ),
      mixins.privates.__requestRejected.bind(
        this as unknown as RuffClientWithInterceptors
      )
    );
    this._axiosInstance.interceptors.response.use(
      mixins.privates.__responseFulfilled.bind(
        this as unknown as RuffClientWithInterceptors
      ),
      mixins.privates.__responseRejected.bind(
        this as unknown as RuffClientWithInterceptors
      )
    );
  }
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
