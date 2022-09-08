type Method = number;

type RuffMockRandomFn<T extends RuffHttpResource = any, D extends RuffHttpResource = any> = ((params: CallParams<D>,
  config?: AxiosRequestConfig<D>) => Promise<RuffResponseContent<T>>)
type RuffMockRandom<T extends RuffHttpResource = any, D extends RuffHttpResource = any> = RuffMockRandomFn<T, D> | RuffResponseContent<T>;

interface RuffMockRPCConfiguration {
  path?: string;
  type?: T;
  model?: P;
  0?: RuffMockRandom;
}

interface RuffMockRESTConfiguration {
  path?: string;
  methods: Method[];
  type?: T;
  model?: P;
  [x: Method]: RuffMockRandom;
  children?: Record<string, RuffMockRESTConfiguration>;
}

interface RuffMockConfiguration extends RuffMockRESTConfiguration {
  "/"?: Record<string, RuffMockConfiguration | RuffMockRPCConfiguration>;
  "/**/"?: Record<string, RuffMockRESTConfiguration | RuffMockRPCConfiguration>;
}
