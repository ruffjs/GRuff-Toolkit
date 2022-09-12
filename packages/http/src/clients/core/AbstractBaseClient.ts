import { AxiosError } from "axios";
import { ApiHub, defineApiHub } from "../../helpers/ApiHub";
import registerResources from "../../resources";
import { toObjectiveQuery, withQueryString } from "../../utils/formatters";

export default abstract class AbstractBaseClient<R extends string = any, C extends string = any> implements RuffClientHooks {
  protected _pageIndex = 1;
  get pageIndex() {
    return this._pageIndex
  }

  protected _pageSize = 10;
  set pageSize(size: number) {
    this._pageSize = size;
  }
  get pageSize() {
    return this._pageSize
  }

  protected _listKey = 'content';
  set listKey(key: string) {
    this._listKey = key;
  }
  get listKey() {
    return this._listKey
  }

  protected _endpoint: string = "";
  protected _timeout = 0;
  get network() {
    return {
      timeout: this._timeout,
      endpoint: this._endpoint,
    };
  }

  protected __hooks: RuffClientHooks = {
    beforeRequest(req: RuffClientRequestConfig): void { },
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
  };

  protected __requestFulfilled(req: RuffClientRequestConfig) {
    this.__hooks.beforeRequest(req);
    return req;
  }
  protected __responseFulfilled(res: AxiosResponse<RuffClientResponse>): RuffClientResponse {
    return res.data;
  }

  protected __requestRejected(error: AxiosError) {
    if (this.__hooks.onRequestError(error)) {
      if (this.__hooks.onError(error, false)) throw error;
    }
    throw {
      handled: true,
      error,
    }
  }
  protected __responseRejected(error: AxiosError) {
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
      console.log(this.__hooks)
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
  }

  protected constructor(
    options: (RuffCreateClientOptions & Partial<RuffClientHooks>) | string,
    resources?: RuffClientResourcesConfigs<R>,
    calls?: RuffClientCallersConfigs<C>
  ) {

    if (options && typeof options === "object") {
      (
        Object.keys(this.__hooks) as (keyof RuffClientHooks)[]
      ).forEach((hook) => {
        this[hook] = options[hook] as any;
      });
    }

    registerResources(
      resources || ({} as RuffClientResourcesConfigs<R>),
      calls || ({} as RuffClientCallersConfigs<C>),
      this as any
    );
  }

  withQueryString = withQueryString;
  toObjectiveQuery = toObjectiveQuery

  defineApiHub<
    T extends CreateApiHubDefination = any,
    X extends Record<string, AnyFn<Promise<RuffClientResponseContent<any>>>> = {}
  >(prefix: string, config: CreateApiHubConfig<T>, more: (X | ((client: RuffClient) => X)) = {} as X): ApiHub<T> & X {
    const client = this as unknown as RuffClient
    const apihub = defineApiHub<T>(prefix, client, config)
    if (more) {
      if (typeof more === 'object') {
        return {
          ...apihub,
          ...more
        }
      }
      if (typeof more === 'function') {
        return {
          ...apihub,
          ...more(client)
        }
      }
    }
    return {
      ...apihub,
      ...({} as X)
    }
  }

  get beforeRequest() {
    return this.__hooks.beforeRequest;
  }
  set beforeRequest(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.beforeRequest = v;
    }
  }
  get onError() {
    return this.__hooks.onError;
  }
  set onError(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onError = v;
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

  get onResponseError() {
    return this.__hooks.onResponseError;
  }
  set onResponseError(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onResponseError = v;
    }
  }

  get on401Error() {
    return this.__hooks.on401Error;
  }
  set on401Error(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.on401Error = v;
    }
  }

  get on403Error() {
    return this.__hooks.on403Error;
  }
  set on403Error(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.on403Error = v;
    }
  }

  get on404Error() {
    return this.__hooks.on404Error;
  }
  set on404Error(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.on404Error = v;
    }
  }

  get onServerError() {
    return this.__hooks.onServerError;
  }
  set onServerError(v: AnyFn) {
    if (typeof v === "function") {
      this.__hooks.onServerError = v;
    }
  }
}
