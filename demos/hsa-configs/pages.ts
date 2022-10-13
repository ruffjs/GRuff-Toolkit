import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";
import { extractMenuFromRoutes, orderMenuItems } from "@ruff-web/spa/src/context";

import About from "../hsa-views/about/About.vue";

import StartUp from "../hsa-views/basic-usages/StartUp.vue";

const pages = [
    {
        path: "about",
        component: About,
        meta: {
            name: "关于这次分享",
        },
    },
    {
        path: "basic-usages",
        component: DirectRouter,
        meta: {
            name: "基本用法",
        },
        children: [
            {
                path: "startup",
                component: StartUp,
                meta: {
                    name: "快速使用",
                },
            }
        ],
    },
    {
        path: "advance-usages",
        component: DirectRouter,
        meta: {
            name: "更多用法",
        },
        children: [
        ],
    },
    {
        path: "concepts",
        component: About,
        meta: {
            name: "一些概念",
        },
    },
    {
        path: "configs",
        component: DirectRouter,
        meta: {
            name: "配置客户端",
        },
        children: [
        ],
    },
    {
        path: "vista",
        component: DirectRouter,
        meta: {
            name: "更多",
        },
        children: [
        ],
    },
] as RuffSPAPageConfig[];

export const menu = orderMenuItems(extractMenuFromRoutes(pages))
export default pages

console.log(menu)