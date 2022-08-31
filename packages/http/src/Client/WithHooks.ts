import { defaultHooks, hooksProps, interceptors } from "../utils/hooks-mixins";
import RESTfulRequestor from "./RESTfulRequestor";

export default class WithHooks
  extends RESTfulRequestor
  implements RuffClientHooks
{
  private __hooks: RuffClientHooks = {} as RuffClientHooks;

  constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: RuffRequestConfig = {}
  ) {
    super(options, config);
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

    const axiosInstance = this.axiosInstance;
    axiosInstance.interceptors.request.use(
      interceptors.__requestFulfilledInterceptor.bind(
        this as unknown as RuffClientWithHooks
      ),
      interceptors.__requestRejectedInterceptor.bind(
        this as unknown as RuffClientWithHooks
      )
    );
    axiosInstance.interceptors.response.use(
      interceptors.__responseFulfilledInterceptor.bind(
        this as unknown as RuffClientWithHooks
      ),
      interceptors.__responseRejectedInterceptor.bind(
        this as unknown as RuffClientWithHooks
      )
    );
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
}
