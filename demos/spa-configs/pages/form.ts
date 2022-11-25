import { DirectRouter, PlaceholderPage } from "@ruff-web/spa";

import Selectable from "@/spa-views/forms/Selectable.vue";
import TimeRange from "@/spa-views/forms/TimeRange.vue";
import Popup from "@/spa-views/forms/Popup.vue";
import Location from "@/spa-views/forms/Location.vue";
import Widgets from "@/spa-views/forms/Widgets.vue";
import Form from "@/spa-views/forms/Form.vue";

export const forms = {
  path: "form",
  component: DirectRouter,
  meta: {
    name: "表单组件与表单配置",
  },
  children: [
    {
      path: "selectable",
      component: Selectable,
      meta: {
        name: "可选输入框",
      },
    },
    {
      path: "time-range",
      component: TimeRange,
      meta: {
        name: "时间区间选择器",
      },
    },
    {
      path: "popup",
      component: Popup,
      meta: {
        name: "自定义弹出式选择器",
      },
    },
    {
      path: "location",
      component: Location,
      meta: {
        name: "自定义表单元素容器",
      },
    },
    {
      path: "widgets",
      component: Widgets,
      meta: {
        name: "申明式表单组件与申明式表单组件容器",
      },
    },
    {
      path: "form",
      component: Form,
      meta: {
        name: "申明式表单",
      },
    },
  ],
};
