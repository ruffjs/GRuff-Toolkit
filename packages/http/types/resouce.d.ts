type Method = number;

interface RuffHttpApiConfiguration {}

interface RuffHttpRPCConfiguration<T = any, P extends AnyRecord = any> {
  path?: string;
  method: Method;
  type?: T;
  model?: P;
}

interface RuffAffiliatedResourceConfiguration<T = any> {
  path?: string;
  methods: Method[];
  type?: T;
  config?: RuffHttpApiConfiguration;
}

interface RuffResourceConfiguration<
  T = any,
  M extends string = any,
  A extends string = any
> extends RuffAffiliatedResourceConfiguration<T> {
  "/"?: Record<M, RuffResourceConfiguration | RuffHttpRPCConfiguration>;
  "/**/"?: Record<
    A,
    RuffAffiliatedResourceConfiguration | RuffHttpRPCConfiguration
  >;
}

interface RuffCreateResourceOptions<
  T = any,
  M extends string = any,
  A extends string = any
> {
  resource: RuffResourceConfiguration<T, M, A>;
  prefix: string;
  client: RuffClientBasicMethods & RuffResourceRequestors;
  config?: RuffHttpApiConfiguration;
}

type AffiliatedResourceGetter<T extends RuffDataModel = any> = (
  condition?: RuffHttpQueryCondition
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;

type CreateRPCApiOptions = {
  client: RuffClientBasicMethods;
  prefix: string;
  call: RuffHttpRPCConfiguration;
};

type CallArguments<P extends AnyRecord = any> = {
  payload?: P;
  query?: RuffHttpQueryCondition;
};

type CallableAPI<T = any, P extends AnyRecord = any> = (
  args: CallArguments<P>
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;
