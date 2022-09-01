type Method = number;

type RuffMockRandom = ((...args: AnyArray) => any) | ScalarValue | AnyRecord;

interface RuffMockRPCConfiguration {
  path?: string;
  0: RuffMockRandom;
}

interface RuffMockRESTConfiguration {
  path?: string;
  methods: Method[];
  [x: Method]: RuffMockRandom;
  children?: Record<string, RuffMockRESTConfiguration>;
}

interface RuffMockConfiguration extends RuffMockRESTConfiguration {
  "/"?: Record<string, RuffMockConfiguration | RuffMockRPCConfiguration>;
  "/**/"?: Record<string, RuffMockRESTConfiguration | RuffMockRPCConfiguration>;
}
