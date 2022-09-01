export const defaults: RuffClientInterceptors = {
  onTokenRequired(req: RuffRequestConfig): string | null {
    return null;
  },
  onBeforeRequest(req: RuffRequestConfig): void {},
  onResponseFulfilled(res: RuffResponse): any {
    console.log("onResponseFulfilled");
    return res;
  },
  onRequestError(error: Error): boolean {
    return true;
  },
  onResponseUnauthorized(error: Error, signed: boolean = true): boolean {
    return true;
  },
  onServiceError(error: Error): boolean {
    return true;
  },
  onResponseRejected(error: Error): boolean {
    return true;
  },
} as const;

export const privates = {
  __requestFulfilled(this: RuffClientWithInterceptors, req: RuffRequestConfig) {
    const token = this.__hooks.onTokenRequired(req);
    if (token) {
      Object.assign(req.headers || {}, {
        Authorization: `Bearer ${token}`,
      });
    }
    this.__hooks.onBeforeRequest(req);
    return req;
  },
  __responseFulfilled(this: RuffClientWithInterceptors, res: RuffResponse) {
    return this.__hooks.onResponseFulfilled(res) || res;
  },

  __requestRejected(this: RuffClientWithInterceptors, error: AnyError) {
    if (this.__hooks.onRequestError(error)) {
      throw error;
    }
  },
  __responseRejected(this: RuffClientWithInterceptors, error: any) {
    try {
      let intercepted = false;
      if (error?.response?.status >= 500) {
        if (this.__hooks.onServiceError(error)) {
          intercepted = !this.__hooks.onResponseRejected(error);
        } else {
          intercepted = true;
        }
      } else if (error?.response?.status === 401) {
        if (this.__hooks.onResponseUnauthorized(error, true)) {
          intercepted = !this.__hooks.onResponseRejected(error);
        } else {
          intercepted = true;
        }
      } else {
        intercepted = !this.__hooks.onResponseRejected(error);
      }
      if (intercepted) return;
      // console.log(error);
      throw error;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },
} as const;

export const publics = ({ __hooks }: RuffClientWithInterceptors) => ({
  onTokenRequired: {
    get() {
      return __hooks.onTokenRequired;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onTokenRequired = v;
      }
    },
  },
  onBeforeRequest: {
    get() {
      return __hooks.onBeforeRequest;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onBeforeRequest = v;
      }
    },
  },
  onRequestError: {
    get() {
      return __hooks.onRequestError;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onRequestError = v;
      }
    },
  },
  onResponseFulfilled: {
    get() {
      return __hooks.onResponseFulfilled;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onResponseFulfilled = v;
      }
    },
  },
  onResponseRejected: {
    get() {
      return __hooks.onResponseRejected;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onResponseRejected = v;
      }
    },
  },
  onResponseUnauthorized: {
    get() {
      return __hooks.onResponseUnauthorized;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onResponseUnauthorized = v;
      }
    },
  },
  onServiceError: {
    get() {
      return __hooks.onServiceError;
    },
    set(v: AnyFn) {
      if (typeof v === "function") {
        __hooks.onServiceError = v;
      }
    },
  },
});
