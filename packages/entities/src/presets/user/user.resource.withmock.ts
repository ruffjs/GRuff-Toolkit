import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

const restResponse = <T extends RuffHttpResource = any>(data: T, code = 200, message = "") => {
    return {
        data,
        code,
        message
    } as RuffClientResponseContent<T>
}

export default {
    prefix: 'api/v1',
    methods: [M.POST, M.LIST, M.PUT, M.DELETE],
    pickable: false,
    pk: 'id',
    [M.POST]: async (_: RuffClientResourceCallParams) => {
        return restResponse({})
    },
    [M.LIST]: async (_: RuffClientResourceCallParams) => {
        return restResponse({
            content: [
                {
                    id: "bar1",
                },
                {
                    id: "bar2",
                },
                {
                    foo: "bar3",
                },
            ],
            totalCount: 10,
        });
    },
    [M.PUT]: async (_: RuffClientResourceCallParams) => {
        return restResponse({})
    },
    [M.DELETE]: restResponse(true),
    '/': {
        loginLog: {
            methods: [M.LIST],
            [M.LIST]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
            '/': {
                loginLog2: {
                    methods: [M.LIST],
                    [M.LIST]: async (_: RuffClientResourceCallParams) => {
                        return restResponse({})
                    },
                },
            },
        },
        token: {
            methods: [M.POST],
            [M.LIST]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
        },
        login: {
            method: M.POST,
            0: (async ({ payload, query, idOrKeys, subIdOrKeys }, config) => {
                // console.log(payload, query, idOrKeys, subIdOrKeys, config)
                return restResponse("cretaed", 201, "massage")
            }) as RuffMockRandomFunction,
        },
        loginBySmsCode: {
            method: M.POST,
            0: async (_: RuffClientResourceCallParams): Promise<RuffClientResponseContent> => {
                return Promise.reject(restResponse({}, 401, "Need Login"))
            },
        },
    },
    '/**/': {
        profile: {
            methods: [M.GET, M.PUT],
            [M.GET]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
            [M.PUT]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
        },
        password: {
            methods: [M.PUT],
            [M.PUT]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
        },
        bindPhone: {
            methods: [M.POST, M.DELETE],
            [M.POST]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
            [M.DELETE]: async (_: RuffClientResourceCallParams) => {
                return restResponse({})
            },
        },
        doSth: {
            method: M.POST,
            path: "fetch404",
        },
    },
};
