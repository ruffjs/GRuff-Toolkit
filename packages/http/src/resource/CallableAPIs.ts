import { withQuery } from "../utils/index";
import { AxiosResponse } from "axios";
import { joinPath } from "../utils";
import { ResourceMethod } from "../utils/resource-methods";

export default class CallableAPIs<T = any, P extends AnyRecord = any> {
  static createApi<T = any, P extends AnyRecord = any>(
    name: string,
    options: CreateRPCApiOptions
  ): CallableAPI<T, P> {
    const method = ResourceMethod[options.call.method] || "POST";
    const callables = new CallableAPIs<T, P>(name, options);

    return (
      ((callables as any)[method] as CallableAPI<T, P>)?.bind(callables) ||
      callables.POST.bind(callables)
    );
  }

  private _client: RuffClientBasicMethods;
  private _url: string;
  private _options: CreateRPCApiOptions;

  private constructor(name: string, options: CreateRPCApiOptions) {
    const {
      client,
      prefix,
      call: { path },
    } = options;
    this._client = client;
    this._url = joinPath([prefix, path || name]);
    this._options = options;
  }

  async POST<T2 = any, P2 extends AnyRecord = any>({
    payload,
    query,
  }: CallArguments<P2 | P>): Promise<AxiosResponse<RuffHttpResponse<T2 | T>>> {
    return this._client.post(this._url + withQuery(query), payload);
  }
  async GET<T2 = any, P2 extends AnyRecord = any>({
    query,
  }: CallArguments<P2 | P>): Promise<AxiosResponse<RuffHttpResponse<T2 | T>>> {
    return this._client.get(this._url + withQuery(query));
  }
  async PUT<T2 = any, P2 extends AnyRecord = any>({
    payload,
    query,
  }: CallArguments<P2 | P>): Promise<AxiosResponse<RuffHttpResponse<T2 | T>>> {
    return this._client.put(this._url + withQuery(query), payload);
  }
  async PATCH<T2 = any, P2 extends AnyRecord = any>({
    payload,
    query,
  }: CallArguments<P2 | P>): Promise<AxiosResponse<RuffHttpResponse<T2 | T>>> {
    return this._client.patch(this._url + withQuery(query), payload);
  }
  async DELETE<T2 = any, P2 extends AnyRecord = any>({
    query,
  }: CallArguments<P2 | P>): Promise<AxiosResponse<RuffHttpResponse<T2 | T>>> {
    return this._client.delete(this._url + withQuery(query));
  }
}
