import bricks from "@ruff-web/brix";
import icons from "@ruff-web/icons";
import { App } from "vue";
import widgets from "./src/components/widgets";

export const SelectableInput = widgets.SelectableInput;
export const CustomSelect = widgets.CustomSelect;
export const DateRangeSelect = widgets.DateRangeSelect;

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks);
      app.use(icons);
      app.component("RSelectableInput", SelectableInput);
      app.component("RCustomSelect", CustomSelect);
      app.component("RDateRangeSelect", DateRangeSelect);
      this._installed = true;
    }
    return app;
  },
};
