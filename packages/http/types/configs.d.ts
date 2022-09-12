type RuffResourceMethod = number;

type RuffMockRandomConfig<T extends RuffHttpResource = any, D extends RuffHttpResource = any> = RuffMockRandomFunction<T, D> | RuffClientResponseContent<T>;

interface RuffCreateCallableResouceConfig<T extends RuffHttpResource = any, P extends AnyRecord = any> {
    path?: string;
    method: RuffResourceMethod;
    type?: T;
    model?: P;
}

interface RuffCreateCallableMockResouceConfig<T extends RuffHttpResource = any, P extends AnyRecord = any> extends RuffCreateCallableResouceConfig<T, P> {
    0?: RuffMockRandomConfig;
}

interface RuffCreateAffiliatedResourceConfig<T extends RuffHttpResource = any> {
    path?: string;
    methods: RuffResourceMethod[];
    type?: T;
    model?: P;
    config?: RuffClientRequestConfig;
}

interface RuffCreateResourceConfig<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
> extends RuffCreateAffiliatedResourceConfig<T> {
    pickable?: boolean | string
    "/"?: Record<S, RuffCreateResourceConfig | RuffCreateCallableResouceConfig>;
    "/**/"?: Record<
        A,
        RuffCreateAffiliatedResourceConfig | RuffCreateCallableResouceConfig
    >;
}



interface RuffCreateMockResouceBaseConfig<T extends RuffHttpResource = any> extends RuffCreateAffiliatedResourceConfig<T> {
    [x: RuffResourceMethod]: RuffMockRandomConfig;
    children?: Record<string, RuffCreateMockResouceBaseConfig>;
}

interface RuffCreateMockResourceConfig extends RuffCreateMockResouceBaseConfig {
    pickable?: boolean | string
    "/"?: Record<string, RuffCreateMockResourceConfig | RuffCreateCallableMockResouceConfig>;
    "/**/"?: Record<string, RuffCreateMockResouceBaseConfig | RuffCreateCallableMockResouceConfig>;
}

interface RuffResourceDefinationOptions<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
> {
    resource: RuffCreateResourceConfig<T, S, A>;
    prefix: string;
    client: RuffClient;
    config?: RuffClientRequestConfig;
}

type RuffCallableResourceDefinationOptions = {
    client: RuffClient;
    prefix: string[];
    call: RuffCreateCallableResouceConfig;
};

type CreateApiHubDefination = Record<string, {
    type: any
    model: any
}>

type CreateApiHubConfig<T extends CreateApiHubDefination> = {
    [k in keyof T]: Partial<RuffCreateCallableResouceConfig<T[k]['type'] extends string ? T[k]['type'] : any, T[k]['model'] extends string ? T[k]['model'] : any>> & Partial<T[k]>
}