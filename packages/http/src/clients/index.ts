import { IExtendedResourceProvider } from "../resource-providers/StatelessResourceProvider";
import MockClient from "./mock/MockClient";
import HttpClient from "./http/HttpClient";
import { pickMockRules } from "../helpers/vendors/MockRule";

export const MockProtocol = "ruffmock://"
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs?: RuffCreateClientConfigs<R, C>
): HttpClient<R> & Record<R, IExtendedResourceProvider> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs: RuffCreateMockClientSimpleConfigs<R>
): MockClient<R> & Record<R, IExtendedResourceProvider> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs: RuffCreateMockClientWithMockRulesConfigs<R>
): MockClient<R> & Record<R, IExtendedResourceProvider> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs:
    | RuffCreateClientConfigs<R, C>
    | RuffCreateMockClientSimpleConfigs<R>
    | RuffCreateMockClientWithMockRulesConfigs<R> = {}
) {
  const { axios, mockrules, resources, calls } =
    configs as RuffCreateMockClientSimpleConfigs<R> &
    RuffCreateMockClientWithMockRulesConfigs<R>;
  if (options === MockProtocol || mockrules) {
    const mockRules: Record<string, RuffMockRandomConfig> = {};
    if (options === MockProtocol) {
      Object.assign(mockRules, pickMockRules(resources, "api/v1"));
    }
    if (mockrules) {
      Object.assign(mockRules, mockrules);
    }
    const client = new MockClient<R, C>(
      options,
      axios,
      resources || ({} as RuffClientResourcesConfigs<R>),
      calls || ({} as RuffClientCallersConfigs<C>),
      mockRules
    );
    return client;
  }
  // console.log(resources);
  const client = new HttpClient<R, C>(options, axios, resources, calls);
  return client;
}
export default createClient
