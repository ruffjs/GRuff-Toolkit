import bricks from "@ruff-web/bricky";
import { App } from "vue";
import components from "./src/components";

export const TableWrapper = {
  Basic: components.BasicTableWrapper,
};
export const BasicTableWrapper = components.BasicTableWrapper;
export const ColumnHidableTableWrapper = components.ColumnHidableTableWrapper;
export const ColumnGroupedTableWrapper = components.ColumnGroupedTableWrapper;

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks);
      app.component("RTableWrapper", BasicTableWrapper);
      app.component("RColHidableTwrapper", ColumnHidableTableWrapper);
      app.component("RColGroupedTwrapper", ColumnGroupedTableWrapper);
      this._installed = true;
    }
    return app;
  },
};
