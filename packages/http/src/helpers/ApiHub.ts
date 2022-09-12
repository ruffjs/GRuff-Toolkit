import CallableResource from "../resources/CallableResource";


export type ApiHub<T extends CreateApiHubDefination = any> = {
    [k in keyof T]: RuffResourceCaller<T[k]['type'], T[k]['model']>
}

export function defineApiHub<
    T extends CreateApiHubDefination = any
>(prefix: string, client: RuffClient, config: CreateApiHubConfig<T>) {
    type K = keyof T
    const apis = {} as ApiHub<T>

    (Object.keys(config) as K[]).forEach(apiname => {
        apis[apiname] = CallableResource.defineCallApi(apiname as string, {
            call: config[apiname] as unknown as RuffCreateCallableResouceConfig<T[K]['type'], T[K]['model']>,
            prefix: [prefix],
            client,
        });
    })

    return apis
}

function _combine<T1 extends ApiHub, T2 extends ApiHub>
    (hub1: T1, hub2: T2)
    : T1 & T2;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3)
    : T1 & T2 & T3;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4)
    : T1 & T2 & T3 & T4;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub, T5 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4, hub5: T5)
    : T1 & T2 & T3 & T4 & T5;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub, T5 extends ApiHub, T6 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4, hub5: T5, hub6: T6)
    : T1 & T2 & T3 & T4 & T5 & T6;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub, T5 extends ApiHub, T6 extends ApiHub, T7 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4, hub5: T5, hub6: T6, hub7: T7)
    : T1 & T2 & T3 & T4 & T5 & T6 & T7;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub, T5 extends ApiHub, T6 extends ApiHub, T7 extends ApiHub, T8 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4, hub5: T5, hub6: T6, hub7: T7, hub8: T8)
    : T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8;
function _combine<T1 extends ApiHub, T2 extends ApiHub, T3 extends ApiHub, T4 extends ApiHub, T5 extends ApiHub, T6 extends ApiHub, T7 extends ApiHub, T8 extends ApiHub, T9 extends ApiHub>
    (hub1: T1, hub2: T2, hub3: T3, hub4: T4, hub5: T5, hub6: T6, hub7: T7, hub8: T8, hub9: T9)
    : T1 & T2 & T3 & T4 & T5 & T6 & T8 & T9;
function _combine(...args: any[]): ApiHub {
    if (arguments.length < 2 || arguments.length > 9) {
        throw new Error("can not combine more than 9 ApiHubs, and at least 2 ApiHubs should be provided")
    }
    if (arguments.length === 2) {
        return {
            ...arguments[0], ...arguments[1]
        }
    } else {
        const [arg_1, ...rest] = arguments
        return {
            ...arg_1,
            ..._combine.apply(null, rest as any)
        }
    }
}

export const combineApiHubs = _combine