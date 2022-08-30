type Method = number;

type RuffMockRandom = ((...args?: AnyArray) => any) | ScalarValue | AnyRecord

interface RuffMockRPCConfiguration {
    dirname?: string;
    random: RuffMockRandom,
}

interface RuffMockRESTConfiguration {
    dirname?: string;
    methods?: Method[];
    [x: Method]: RuffMockRandom,
    children?: Record<string, RuffMockRESTConfiguration>;
}

interface RuffMockConfiguration extends RuffMockRESTConfiguration {
    children?: Record<string, RuffMockConfiguration>;
    commands?: Record<string, RuffMockRPCConfiguration>;
    attrs?: Record<string, RuffMockRESTConfiguration>;
    acts?: Record<string, RuffMockRPCConfiguration>;
}