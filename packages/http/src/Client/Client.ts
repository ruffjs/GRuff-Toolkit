import { AxiosRequestConfig } from "axios";
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

export default class Client extends WithHooks implements RuffHttpClient {
  constructor(
    options: (RuffClientOptions & RuffClientHooks) | string,
    config: AxiosRequestConfig<any> = {}
  ) {
    super(options, config);
  }

  helpers: IClientHelper = {};

  x(options: ExtendsEntityOption, type: ExtendsType.Entity): void;
  x(options: ExtendsMethodOption, type: ExtendsType.method): void;
  x(options: ExtendsObjectOption, type: ExtendsType.object): void;
  x(
    options: ExtendsEntityOption | ExtendsMethodOption | ExtendsObjectOption,
    type: ExtendsType = ExtendsType.Entity
  ) {}
}
