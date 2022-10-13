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
        console.log("11111");
        return restResponse({})
    },
    [M.LIST]: async (_: RuffClientResourceCallParams) => {
        console.log("22222");
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
        console.log("33333");
        return restResponse({})
    },
    [M.DELETE]: restResponse(true),
    '/': {
        loginLog: {
            methods: [M.LIST],
            [M.LIST]: async (_: RuffClientResourceCallParams) => {
                console.log("44444");
                return restResponse({})
            },
            '/': {
                loginLog2: {
                    methods: [M.LIST],
                    [M.LIST]: async (_: RuffClientResourceCallParams) => {
                        console.log("55555");
                        return restResponse({})
                    },
                },
            },
        },
        token: {
            methods: [M.POST],
            [M.LIST]: async (_: RuffClientResourceCallParams) => {
                console.log("66666");
                return restResponse({})
            },
        },
        login: {
            method: M.POST,
            0: (async ({ payload, query, idOrKeys, subIdOrKeys }, config) => {
                // console.log("77777");
                // console.log(payload, query, idOrKeys, subIdOrKeys, config)
                return restResponse(7777777, 201, "massage")
            }) as RuffMockRandomFunction,
        },
        loginBySmsCode: {
            method: M.POST,
            0: async (_: RuffClientResourceCallParams): Promise<RuffClientResponseContent> => {
                // console.log("88888");
                return Promise.reject(restResponse({}, 401, "Need Login"))
            },
        },
    },
    '/**/': {
        profile: {
            methods: [M.GET, M.PUT],
            [M.GET]: async (_: RuffClientResourceCallParams) => {
                console.log("99999");
                return restResponse({})
            },
            [M.PUT]: async (_: RuffClientResourceCallParams) => {
                console.log("aaaaa");
                return restResponse({})
            },
        },
        password: {
            methods: [M.PUT],
            [M.PUT]: async (_: RuffClientResourceCallParams) => {
                console.log("bbbbb");
                return restResponse({})
            },
        },
        bindPhone: {
            methods: [M.POST, M.DELETE],
            [M.POST]: async (_: RuffClientResourceCallParams) => {
                console.log("ccccc");
                return restResponse({})
            },
            [M.DELETE]: async (_: RuffClientResourceCallParams) => {
                console.log("ddddd");
                return restResponse({})
            },
        },
        doSth: {
            method: M.POST,
            path: "fetch404",
            // 0: async () => {
            //     console.log("eeeee");
            //     return restResponse({})
            // },
        },
    },
};
