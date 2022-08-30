type Method = number;

interface RuffHttpApiConfiguration { }

interface RuffHttpRPCConfiguration {
  dirname?: string;
  method: Method;
  // children?: Record<string, RuffEntityConfiguration>; 不接受这种设定
}

interface RuffBelongingConfiguration {
  dirname?: string;
  methods?: Method[];
  config?: RuffHttpApiConfiguration;
  children?: Record<string, RuffBelongingConfiguration>;
}

interface RuffEntityConfiguration<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > extends RuffBelongingConfiguration {
  children?: Record<C, RuffEntityConfiguration>;
  commands?: Record<X, RuffHttpRPCConfiguration>;
  attrs?: Record<B, RuffBelongingConfiguration>;
  acts?: Record<A, RuffHttpRPCConfiguration>;
}

interface RuffEntityOptions<
  C extends string = any,
  X extends string = any,
  B extends string = any,
  A extends string = any
  > {
  resource: RuffEntityConfiguration<C, X, B, A>;
  prefix: string;
  client: RuffResourceRequestor;
  config?: RuffHttpApiConfiguration;
}


