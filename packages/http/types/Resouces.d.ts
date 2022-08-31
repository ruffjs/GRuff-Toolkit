type Method = number;

interface RuffHttpApiConfiguration { }

interface RuffHttpRPCConfiguration {
  path?: string;
  method: Method;
  // children?: Record<string, RuffResourceConfiguration>; 不接受这种设定
}

interface RuffAffiliatedResourceConfiguration {
  path?: string;
  methods?: Method[];
  config?: RuffHttpApiConfiguration;
  children?: Record<string, RuffAffiliatedResourceConfiguration>;
}

interface RuffResourceConfiguration<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > extends RuffAffiliatedResourceConfiguration {
  children?: Record<C, RuffResourceConfiguration>;
  commands?: Record<X, RuffHttpRPCConfiguration>;
  attrs?: Record<B, RuffAffiliatedResourceConfiguration>;
  acts?: Record<A, RuffHttpRPCConfiguration>;
}

interface RuffCreateResourceOptions<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > {
  resource: RuffResourceConfiguration<C, X, B, A>;
  prefix: string;
  client: RuffClientBasicMethods & RuffResourceRequestors;
  config?: RuffHttpApiConfiguration;
}

type Callable<T extends RuffDataModel = any> = (
  args?: AnyRecord
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;

type AffiliatedResourceGetter<T extends RuffDataModel = any> = (
  condition?: RuffHttpQueryCondition
) => Promise<AxiosResponse<RuffHttpResponse<T>>>;


