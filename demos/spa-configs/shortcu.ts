import { Component } from "vue";
import ThemePicker from "@ruff-web/spa/src/scaffolds/default/ThemePicker.vue";
import Account from "@ruff-web/spa/src/scaffolds/default/Account.vue";

export default [
  {
    type: "link",
    link: "/notice",
    icon: "bell-outlined",
    name: "",
  },
  {
    type: "dropdown",
    name: "自定义下拉",
    icon: "bell-outlined",
    selected: "",
    items: [
      {
        key: "a",
        onclick: () => {
          alert("点击了按钮 1");
        },
        name: "按钮 1",
      },
      {
        key: "b",
        onclick: () => {
          alert("点击了按钮 2");
        },
        name: "按钮 2",
      },
      {
        key: "c",
        onclick: () => {
          alert("点击了按钮 3");
        },
        name: "按钮 3",
      },
      {
        key: "d",
        onclick: () => {
          alert("点击了按钮 4");
        },
        name: "按钮 4",
      },
    ],
  },
  {
    type: "component",
    component: ThemePicker,
  },
  {
    type: "component",
    component: Account,
  },
] as ShotcutItem<Component>[];
