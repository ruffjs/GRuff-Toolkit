import CallableAPIs from "../resource/CallableAPIs";


export type CreateApiHubConfiguration<T extends Record<string, any>> = {
    [k in keyof T]: RuffHttpRPCConfiguration<T[k]>
}

export function defineApiHub<T extends Record<string, any> = any, P extends Record<keyof T, any> = any>(prefix: string, client: RuffClientBasicMethods &
    RuffResourceRequestors, config: CreateApiHubConfiguration<T>) {
    type K = keyof T

    const apis = {} as {
        [k in K]: RuffCallableAPI<T[k], P[k]>
    }
    (Object.keys(config) as K[]).forEach(apiname => {
        apis[apiname] = CallableAPIs.defineApi(apiname as string, {
            call: config[apiname],
            prefix,
            client,
        });
    })

    return apis
}