type RuffResourceMethod = number;

type RuffMockRandomConfig<T extends RuffHttpResource = any, D extends RuffHttpResource = any> = RuffMockRandomFunction<T, D> | RuffClientResponseContent<T>;

interface RuffCreateCallableResouceProviderConfig<T extends RuffHttpResource = any, P extends AnyRecord = any> {
    path?: string;
    method: RuffResourceMethod;
    type?: T;
    model?: P;
}

interface RuffCreateCallableResourceMockerConfig<T extends RuffHttpResource = any, P extends AnyRecord = any> extends RuffCreateCallableResouceProviderConfig<T, P> {
    0?: RuffMockRandomConfig;
}

interface RuffCreateFeatureResourceProviderConfig<T extends RuffHttpResource = any> {
    path?: string;
    methods: RuffResourceMethod[];
    type?: T;
    model?: P;
    config?: RuffClientRequestConfig;
}

interface RuffCreateResourceProviderConfig<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
> extends RuffCreateFeatureResourceProviderConfig<T> {
    pickable?: boolean | string
    "/"?: Record<S, RuffCreateResourceProviderConfig | RuffCreateCallableResouceProviderConfig>;
    "/**/"?: Record<
        A,
        RuffCreateFeatureResourceProviderConfig | RuffCreateCallableResouceProviderConfig
    >;
}



interface RuffCreateBaseResourceMockerConfig<T extends RuffHttpResource = any> extends RuffCreateFeatureResourceProviderConfig<T> {
    [x: RuffResourceMethod]: RuffMockRandomConfig;
    children?: Record<string, RuffCreateBaseResourceMockerConfig>;
}

interface RuffCreateResourceMockerConfig extends RuffCreateBaseResourceMockerConfig {
    pickable?: boolean | string
    "/"?: Record<string, RuffCreateResourceMockerConfig | RuffCreateCallableResourceMockerConfig>;
    "/**/"?: Record<string, RuffCreateBaseResourceMockerConfig | RuffCreateCallableResourceMockerConfig>;
}

interface RuffResourceProviderDefinationOptions<
    T extends RuffHttpResource = any,
    S extends string = any,
    A extends string = any
> {
    resource: RuffCreateResourceProviderConfig<T, S, A>;
    prefix: string;
    client: RuffClient;
    config?: RuffClientRequestConfig;
}

type RuffCallableResourceProviderDefinationOptions = {
    client: RuffClient;
    prefix: string[];
    call: RuffCreateCallableResouceProviderConfig;
};

type CreateApiHubDefination = Record<string, {
    type: any
    model: any
}>

type CreateApiHubConfig<T extends CreateApiHubDefination> = {
    [k in keyof T]: Partial<RuffCreateCallableResouceProviderConfig<T[k]['type'] extends string ? T[k]['type'] : any, T[k]['model'] extends string ? T[k]['model'] : any>> & Partial<T[k]>
}