import { joinPath } from "../utils";
import { ResourceMethod } from "./ResourceMethod";

type CreateRPCApiOptions = {
  client: RuffHttpClient;
  prefix: string;
  command: RuffHttpRPCConfiguration;
};

export default class Callables {
  static createApi(name: string, options: CreateRPCApiOptions) {
    const method = ResourceMethod[options.command.method] || "POST";
    const callables = new Callables(name, options) as unknown as Record<
      typeof ResourceMethod[number],
      (args?: AnyRecord) => Promise<any>
    >;
    return (
      callables[method].bind(callables) ||
      ((args: AnyRecord) => Promise.reject(""))
    );
  }

  private _client: RuffHttpClient;
  private _url: string;
  private _options: CreateRPCApiOptions;

  private constructor(name: string, options: CreateRPCApiOptions) {
    const {
      client,
      prefix,
      command: { dirname },
    } = options;
    this._client = client;
    this._url = joinPath([prefix, dirname || name]);
    this._options = options;
  }

  async POST(args?: AnyRecord) {
    this._client.post(this._url, args);
  }
  async LIST(args?: AnyRecord) {}
  async GET(args?: AnyRecord) {}
  async PUT(args?: AnyRecord) {}
  async DELETE(args?: AnyRecord) {}
}
