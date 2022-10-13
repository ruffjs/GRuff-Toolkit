import { Component } from "vue";
import ThemePicker from "@ruff-web/spa/src/scaffolds/default/ThemePicker.vue";
import Account from "@ruff-web/spa/src/scaffolds/default/Account.vue";

export default [
  {
    type: "component",
    component: ThemePicker,
  },
  {
    type: "component",
    component: Account,
  },
] as ShotcutItem<Component>[];
