import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";

import HomePage from "../hsa-views/home/HomePage.vue";

export default [
    {
        path: "home",
        component: HomePage,
    },
    {
        path: "others",
        component: DirectRouter,
        meta: {
            name: "其它工具",
        },
        children: [
            {
                path: "csv",
                component: PlaceholderPage,
                meta: {
                    name: "CSV导入导出",
                },
            },
            {
                path: "icons",
                component: PlaceholderPage,
                meta: {
                    name: "集成图标库",
                },
            },
            {
                path: "xrender",
                component: PlaceholderPage,
                meta: {
                    name: "XRender Vue Plus",
                },
            },
        ],
    },
] as RuffSPAPageConfig[];
