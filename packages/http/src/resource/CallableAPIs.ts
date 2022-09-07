import { withQuery } from "../utils/index";
import { AxiosResponse } from "axios";
import { joinPath } from "../utils";
import { ResourceMethod } from "../utils/resource-methods";

export default class RuffCallableAPIs<T extends RuffHttpResource = any, P extends AnyRecord = any> {
  static defineApi<T extends RuffHttpResource = any, P extends AnyRecord = any>(
    name: string,
    options: RuffCreateRPCApiOptions
  ): RuffCallableAPI<T, P> {
    const method = ResourceMethod[options.call.method] || "POST";
    const callables = new RuffCallableAPIs<T, P>(name, options);

    return (
      ((callables as any)[method] as RuffCallableAPI<T, P>)?.bind(callables) ||
      callables.POST.bind(callables)
    );
  }

  private _client: RuffClientBasicMethods;
  private _url: string;
  private _options: RuffCreateRPCApiOptions;

  private constructor(name: string, options: RuffCreateRPCApiOptions) {
    const {
      client,
      prefix,
      call: { path },
    } = options;
    this._client = client;
    this._url = joinPath([prefix, path || name]);
    this._options = options;
  }

  async POST({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    return this._client.post(this._url + withQuery(query), payload);
  }
  async GET({
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    return this._client.get(this._url + withQuery(query));
  }
  async PUT({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    return this._client.put(this._url + withQuery(query), payload);
  }
  async PATCH({
    payload,
    query,
  }: RuffCallArguments<P>): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    return this._client.patch(this._url + withQuery(query), payload);
  }
  async DELETE({
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    return this._client.delete(this._url + withQuery(query));
  }
}
