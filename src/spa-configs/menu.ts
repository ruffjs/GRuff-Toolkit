export default [
  {
    key: "workspace/monitor",
    name: "储罐监控",
    icon: "fund-outlined",
    children: [
      {
        key: "workspace/monitor/history",
        keys: ["workspace/monitor/history", "workspace/monitor/history/:id"],
        name: "远程监控",
        link: "/monitor/history",
      },
      {
        key: "workspace/monitor/realtime",
        keys: ["workspace/monitor/realtime", "workspace/monitor/realtime/:id"],
        name: "实时液位",
        link: "/monitor/realtime",
        accessDesc: {
          roles: ["PM"],
        },
      },
    ],
  },
  {
    key: "workspace/device",
    keys: ["workspace/device", "workspace/device/list", "workspace/device/:id"],
    name: "设备运维",
    icon: "appstore-outlined",
    accessDesc: {
      roles: ["PM"],
    },
    link: "/device",
  },
  {
    key: "workspace/setting",
    name: "基础配置",
    icon: "setting-outlined",
    children: [
      {
        key: "workspace/setting/site",
        keys: ["workspace/setting/site", "workspace/setting/site/:id"],
        name: "站点管理",
        link: "/setting/site/",
      },
      {
        key: "workspace/setting/user",
        keys: ["workspace/setting/user", "workspace/setting/user/:id"],
        name: "用户管理",
        link: "/setting/user",
      },
    ],
  },
] as RuffSPAMenuItem[];
