import MockResourceRequestors from "./MockResourceRequestors";

export default class MockClient<R extends string = any, C extends string = any>
  extends MockResourceRequestors<R>
  implements RuffClient {
  protected _endpoint: string = "mock://";

  public constructor(
    options: (RuffCreateClientOptions & Partial<RuffClientHooks>) | string,
    config: RuffClientRequestConfig<any> = {},
    resources: RuffClientResourcesConfigs<R>,
    calls: RuffClientCallersConfigs<C>,
    mockRules: Record<string, RuffMockRandomConfig> = {}
  ) {
    super(options, config, resources, calls, mockRules);
  }

  request<T extends RuffHttpResource = any>(...args: any[]): Promise<RuffClientResponseContent<T>> {
    throw new Error(
      "You cannot invock this method of a Mock Client, please use an Http Client instead."
    );
  }
  get = this.request.bind(this);
  post = this.request.bind(this);
  put = this.request.bind(this);
  patch = this.request.bind(this);
  delete = this.request.bind(this);
  $_create_resource = this.request.bind(this);
  $_get_resource = this.request.bind(this);
  $_get_pageable_resource = this.request.bind(this);
  $_set_resource = this.request.bind(this);
  $_remove_resource = this.request.bind(this);

}
