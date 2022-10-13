import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";
import { extractMenuFromRoutes, orderMenuItems } from "@ruff-web/spa/src/context";

import HomePage from "../hsa-views/home/HomePage.vue";

const pages = [
    {
        path: "home",
        component: HomePage,
        meta: {
            name: "首页",
        },
    },
    {
        path: "others",
        component: DirectRouter,
        meta: {
            name: "其它工具",
        },
        children: [
            {
                path: "home",
                component: HomePage,
                meta: {
                    name: "首页",
                },
            }
        ],
    },
] as RuffSPAPageConfig[];

export const menu = orderMenuItems(extractMenuFromRoutes(pages))
export default pages
