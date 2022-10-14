import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";
import { extractMenuFromRoutes, orderMenuItems } from "@ruff-web/spa/src/context";

import About from "../hsa-views/about/About.vue";

import StartUp from "../hsa-views/usages/StartUp.vue";
import QueryWithConditions from "../hsa-views/usages/QueryWithConditions.vue";
import FeatureResource from "../hsa-views/usages/FeatureResource.vue";
import WriteData from "../hsa-views/usages/WriteData.vue";

import FriendlyAPI from "../hsa-views/advances/FriendlyAPI.vue";
import MockClient from "../hsa-views/advances/MockClient.vue";
import DataPool from "../hsa-views/advances/DataPool.vue";

import Concepts from "../hsa-views/configs/Concepts.vue";
import Options from "../hsa-views/configs/Options.vue";
import DataMock from "../hsa-views/configs/DataMock.vue";
import DataRandom from "../hsa-views/configs/DataRandom.vue";
import DataRdo from "../hsa-views/configs/DataRdo.vue";
import ResourceModel from "../hsa-views/configs/ResourceModel.vue";

import Vista from "../hsa-views/vista/Vista.vue";

const pages = [
    {
        path: "about",
        component: About,
        meta: {
            name: "首页",
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
                path: "feature-resource",
                component: FeatureResource,
                meta: {
                    name: "请求实体的属性资源",
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
        path: "advances",
        component: DirectRouter,
        meta: {
            name: "进阶用法",
        },
        children: [
            {
                path: "friendly-api",
                component: FriendlyAPI,
                meta: {
                    name: "使用编辑器友好的接口",
                },
            },
            {
                path: "mock-client",
                component: MockClient,
                meta: {
                    name: "使用MockClient",
                },
            },
            {
                path: "data-pool",
                component: DataPool,
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
                component: Concepts,
                meta: {
                    name: "一些概念",
                },
            },
            {
                path: "options",
                component: Options,
                meta: {
                    name: "配置Http Client与Providers",
                },
            },
            {
                path: "data-mock",
                component: DataMock,
                meta: {
                    name: "配置Mock Client",
                },
            },
            {
                path: "data-random",
                component: DataRandom,
                meta: {
                    name: "借助data-random配置Mock",
                },
            },
            {
                path: "data-rdo",
                component: DataRdo,
                meta: {
                    name: "申明式随机数据定义RDO",
                },
            },
            {
                path: "resource-model",
                component: ResourceModel,
                meta: {
                    name: "将配置集成到资源模型",
                },
            },
        ],
    },
    {
        path: "vista",
        component: Vista,
        meta: {
            name: "后续",
        },
    },
] as RuffSPAPageConfig[];

export const menu = orderMenuItems(extractMenuFromRoutes(pages))
export default pages