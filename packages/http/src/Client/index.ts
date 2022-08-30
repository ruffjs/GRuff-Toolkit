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
    const { axios, mock, randoms, entitis } =
      configs as RuffMockClientConfigs<E> & RuffRandomsClientConfigs<E>;
    if (randoms || mock) {
      const _randoms: Record<string, RuffMockRandom> = {};
      if (mock) {
        Object.assign(_randoms, formatMockConfigs(mock, "api/v1"));
      }
      if (randoms) {
        Object.assign(_randoms, randoms);
      }
      const client = new MockClient<E>(
        options,
        axios,
        entitis || ({} as RuffClientEntitisConfigs<E>),
        _randoms
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
