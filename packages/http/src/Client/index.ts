import { AxiosRequestConfig } from "axios";
import { ExtendedMainResource } from "../resource/MainResource";
import MockClient from "../mock/MockClient";
import { registerResources } from "../utils/resources-helper";
import WithInterceptors from "./WithInterceptors";
import formatMockConfigs from "../utils/formatMockConfigs";

export default class Client<E extends string = any>
  extends WithInterceptors
  implements RuffHttpClient {
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs?: RuffClientConfigs<E>
  ): Client<E> & Record<E, ExtendedMainResource>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs: RuffMockClientSimpleConfigs<E>
  ): MockClient<E> & Record<E, ExtendedMainResource>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs: RuffMockClientWithRandomsConfigs<E>
  ): MockClient<E> & Record<E, ExtendedMainResource>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    configs:
      | RuffClientConfigs<E>
      | RuffMockClientSimpleConfigs<E>
      | RuffMockClientWithRandomsConfigs<E> = {}
  ) {
    const { axios, withMock, rules, resources } =
      configs as RuffMockClientSimpleConfigs<E> & RuffMockClientWithRandomsConfigs<E>;
    if (withMock || rules) {
      const randomRules: Record<string, RuffMockRandom> = {};
      if (withMock) {
        Object.assign(randomRules, formatMockConfigs(resources, "api/v1"));
      }
      if (rules) {
        Object.assign(randomRules, rules);
      }
      const client = new MockClient<E>(
        options,
        axios,
        resources || ({} as RuffClientResourcesConfigs<E>),
        randomRules
      );
      return client;
    }
    // console.log(resources);
    const client = new Client<E>(options, axios, resources);
    return client;
  }

  private constructor(
    options: (RuffClientOptions & RuffClientInterceptors) | string,
    config: AxiosRequestConfig<any> = {},
    resources?: RuffClientResourcesConfigs<E>
  ) {
    super(options, config);
    registerResources(
      resources || ({} as RuffClientResourcesConfigs<E>),
      this as any
    );
  }
}
