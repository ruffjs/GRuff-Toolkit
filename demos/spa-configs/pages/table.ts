import { AnimateRouter, DirectRouter, PlaceholderPage } from "@ruff-web/spa";

import AutoHeight from "@/spa-views/tables/AutoHeight.vue";

export const tables = {
  path: "table",
  component: DirectRouter,
  meta: {
    name: "表格组件与单元格组件",
  },
  children: [
    {
      path: "autoheight",
      component: AutoHeight,
      meta: {
        name: "自动高度表格容器",
      },
    },
    {
      path: "pagination",
      component: PlaceholderPage,
      meta: {
        name: "带有分页的表格",
      },
    },
    {
      path: "hidable-columns",
      component: PlaceholderPage,
      meta: {
        name: "按条件隐藏列表",
      },
    },
    {
      path: "grouped-columns",
      component: DirectRouter,
      meta: {
        name: "对列进行分组",
      },
      children: [
        {
          path: "v1",
          component: PlaceholderPage,
          meta: {
            name: "v1",
          },
        },
        {
          path: "v2",
          component: PlaceholderPage,
        },
      ],
    },
    {
      path: "cells",
      component: PlaceholderPage,
      meta: {
        name: "使用自定义单元格组件",
      },
    },
    {
      path: "cell-renders",
      component: PlaceholderPage,
      meta: {
        name: "使用自定义单元格渲染函数",
      },
    },
    {
      path: "cell-names",
      component: PlaceholderPage,
      meta: {
        name: "使用自定义单元格名",
      },
    },
  ],
};

export const advTables = {
  path: "advance-table",
  component: AnimateRouter,
  meta: {
    name: "表格的高级功能",
  },
  children: [
    {
      path: "filters-n-orders",
      component: PlaceholderPage,
      meta: {
        name: "筛选与排序",
      },
    },
    {
      path: "query",
      component: PlaceholderPage,
      meta: {
        name: "高级检索",
      },
    },
    {
      path: "query-relate-to-route",
      component: PlaceholderPage,
      meta: {
        name: "与路由双向绑定的高级检索",
      },
    },
    {
      path: "with-editor",
      component: PlaceholderPage,
      meta: {
        name: "带行编辑能力的表格",
      },
    },
    {
      path: "tables",
      component: PlaceholderPage,
      meta: {
        name: "关联表格",
      },
    },
  ],
};
