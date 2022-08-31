import { DirectRouter, AnimateRouter, PlaceholderPage } from "@ruff-web/spa";

import HomePage from "../spa-views/home/HomePage.vue";

// import History from "../views/workspace/monitor/HistoryList.vue"
// import HistoryDetail from "../views/workspace/monitor/HistoryDetail.vue"
// import RealTime from "../views/workspace/monitor/RealTimeList.vue"
// import RealTimeDetail from "../views/workspace/monitor/RealTimeDetail.vue"

// import Calibration from "../views/workspace/operation/Calibration.vue"

// import Device from "../views/workspace/device/DeviceList.vue"
// import DeviceDetail from "../views/workspace/device/DeviceDetail.vue"

// import Site from "../views/workspace/setting/SiteList.vue"
// import SiteDetail from "../views/workspace/setting/SiteDetail.vue"
// import User from "../views/workspace/setting/UserList.vue"

export default [
  {
    path: "home",
    component: HomePage,
  },
  {
    path: "page",
    component: AnimateRouter,
    meta: {
      name: "页面容器",
    },
    children: [],
  },
  {
    path: "table",
    component: DirectRouter,
    meta: {
      name: "表格xainggoo组件与单元格组件",
    },
    children: [],
  },
  {
    path: "table",
    component: DirectRouter,
    meta: {
      name: "表格组件与单元格组件",
    },
    children: [],
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
