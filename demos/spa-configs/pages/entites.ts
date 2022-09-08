import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";

export const entities = {
    path: "entities",
    component: DirectRouter,
    meta: {
        name: "预设配置与实体组件",
    },
    children: [
        {
            path: "user-table",
            component: PlaceholderPage,
            meta: {
                name: "用户数据表格",
            },
        },
        {
            path: "resort-cols",
            component: PlaceholderPage,
            meta: {
                name: "调整实体表格的列序",
            },
        },
        {
            path: "rewrite-cols",
            component: PlaceholderPage,
            meta: {
                name: "覆写实体组件的列定义",
            },
        },
        {
            path: "user-form",
            component: PlaceholderPage,
            meta: {
                name: "用户表单",
            },
        },
        {
            path: "rewrite-user-form",
            component: PlaceholderPage,
            meta: {
                name: "调整用户表单",
            },
        },
        {
            path: "data-view",
            component: PlaceholderPage,
            meta: {
                name: "使用DataView展示和编辑用户",
            },
        },
        {
            path: "others",
            component: PlaceholderPage,
            meta: {
                name: "其它实体表格与表单",
            },
        },
        {
            path: "widgets",
            component: PlaceholderPage,
            meta: {
                name: "其它小组件",
            },
        },
    ],
}