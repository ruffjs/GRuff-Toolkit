import { AnimateRouter, DirectRouter, PlaceholderPage } from "@ruff-web/spa";

export const pages = {
    path: "page",
    component: AnimateRouter,
    meta: {
        name: "页面容器（子页面切换含动画）",
    },
    children: [
        {
            path: "fixed",
            component: PlaceholderPage,
            meta: {
                name: "固定高度页面",
            },
        },
        {
            path: "scroll",
            component: PlaceholderPage,
            meta: {
                name: "可滚动页面",
            },
        },
        {
            path: "with-header-std",
            component: PlaceholderPage,
            meta: {
                name: "含通用头部的页面",
            },
        },
        {
            path: "with-header-auto",
            component: PlaceholderPage,
            meta: {
                name: "含通用头部的页面（自动）",
            },
        },
        {
            path: "with-header-custom",
            component: PlaceholderPage,
            meta: {
                name: "含自定义头部的页面",
            },
        },
        {
            path: "with-auth-route",
            component: PlaceholderPage,
            meta: {
                name: "需要访问权限的页面（路由级）",
            },
        },
        {
            path: "with-auth-page",
            component: PlaceholderPage,
            meta: {
                name: "需要访问权限的页面（页面容器级）",
            },
        },
    ],
}

export const spacontainers = {
    path: "container",
    component: DirectRouter,
    meta: {
        name: "预设配置与实体组件",
    },
    children: []
}