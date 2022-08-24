import { AxiosRequestConfig, AxiosResponse } from "axios";
import RESTfulRequestor from "./RESTfulRequestor";

export default class WithHooks
  extends RESTfulRequestor
  implements RuffClientHooks
{
  private __hooks: RuffClientHooks = {
    onTokenRequired(req: AxiosRequestConfig<any>): void {},
    onBeforeRequest(req: AxiosRequestConfig<any>): void {},
    onRequestError(error: Error): void {},
    onResponseFulfilled(res: AxiosResponse<any, any>): void {},
    onResponseUnexpected(res: AxiosResponse<any, any>): void {},
    onResponseRejected(error: Error): void {},
    onResponseUnauthorized(error: Error, signed: boolean = true): void {},
    onServiceError(error: Error): void {},
  };

  private __requestFulfilledInterceptor(req: AxiosRequestConfig<any>) {
    const token = this.onTokenRequired(req);
    // console.log(typeof token, token)
    if (token) {
      Object.assign(req.headers || {}, {
        Authorization: `Bearer ${token}`,
      });
    }
    this.__hooks.onBeforeRequest(req);
    return req;
  }
  private __requestRejectedInterceptor(error: AnyError) {
    this.__hooks.onRequestError(error);
    throw error;
  }
  private __responseFulfilledInterceptor(res: AxiosResponse<any, any>) {
    if (res.data?.status === 200) {
      this.__hooks.onResponseFulfilled(res);
    } else {
      this.__hooks.onResponseUnexpected(res);
    }
    return res.data;
  }
  private __responseRejectedInterceptor(error: any) {
    if (error?.response?.status >= 500) {
      this.__hooks.onServiceError(error);
    } else if (error?.response?.status === 401) {
      this.__hooks.onResponseUnauthorized(error, true);
    } else {
      this.__hooks.onResponseRejected(error);
    }
    console.log(error);
    throw error;
  }

  constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {}
  ) {
    super(options, config);
    if (options && typeof options === "object") {
      this.onTokenRequired = options.onTokenRequired;
      this.onBeforeRequest = options.onBeforeRequest;
      this.onRequestError = options.onRequestError;
      this.onResponseFulfilled = options.onResponseFulfilled;
      this.onResponseUnexpected = options.onResponseUnexpected;
      this.onResponseRejected = options.onResponseRejected;
      this.onResponseUnauthorized = options.onResponseUnauthorized;
      this.onServiceError = options.onServiceError;
    }

    const axiosInstance = this.axiosInstance;
    axiosInstance?.interceptors.request.use(
      this.__requestFulfilledInterceptor.bind(this),
      this.__requestRejectedInterceptor.bind(this)
    );
    axiosInstance?.interceptors.response.use(
      this.__responseFulfilledInterceptor.bind(this),
      this.__responseRejectedInterceptor.bind(this)
    );
  }

  get onTokenRequired() {
    return this.__hooks.onTokenRequired;
  }
  set onTokenRequired(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onTokenRequired = v;
    }
  }

  get onBeforeRequest() {
    return this.__hooks.onBeforeRequest;
  }
  set onBeforeRequest(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onBeforeRequest = v;
    }
  }

  get onRequestError() {
    return this.__hooks.onRequestError;
  }
  set onRequestError(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onRequestError = v;
    }
  }

  get onResponseFulfilled() {
    return this.__hooks.onResponseFulfilled;
  }
  set onResponseFulfilled(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onResponseFulfilled = v;
    }
  }

  get onResponseUnexpected() {
    return this.__hooks.onTokenRequired;
  }
  set onResponseUnexpected(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onResponseUnexpected = v;
    }
  }

  get onResponseRejected() {
    return this.__hooks.onResponseRejected;
  }
  set onResponseRejected(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onResponseRejected = v;
    }
  }

  get onResponseUnauthorized() {
    return this.__hooks.onResponseUnauthorized;
  }
  set onResponseUnauthorized(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onResponseUnauthorized = v;
    }
  }

  get onServiceError() {
    return this.__hooks.onServiceError;
  }
  set onServiceError(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onServiceError = v;
    }
  }
}
