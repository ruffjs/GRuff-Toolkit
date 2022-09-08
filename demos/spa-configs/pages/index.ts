import { DirectRouter, AnimateRouter, PlaceholderPage } from "@ruff-web/spa";

import HomePage from "../../spa-views/home/HomePage.vue";
import { entities } from "./entites";
import { forms } from "./form";
import { pages, spacontainers } from "./spa";
import { advTables, tables } from "./table";

export default [
  {
    path: "home",
    component: HomePage,
  },
  pages,
  spacontainers,
  tables,
  forms,
  advTables,
  entities,
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

  // {
  //   path: "monitor",
  //   component: DirectRouter,
  //   meta: {
  //     name: "储罐监控",
  //   },
  //   children: [
  //     {
  //       path: "history/:id",
  //       component: PlaceholderPage,
  //       meta: {},
  //     },
  //     {
  //       path: "history",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "远程监控",
  //       },
  //     },
  //     {
  //       path: "realtime/:id",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "液位详情",
  //       },
  //     },
  //     {
  //       path: "realtime",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "实时液位",
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: "operation",
  //   component: DirectRouter,
  //   meta: {
  //     name: "储罐监控",
  //   },
  //   accessDesc: {
  //     roles: ["PM"],
  //   },
  //   children: [
  //     {
  //       path: "calibration",
  //       // alias: "calibration", 重名的别名会被标准化函数移除
  //       component: PlaceholderPage,
  //       accessDesc: {
  //         roles: ["PM2"],
  //       },
  //       meta: {
  //         name: "调试校准",
  //       },
  //     },
  //     {
  //       path: "",
  //       redirect: "/operation/calibration",
  //     },
  //   ],
  // },
  // {
  //   path: "device",
  //   component: DirectRouter,
  //   meta: {
  //     name: "设备运维",
  //   },
  //   children: [
  //     {
  //       path: ":id",
  //       meta: {
  //         name: "采集箱详情",
  //       },
  //       component: PlaceholderPage,
  //     },
  //     {
  //       path: "",
  //       alias: "list",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "设备列表",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "setting",
  //   component: DirectRouter,
  //   meta: {
  //     name: "基础配置",
  //   },
  //   children: [
  //     {
  //       path: "site/:id",
  //       component: PlaceholderPage,
  //     },
  //     {
  //       path: "site",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "站点管理",
  //       },
  //     },
  //     {
  //       path: "user",
  //       component: PlaceholderPage,
  //       meta: {
  //         name: "用户管理",
  //       },
  //     },
  //   ],
  // },
] as RuffSPAPageConfig[];
