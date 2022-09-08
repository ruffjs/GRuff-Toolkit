type Method = number;

interface RuffHttpApiConfiguration { }

interface RuffHttpRPCConfiguration<T extends RuffHttpResource = any, P extends AnyRecord = any> {
  path?: string;
  method: Method;
  type?: T;
  model?: P;
}

interface RuffAffiliatedResourceConfiguration<T extends RuffHttpResource = any> {
  path?: string;
  methods: Method[];
  type?: T;
  config?: RuffHttpApiConfiguration;
}

interface RuffResourceConfiguration<
  T extends RuffHttpResource = any,
  M extends string = any,
  A extends string = any
> extends RuffAffiliatedResourceConfiguration<T> {
  pickable?: boolean | string
  "/"?: Record<M, RuffResourceConfiguration | RuffHttpRPCConfiguration>;
  "/**/"?: Record<
    A,
    RuffAffiliatedResourceConfiguration | RuffHttpRPCConfiguration
  >;
}

interface RuffResourceDefinationOptions<
  T extends RuffHttpResource = any,
  M extends string = any,
  A extends string = any
> {
  resource: RuffResourceConfiguration<T, M, A>;
  prefix: string;
  client: RuffClientBasicMethods & RuffResourceRequestors;
  config?: RuffHttpApiConfiguration;
}

type RuffAffiliatedResourceGetter<T extends RuffDataModel = any> = (
  condition?: RuffHttpQueryCondition
) => Promise<RuffResponseContent<T>>;

type RuffCreateRPCApiOptions = {
  client: RuffClientBasicMethods;
  prefix: string[];
  call: RuffHttpRPCConfiguration;
};


type RuffCallableAPI<T extends RuffHttpResource = any, P extends AnyRecord = any> = (
  args: RuffCallArguments<P>
) => Promise<RuffResponseContent<T>>;
