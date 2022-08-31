import { AxiosRequestConfig } from "axios";
import { ExtendedEntity } from "../resource/Entity";
import MockClient from "../mock/MockClient";
import registerEntities from "../utils/registerEntities";
// import "./httphook";
import WithHooks from "./WithHooks";
import formatMockConfigs from "../utils/formatMockConfigs";

interface IClientHelper {
  [x: string]: AnyFn;
}

interface ExtendsEntityOption {
  name: string;
}

interface ExtendsMethodOption {
  name: string;
  f: AnyFn;
}

interface ExtendsObjectOption {
  name: string;
  target: Object;
}

export enum ExtendsType {
  Entity,
  method,
  object,
}

export default class Client<E extends string = any>
  extends WithHooks
  implements RuffHttpClient
{
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs?: RuffClientConfigs<E>
  ): Client<E> & Record<E, ExtendedEntity>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs: RuffMockClientConfigs<E>
  ): MockClient<E> & Record<E, ExtendedEntity>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs: RuffRandomsClientConfigs<E>
  ): MockClient<E> & Record<E, ExtendedEntity>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs:
      | RuffClientConfigs<E>
      | RuffMockClientConfigs<E>
      | RuffRandomsClientConfigs<E> = {}
  ) {
    const { axios, withMock, rules, entitis } =
      configs as RuffMockClientConfigs<E> & RuffRandomsClientConfigs<E>;
    if (withMock || rules) {
      const randomRules: Record<string, RuffMockRandom> = {};
      if (withMock) {
        Object.assign(randomRules, formatMockConfigs(entitis, "api/v1"));
      }
      if (rules) {
        Object.assign(randomRules, rules);
      }
      const client = new MockClient<E>(
        options,
        axios,
        entitis || ({} as RuffClientEntitisConfigs<E>),
        randomRules
      );
      return client;
    }
    // console.log(entitis);
    const client = new Client<E>(options, axios, entitis);
    return client;
  }

  private constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {},
    entitis?: RuffClientEntitisConfigs<E>
  ) {
    super(options, config);
    registerEntities(
      entitis || ({} as RuffClientEntitisConfigs<E>),
      this as any
    );
  }
}
