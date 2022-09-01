import CallableAPIs from "../resource/CallableAPIs";


export type CreateApiHubConfiguration<T extends object> = {
    [k in keyof T]: RuffHttpRPCConfiguration<T[k]>
}

export function createApiHub<T extends object = any, P extends Record<keyof T, any> = any>(prefix: string, client: RuffClientBasicMethods &
    RuffResourceRequestors, config: CreateApiHubConfiguration<T>) {
    type K = keyof T

    const apis = {} as {
        [k in K]: CallableAPI<T[k], P[k]>
    }
    (Object.keys(config) as K[]).forEach(apiname => {
        apis[apiname] = CallableAPIs.createApi(apiname as string, {
            call: config[apiname],
            prefix,
            client,
        });
    })

    return apis
}