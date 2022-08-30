export default [
  {
    key: "workspace/home",
    keys: ["workspace/home"],
    name: "首页",
    icon: "home-outlined",
    link: "/home",
  },
  {
    key: "workspace/monitor",
    name: "页面容器",
    icon: "snippets-outlined",
    children: [
      {
        key: "workspace/pages/fixed",
        name: "固定高度页面",
        link: "/pages/fixed",
      },
      {
        key: "workspace/pages/scroll",
        name: "可滚动页面",
        link: "/pages/realtime",
      },
      {
        key: "workspace/pages/realtime",
        name: "含通用头部的页面",
        link: "/pages/realtime",
      },
      {
        key: "workspace/pages/realtime",
        name: "含通用头部的页面（自动）",
        link: "/pages/realtime",
      },
      {
        key: "workspace/pages/realtime",
        name: "含自定义头部的页面",
        link: "/pages/realtime",
      },
    ],
  },
] as RuffSPAMenuItem[];
