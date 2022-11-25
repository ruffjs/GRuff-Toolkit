import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";

export const forms = {
  path: "form",
  component: DirectRouter,
  meta: {
    name: "表单组件与表单配置",
  },
  children: [
    {
      path: "selectable",
      component: PlaceholderPage,
      meta: {
        name: "可选输入框",
      },
    },
    {
      path: "time-range",
      component: PlaceholderPage,
      meta: {
        name: "时间区间选择器",
      },
    },
    {
      path: "popup",
      component: PlaceholderPage,
      meta: {
        name: "自定义弹出式选择器",
      },
    },
    {
      path: "location",
      component: PlaceholderPage,
      meta: {
        name: "自定义表单元素容器",
      },
    },
    {
      path: "widgets",
      component: PlaceholderPage,
      meta: {
        name: "申明式表单组件与申明式表单组件容器",
      },
    },
    {
      path: "form",
      component: PlaceholderPage,
      meta: {
        name: "申明式表单",
      },
    },
  ],
};
