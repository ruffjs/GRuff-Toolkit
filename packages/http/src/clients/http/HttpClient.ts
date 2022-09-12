import HttpResourceRequestors from "./HttpResourceRequestors";

const DefaultServer: RuffCreateClientOptions = {
  host: "/",
  timeout: 1000 * 30,
  prefix: ""
};

export default class HttpClient<R extends string = any, C extends string = any>
  extends HttpResourceRequestors<R, C>
  implements RuffClient {

  // 与前端静态文件同域的服务器
  static readonly DefaultServer: RuffCreateClientOptions = {
    ...DefaultServer,
  };

  public constructor(
    options: (RuffCreateClientOptions & Partial<RuffClientHooks>) | string = DefaultServer,
    config: RuffClientRequestConfig = {},
    resources?: RuffClientResourcesConfigs<R>,
    calls?: RuffClientCallersConfigs<C>
  ) {
    const _options = {} as RuffCreateClientOptions & Partial<RuffClientHooks>
    if (options) {
      if (typeof options === "string") {
        _options.host = options;
        _options.timeout = DefaultServer.timeout;
      } else {
        Object.assign(_options, typeof options === 'object' ? options : {})
        _options.host =
          typeof options.host === 'string'
            ? options.host
            : DefaultServer.host;
        _options.timeout = options.timeout || DefaultServer.timeout;
      }
    } else {
      Object.assign(_options, DefaultServer)
    }
    super(_options, config, resources, calls);
  }
}
