import { AxiosError } from "axios";

export const defaults: RuffClientInterceptors = {
    beforeRequest(req: RuffRequestConfig): void { },
    onError(error: AnyError | AxiosError, response?: AxiosResponse | false): boolean {
        return true;
    },
    onRequestError(error: AxiosError): boolean {
        return true;
    },
    onResponseError(status: number, error: AxiosError, response?: AxiosResponse): boolean {
        return true;
    },
    on401Error(error: AxiosError, response: AxiosResponse): boolean {
        return true;
    },
    on403Error(error: AxiosError, response: AxiosResponse): boolean {
        return true;
    },
    on404Error(error: AxiosError, response: AxiosResponse): boolean {
        return true;
    },
    onServerError(status: number, error: AxiosError): boolean {
        return true;
    },
} as const;

export const privates = {
    __requestFulfilled(this: RuffClientWithInterceptors, req: RuffRequestConfig) {
        this.__hooks.beforeRequest(req);
        return req;
    },
    __responseFulfilled(this: RuffClientWithInterceptors, res: AxiosResponse<RuffResponse>): RuffResponse {
        return res.data;
    },

    __requestRejected(this: RuffClientWithInterceptors, error: AxiosError) {
        if (this.__hooks.onRequestError(error)) {
            if (this.__hooks.onError(error, false)) throw error;
        }
        throw {
            handled: true,
            error,
        }
    },
    __responseRejected(this: RuffClientWithInterceptors, error: AxiosError) {
        const status = error?.response?.status || 400
        let propagating = true;

        if (status >= 500) {
            if (this.__hooks.onServerError(status, error)) {
                if (this.__hooks.onResponseError(status, error, error.response)) {
                    propagating = !!this.__hooks.onError(error, error.response);
                } else {
                    propagating = false;
                }
            } else {
                propagating = false;
            }
        } else if (status === 401) {
            // console.log(error)
            if (this.__hooks.on401Error(error, error.response as any)) {
                if (this.__hooks.onResponseError(status, error, error.response)) {
                    propagating = !!this.__hooks.onError(error, error.response);
                } else {
                    propagating = false;
                }
            } else {
                propagating = false;
            }
        } else if (status === 403) {
            if (this.__hooks.on403Error(error, error.response as any)) {
                if (this.__hooks.onResponseError(status, error, error.response)) {
                    propagating = !!this.__hooks.onError(error, error.response);
                } else {
                    propagating = false;
                }
            } else {
                propagating = false;
            }
        } else if (status === 404) {
            if (this.__hooks.on404Error(error, error.response as any)) {
                if (this.__hooks.onResponseError(status, error, error.response)) {
                    propagating = !!this.__hooks.onError(error, error.response);
                } else {
                    propagating = false;
                }
            } else {
                propagating = false;
            }
        } else {
            if (this.__hooks.onResponseError(status, error, error.response)) {
                propagating = !!this.__hooks.onError(error, error.response);
            } else {
                propagating = false;
            }
        }
        if (propagating) throw error;
        throw {
            handled: true,
            error,
        }
    },
} as const;

export const publics = ({ __hooks }: RuffClientWithInterceptors) => ({
    beforeRequest: {
        get() {
            return __hooks.beforeRequest;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.beforeRequest = v;
            }
        },
    },
    onError: {
        get() {
            return __hooks.onError;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.onError = v;
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
    onResponseError: {
        get() {
            return __hooks.onResponseError;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.onResponseError = v;
            }
        },
    },
    on401Error: {
        get() {
            return __hooks.on401Error;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.on401Error = v;
            }
        },
    },
    on403Error: {
        get() {
            return __hooks.on401Error;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.on401Error = v;
            }
        },
    },
    on404Error: {
        get() {
            return __hooks.on401Error;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.on401Error = v;
            }
        },
    },
    onServerError: {
        get() {
            return __hooks.onServerError;
        },
        set(v: AnyFn) {
            if (typeof v === "function") {
                __hooks.onServerError = v;
            }
        },
    },
});
