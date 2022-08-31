import { joinPath } from "../utils";
import { ResourceMethod } from "../utils/resource-methods";

type CreateRPCApiOptions = {
  client: RuffClientBasicMethods;
  prefix: string;
  command: RuffHttpRPCConfiguration;
};

export default class CallableAPI {
  static createApi(name: string, options: CreateRPCApiOptions) {
    const method = ResourceMethod[options.command.method] || "POST";
    const callables = new CallableAPI(name, options) as unknown as Record<
      typeof ResourceMethod[number],
      (args?: AnyRecord) => Promise<any>
    >;
    return (
      callables[method].bind(callables) ||
      ((args: AnyRecord) => Promise.reject(""))
    );
  }

  private _client: RuffClientBasicMethods;
  private _url: string;
  private _options: CreateRPCApiOptions;

  private constructor(name: string, options: CreateRPCApiOptions) {
    const {
      client,
      prefix,
      command: { path },
    } = options;
    this._client = client;
    this._url = joinPath([prefix, path || name]);
    this._options = options;
  }

  async POST(args?: AnyRecord) {
    this._client.post(this._url, args);
  }
  async LIST(args?: AnyRecord) { }
  async GET(args?: AnyRecord) { }
  async PUT(args?: AnyRecord) { }
  async DELETE(args?: AnyRecord) { }
}
