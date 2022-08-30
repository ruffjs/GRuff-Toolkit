import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { withQuery } from "../utils";
import MockRequestor from "./MockRequestor";

export default class MockClient<
  E extends string = any
> extends MockRequestor<E> {
  private _endpoint: string = "mock://";
  private _timeout = 0;

  public constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {},
    entitis: RuffClientEntitisConfigs<E>,
    randoms: Record<string, RuffMockRandom> = {}
  ) {
    super(options, config, entitis, randoms);
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
    throw new Error("Method not implemented.");
  }

  get(): Promise<Error> {
    throw new Error("Method not implemented.");
  }
  post(): Promise<Error> {
    throw new Error("Method not implemented.");
  }
  put(): Promise<Error> {
    throw new Error("Method not implemented.");
  }
  patch(): Promise<Error> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<Error> {
    throw new Error("Method not implemented.");
  }
}
