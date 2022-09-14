import { ExtendedResourceInterface } from "../resources/StatelessResource";
import MockClient from "./mock/MockClient";
import HttpClient from "./http/HttpClient";
import { pickMockRules } from "../helpers/vendors/MockRule";

function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs?: RuffCreateClientConfigs<R, C>
): HttpClient<R> & Record<R, ExtendedResourceInterface> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs: RuffCreateMockClientSimpleConfigs<R>
): MockClient<R> & Record<R, ExtendedResourceInterface> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs: RuffCreateMockClientWithRandomsConfigs<R>
): MockClient<R> & Record<R, ExtendedResourceInterface> & Record<C, RuffResourceCaller>;
function createClient<R extends string = any, C extends string = any>(
  options: (RuffCreateClientOptions & RuffClientHooks) | string,
  configs:
    | RuffCreateClientConfigs<R, C>
    | RuffCreateMockClientSimpleConfigs<R>
    | RuffCreateMockClientWithRandomsConfigs<R> = {}
) {
  const { axios, withMock, rules, resources, calls } =
    configs as RuffCreateMockClientSimpleConfigs<R> &
    RuffCreateMockClientWithRandomsConfigs<R>;
  if (withMock || rules) {
    const mockRules: Record<string, RuffMockRandomConfig> = {};
    if (withMock) {
      Object.assign(mockRules, pickMockRules(resources, "api/v1"));
    }
    if (rules) {
      Object.assign(mockRules, rules);
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
