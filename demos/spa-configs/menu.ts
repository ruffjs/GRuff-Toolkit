export default [
  {
    key: "workspace/home",
    keys: ["workspace/home"],
    name: "首页",
    icon: "home-outlined",
    link: "/home",
  },
  {
    key: "workspace/page",
    name: "页面容器（子页面切换含动画）",
    icon: "snippets-outlined",
    children: [
      {
        key: "workspace/page/fixed",
        name: "固定高度页面",
        link: "/page/fixed",
      },
      {
        key: "workspace/page/scroll",
        name: "可滚动页面",
        link: "/page/realtime",
      },
      {
        key: "workspace/page/with-header-std",
        name: "含通用头部的页面",
        link: "/page/with-header-std",
      },
      {
        key: "workspace/page/with-header-auto",
        name: "含通用头部的页面（自动）",
        link: "/page/with-header-auto",
      },
      {
        key: "workspace/page/with-header-custom",
        name: "含自定义头部的页面",
        link: "/page/with-header-custom",
      },
      {
        key: "workspace/page/with-auth-route",
        name: "需要访问权限的页面（路由级）",
        link: "/page/with-auth-route",
      },
      {
        key: "workspace/page/with-auth-page",
        name: "需要访问权限的页面（页面容器级）",
        link: "/page/with-auth-page",
      },
      {
        key: "workspace/page/404",
        name: "工作区404",
        link: "/page/404",
      },
    ],
  },
  {
    key: "workspace/container",
    name: "其他SPA容器",
    icon: "snippets-outlined",
    children: []
  },
  {
    key: "workspace/table",
    name: "表格组件与单元格组件",
    icon: "table-outlined",
    children: [
      {
        key: "workspace/table/autoheight",
        name: "自动高度表格容器",
        link: "/table/autoheight",
      },
      {
        key: "workspace/table/pagination",
        name: "带有分页的表格",
        link: "/table/pagination",
      },
      {
        key: "workspace/table/hidable-columns",
        name: "按条件隐藏列表",
        link: "/table/hidable-columns",
      },
      {
        key: "workspace/table/group-columns/1",
        name: "对列进行分组 v1",
        link: "/table/group-columns/1",
      },
      {
        key: "workspace/table/group-columns/2",
        name: "对列进行分组 v2",
        link: "/table/group-columns/2",
      },
      {
        key: "workspace/table/cells",
        name: "使用自定义单元格组件",
        link: "/table/cells",
      },
      {
        key: "workspace/table/cellrenders",
        name: "使用自定义单元格渲染函数",
        link: "/table/cellrenders",
      },
      {
        key: "workspace/table/cellnames",
        name: "使用自定义单元格名",
        link: "/table/cellnames",
      },
    ],
  },
  {
    key: "workspace/form",
    name: "表单组件与表单处理",
    icon: "form-outlined",
    children: [
      // {
      //   key: "workspace/form/",
      //   name: "",
      //   link: "/form/",
      // },
    ],
  },
  {
    key: "workspace/advance-table",
    name: "表格的高级功能",
    icon: "insert-row-above-outlined",
    children: [
      {
        key: "workspace/advance-table/filters-n-orders",
        name: "筛选与排序",
        link: "/advance-table/filters-n-orders",
      },
      {
        key: "workspace/advance-table/query",
        name: "高级检索",
        link: "/advance-table/query",
      },
      {
        key: "workspace/advance-table/querybyroute",
        name: "与路由双向绑定的高级检索",
        link: "/advance-table/querybyroute",
      },
      {
        key: "workspace/advance-table/with-editor",
        name: "带行编辑能力的表格",
        link: "/advance-table/with-editor",
      },
      {
        key: "workspace/advance-table/tables",
        name: "关联表格",
        link: "/advance-table/tables",
      },
    ],
  },
  {
    key: "workspace/entities",
    name: "预设配置与实体组件",
    icon: "appstore-outlined",
    children: [
      {
        key: "workspace/entities/user-table",
        name: "用户数据表格",
        link: "/entities/user-table",
      },
      {
        key: "workspace/entities/resort-cols",
        name: "调整实体表格的列序",
        link: "/entities/resort-cols",
      },
      {
        key: "workspace/entities/rewrite-cols",
        name: "覆写实体组件的列定义",
        link: "/entities/rewrite-cols",
      },
      {
        key: "workspace/entities/user-form",
        name: "用户表单",
        link: "/entities/user-form",
      },
      {
        key: "workspace/entities/rewrite-user-form",
        name: "调整用户表单",
        link: "/entities/rewrite-user-form",
      },
      {
        key: "workspace/entities/data-view",
        name: "使用DataView展示和编辑用户",
        link: "/entities/data-view",
      },
      {
        key: "workspace/entities/others",
        name: "其它实体表格与表单",
        link: "/entities/others",
      },
      {
        key: "workspace/entities/widgets",
        name: "其它小组件",
        link: "/entities/widgets",
      },
    ],
  },
  {
    key: "workspace/others",
    name: "其它工具",
    icon: "ellipsis-outlined",
    children: [
      {
        key: "workspace/others/csv",
        name: "CSV导入导出",
        link: "/others/csv",
      },
      {
        key: "workspace/others/icons",
        name: "集成图标库",
        link: "/others/icons",
      },
      {
        key: "workspace/others/xrender",
        name: "XRender Vue Plus",
        link: "/others/xrender",
      },
    ],
  },
] as RuffSPAMenuItem[];
