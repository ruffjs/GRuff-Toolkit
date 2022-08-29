import { AxiosRequestConfig } from "axios";
import Entity, { ExtendedEntity } from "../apis/Entity";
import MockRequestor from "../mock/MockRequestor";
import registerEntities from "../utils/registerEntities";
// import "./httphook";
import WithHooks from "./WithHooks";

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

interface RuffClientConfigs<E extends string = any> {
  axios?: AxiosRequestConfig<any>;
  entitis?: Record<E, RuffEntityConfiguration>;
}

interface RuffMockClientConfigs<E extends string = any>
  extends RuffClientConfigs<E> {
  mock: {};
}

export default class Client<E extends string = any>
  extends WithHooks
  implements RuffHttpClient
{
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs?: RuffClientConfigs
  ): Client<E> & Record<E, ExtendedEntity>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs: RuffMockClientConfigs
  ): MockRequestor<E> & Record<E, ExtendedEntity>;
  static createClient<E extends string = any>(
    options: (RuffClientOptions & RuffClientHooks) | string,
    configs: RuffClientConfigs<E> | RuffMockClientConfigs<E> = {}
  ) {
    const { axios, mock, entitis } = configs as RuffMockClientConfigs;
    if (mock) {
      const client = new MockRequestor<E>(options, axios, entitis, mock);
      return client;
    }
    // console.log(entitis);
    const client = new Client<E>(options, axios, entitis);
    return client;
  }

  private constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {},
    entitis: Record<E, RuffEntityConfiguration> = {} as Record<
      E,
      RuffEntityConfiguration
    >
  ) {
    super(options, config);
    registerEntities(entitis, this as any);
  }
}
