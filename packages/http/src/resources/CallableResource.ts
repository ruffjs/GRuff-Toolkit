import { withQueryString } from "../utils/formatters";
import { AxiosResponse } from "axios";
import { joinPath } from "../utils/formatters";
import { ResourceMethod } from "../utils/resource-methods";

export default class CallableResource<T extends RuffHttpResource = any, P extends AnyRecord = any> {
  static defineCallApi<T extends RuffHttpResource = any, P extends AnyRecord = any>(
    name: string,
    options: RuffCallableResourceDefinationOptions
  ): RuffResourceCaller<T, P> {
    const method = ResourceMethod[options.call.method] || "POST";
    const callables = new CallableResource<T, P>(name, options);

    return (
      ((callables as any)[method] as RuffResourceCaller<T, P>)?.bind(callables) ||
      callables.POST.bind(callables)
    );
  }

  private _client: RuffClientBaseAPIs;
  private _url: string;
  private _apiId: string;
  private _idOrKeys?: IdOrKeys
  private _options: RuffCallableResourceDefinationOptions;

  private constructor(name: string, options: RuffCallableResourceDefinationOptions) {
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
      this._idOrKeys = undefined
    }
    // console.log(this._url, this._apiId, (this._client as any)._mockRules)
    this._options = options;
  }

  private async _call(query?: RuffHttpQueryCondition, payload?: P) {
    // console.log(this._url, this._apiId, this._idOrKeys)
    return this._client.$_call(this._apiId, { payload, query, idOrKeys: this._idOrKeys })
  }

  async POST({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<RuffClientResponseContent<T>> {
    // console.log(this._client.isMock)
    if (this._client.isMock) return this._call(query, payload)
    return this._client.post(this._url + withQueryString(query), payload);
  }
  async GET({
    query,
  }: RuffCallArguments<P> = {}): Promise<RuffClientResponseContent<T>> {
    if (this._client.isMock) return this._call(query)
    return this._client.get(this._url + withQueryString(query));
  }
  async PUT({
    payload,
    query,
  }: RuffCallArguments<P> = {}): Promise<RuffClientResponseContent<T>> {
    if (this._client.isMock) return this._call(query, payload)
    return this._client.put(this._url + withQueryString(query), payload);
  }
  async PATCH({
    payload,
    query,
  }: RuffCallArguments<P>): Promise<RuffClientResponseContent<T>> {
    if (this._client.isMock) return this._call(query, payload)
    return this._client.patch(this._url + withQueryString(query), payload);
  }
  async DELETE({
    query,
  }: RuffCallArguments<P> = {}): Promise<RuffClientResponseContent<T>> {
    if (this._client.isMock) return this._call(query)
    return this._client.delete(this._url + withQueryString(query));
  }
}
