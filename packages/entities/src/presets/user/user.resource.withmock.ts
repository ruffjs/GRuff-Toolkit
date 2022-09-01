import { ResourceMethod as M } from "@ruff-web/http/src/utils/resource-methods";

export default {
    prefix: 'api/v1',
    methods: [M.POST, M.LIST, M.PUT, M.DELETE],
    [M.POST]: () => {
        console.log("11111");
    },
    [M.LIST]: () => {
        return {
            content: [
                {
                    foo: "bar1",
                },
                {
                    foo: "bar2",
                },
                {
                    foo: "bar3",
                },
            ],
            totalCount: 10,
        };
    },
    [M.PUT]: () => {
        console.log("33333");
    },
    [M.DELETE]: true,
    '/': {
        loginLog: {
            methods: [M.LIST],
            [M.LIST]: () => {
                console.log("44444");
            },
            '/': {
                loginLog2: {
                    methods: [M.LIST],
                    [M.LIST]: () => {
                        console.log("55555");
                    },
                },
            },
        },
        token: {
            methods: [M.POST],
            [M.LIST]: () => {
                console.log("66666");
            },
        },
        login: {
            method: M.POST,
            0: () => {
                console.log("77777");
            },
        },
        loginBySmsCode: {
            method: M.POST,
            0: () => {
                console.log("88888");
            },
        },
    },
    '/**/': {
        profile: {
            methods: [M.GET, M.PUT],
            [M.GET]: () => {
                console.log("99999");
            },
            [M.PUT]: () => {
                console.log("aaaaa");
            },
        },
        password: {
            methods: [M.PUT],
            [M.PUT]: () => {
                console.log("bbbbb");
            },
        },
        bindPhone: {
            methods: [M.POST, M.DELETE],
            [M.POST]: () => {
                console.log("ccccc");
            },
            [M.DELETE]: () => {
                console.log("ddddd");
            },
        },
        doSth: {
            method: M.POST,
            path: "fetch404",
            0: () => {
                console.log("eeeee");
            },
        },
    },
};
