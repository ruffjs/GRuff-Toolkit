import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";
import { extractMenuFromRoutes, orderMenuItems } from "@ruff-web/spa/src/context";

import About from "../hsa-views/about/About.vue";

import StartUp from "../hsa-views/usages/StartUp.vue";
import QueryWithConditions from "../hsa-views/usages/QueryWithConditions.vue";
import PackagedDataAndChainCall from "../hsa-views/usages/StartUp.vue";
import WriteData from "../hsa-views/usages/QueryWithConditions.vue";

const pages = [
    {
        path: "about",
        component: About,
        meta: {
            name: "关于这次分享",
        },
    },
    {
        path: "usages",
        component: DirectRouter,
        meta: {
            name: "基本用法",
        },
        children: [
            {
                path: "start-up",
                component: StartUp,
                meta: {
                    name: "创建实例并查询数据",
                },
            },
            {
                path: "query-with-conditions",
                component: QueryWithConditions,
                meta: {
                    name: "添加一些查询条件",
                },
            },
            {
                path: "packaged-data-and-chain-call",
                component: PackagedDataAndChainCall,
                meta: {
                    name: "数据封装与链式调用",
                },
            },
            {
                path: "write-data",
                component: WriteData,
                meta: {
                    name: "增删改操作",
                },
            }
        ],
    },
    {
        path: "advance",
        component: DirectRouter,
        meta: {
            name: "进阶用法",
        },
        children: [
            {
                path: "friendly-api",
                component: StartUp,
                meta: {
                    name: "使接口更加友好",
                },
            },
            {
                path: "mock-client",
                component: QueryWithConditions,
                meta: {
                    name: "使用MockClient",
                },
            },
            {
                path: "data-pool",
                component: PackagedDataAndChainCall,
                meta: {
                    name: "使用数据池",
                },
            },
        ],
    },
    {
        path: "configs",
        component: DirectRouter,
        meta: {
            name: "配置客户端",
        },
        children: [
            {
                path: "concepts",
                component: About,
                meta: {
                    name: "一些概念",
                },
            },
            {
                path: "options",
                component: WriteData,
                meta: {
                    name: "配置Http Client与Providers",
                },
            },
            {
                path: "mock-data",
                component: WriteData,
                meta: {
                    name: "配置Mock Client",
                },
            },
            {
                path: "data-random",
                component: WriteData,
                meta: {
                    name: "借助data-random配置Mock",
                },
            },
            {
                path: "data-rdo",
                component: WriteData,
                meta: {
                    name: "申明式随机数据定义RDO",
                },
            },
            {
                path: "resource-model",
                component: WriteData,
                meta: {
                    name: "将配置集成到资源模型",
                },
            },
        ],
    },
    {
        path: "vista",
        component: About,
        meta: {
            name: "展望",
        },
    },
] as RuffSPAPageConfig[];

export const menu = orderMenuItems(extractMenuFromRoutes(pages))
export default pages