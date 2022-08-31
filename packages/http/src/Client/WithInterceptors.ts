import * as mixins from "../utils/interceptors-mixins";
import RESTfulRequestor from "./WithResourceRequestors";

export default class WithInterceptors
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

    const axiosInstance = this.axiosInstance;
    axiosInstance.interceptors.request.use(
      mixins.privates.__requestFulfilled.bind(
        this as unknown as RuffClientWithInterceptors
      ),
      mixins.privates.__requestRejected.bind(
        this as unknown as RuffClientWithInterceptors
      )
    );
    axiosInstance.interceptors.response.use(
      mixins.privates.__responseFulfilled.bind(
        this as unknown as RuffClientWithInterceptors
      ),
      mixins.privates.__responseRejected.bind(
        this as unknown as RuffClientWithInterceptors
      )
    );
  }

  onTokenRequired(req: any): string | null { throw new Error("Method not implemented.") }
  onBeforeRequest(req: any): void { throw new Error("Method not implemented.") }
  onResponseFulfilled(res: any) { throw new Error("Method not implemented.") }
  onRequestError(error: AnyError): boolean { throw new Error("Method not implemented.") }
  onResponseRejected(error: AnyError): boolean { throw new Error("Method not implemented.") }
  onResponseUnauthorized(error: AnyError, signed: boolean): boolean { throw new Error("Method not implemented.") }
  onServiceError(error: AnyError): boolean { throw new Error("Method not implemented.") }
}
