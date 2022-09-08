import { withQuery } from "../utils/index";
import { AxiosResponse } from "axios";
import { joinPath } from "../utils";
import { ResourceMethod } from "../utils/resource-methods";

export default class CallableAPIs<T extends RuffHttpResource = any, P extends AnyRecord = any> {
  static defineApi<T extends RuffHttpResource = any, P extends AnyRecord = any>(
    name: string,
    options: RuffCreateRPCApiOptions
  ): RuffCallableAPI<T, P> {
    const method = ResourceMethod[options.call.method] || "POST";
    const callables = new CallableAPIs<T, P>(name, options);

    return (
      ((callables as any)[method] as RuffCallableAPI<T, P>)?.bind(callables) ||
      callables.POST.bind(callables)
    );
  }

  private _client: RuffClientBasicMethods;
  private _url: string;
  private _apiId: string;
  private _idOrKeys: IdOrKeys
  private _options: RuffCreateRPCApiOptions;

  private constructor(name: string, options: RuffCreateRPCApiOptions) {
    const {
      client,
      prefix,
      call: { path },
    } = options;
    this._client = client;
    this._url = joinPath([prefix.join('/'), path || name]);
    if (prefix.length > 1) {
      this._apiId = `${prefix[0]}/**/${path || name}:0`
      this._idOrKeys = prefix[1]
    } else {
      this._apiId = `${this._url}:0`
      this._idOrKeys = ""
    }
    // console.log(this._url, this._apiId, (this._client as any)._randomRules)
    this._options = options;
  }

  private async _call(query?: RuffHttpQueryCondition, payload?: P) {
    // console.log(this._url, this._apiId)
    return this._client.$call(this._apiId, { payload, query, idOrKeys: this._idOrKeys })
  }

  async POST({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    console.log(this._client.isMock)
    if (this._client.isMock) return this._call(query, payload)
    return this._client.post(this._url + withQuery(query), payload);
  }
  async GET({
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._client.isMock) return this._call(query)
    return this._client.get(this._url + withQuery(query));
  }
  async PUT({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._client.isMock) return this._call(query, payload)
    return this._client.put(this._url + withQuery(query), payload);
  }
  async PATCH({
    payload,
    query,
  }: RuffCallArguments<P>): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._client.isMock) return this._call(query, payload)
    return this._client.patch(this._url + withQuery(query), payload);
  }
  async DELETE({
    query,
  }: RuffCallArguments<P> = {}): Promise<AxiosResponse<RuffHttpResponse<T>>> {
    if (this._client.isMock) return this._call(query)
    return this._client.delete(this._url + withQuery(query));
  }
}
