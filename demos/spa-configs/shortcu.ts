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
    name: "Test",
    icon: "bell-outlined",
    selected: "",
    items: [
      {
        key: "a",
        onclick: () => {},
        name: "Item A",
      },
      {
        key: "b",
        onclick: () => {},
        name: "Item B",
      },
      {
        key: "c",
        onclick: () => {},
        name: "Item C",
      },
      {
        key: "d",
        onclick: () => {},
        name: "Item D",
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
