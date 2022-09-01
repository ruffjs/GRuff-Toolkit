import { AxiosRequestConfig } from "axios";
import { ExtendedMainResource } from "../resource/MainResource";
import MockClient from "../mock/MockClient";
import { registerResources } from "../utils/resources-helper";
import WithInterceptors from "./WithInterceptors";
import formatMockConfigs from "../utils/configs-helper";
import { createApiHub, CreateApiHubConfiguration } from "../utils/api-hub";

export default class Client<R extends string = any, C extends string = any>
  extends WithInterceptors
  implements RuffHttpClient {
  static createClient<R extends string = any, C extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs?: RuffClientConfigs<R, C>
  ): Client<R> & Record<R, ExtendedMainResource> & Record<C, CallableAPI>;
  static createClient<R extends string = any, C extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs: RuffMockClientSimpleConfigs<R>
  ): MockClient<R> & Record<R, ExtendedMainResource> & Record<C, CallableAPI>;
  static createClient<R extends string = any, C extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs: RuffMockClientWithRandomsConfigs<R>
  ): MockClient<R> & Record<R, ExtendedMainResource> & Record<C, CallableAPI>;
  static createClient<R extends string = any, C extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs:
      | RuffClientConfigs<R, C>
      | RuffMockClientSimpleConfigs<R>
      | RuffMockClientWithRandomsConfigs<R> = {}
  ) {
    const { axios, withMock, rules, resources, calls } =
      configs as RuffMockClientSimpleConfigs<R> &
      RuffMockClientWithRandomsConfigs<R>;
    if (withMock || rules) {
      const randomRules: Record<string, RuffMockRandom> = {};
      if (withMock) {
        Object.assign(randomRules, formatMockConfigs(resources, "api/v1"));
      }
      if (rules) {
        Object.assign(randomRules, rules);
      }
      const client = new MockClient<R, C>(
        options,
        axios,
        resources || ({} as RuffClientResourcesConfigs<R>),
        calls || ({} as RuffClientRPCConfigs<C>),
        randomRules
      );
      return client;
    }
    // console.log(resources);
    const client = new Client<R, C>(options, axios, resources, calls);
    return client;
  }

  private constructor(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    config: AxiosRequestConfig<any> = {},
    resources?: RuffClientResourcesConfigs<R>,
    calls?: RuffClientRPCConfigs<C>
  ) {
    super(options, config);
    registerResources(
      resources || ({} as RuffClientResourcesConfigs<R>),
      calls || ({} as RuffClientRPCConfigs<C>),
      this as any
    );
  }

  createApiHub<T extends object = any, P extends Record<keyof T, any> = any>(prefix: string, config: CreateApiHubConfiguration<T>) {
    return createApiHub<T, P>(prefix, this, config)
  }
}
