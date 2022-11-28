import bricks from "@ruff-web/brix";
import icons from "@ruff-web/icons";
import { App } from "vue";
import wrappers from "./src/components/item-wrappers";
import widgets from "./src/components/widgets";
import * as elements from "./src/utils/elements";

export const TooltipItem = wrappers.TooltipItem;
export const CustomFormItem = wrappers.CustomFormItem;
export const SelectableInput = widgets.SelectableInput;
export const CustomSelect = widgets.CustomSelect;
export const DateRangeSelect = widgets.DateRangeSelect;
export const FormWidget = elements.FormWidget;

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks);
      app.use(icons);
      app.component("RTooltipItem", TooltipItem);
      app.component("RFormItem", CustomFormItem);
      app.component("RSelectableInput", SelectableInput);
      app.component("RCustomSelect", CustomSelect);
      app.component("RDateRangeSelect", DateRangeSelect);
      app.component("RFormWidget", FormWidget);
      this._installed = true;
    }
    return app;
  },
};
