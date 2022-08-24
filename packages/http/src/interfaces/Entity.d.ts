type Method = number;

interface RuffHttpApiConfiguration {}

interface RuffHttpRPCConfiguration {
  dirname?: string;
  method: Method;
  children?: Record<string, RuffEntityConfiguration>;
}

interface RuffBelongingConfiguration {
  dirname?: string;
  methods?: Method[];
  config?: RuffHttpApiConfiguration;
}

interface RuffEntityConfiguration<CH extends string, CO extends string>
  extends RuffBelongingConfiguration {
  children?: Record<CH, RuffEntityConfiguration>;
  commands?: Record<CO, RuffHttpRPCConfiguration>;
  attrs?: Record<string, RuffBelongingConfiguration>;
  acts?: Record<string, RuffHttpRPCConfiguration>;
}

interface RuffEntityOptions<CH extends string, CO extends string> {
  resource: RuffEntityConfiguration<CH, CO>;
  client: RuffHttpClient;
  config?: RuffHttpApiConfiguration;
}
