import bricks from "@ruff-web/brix";
import { App } from "vue";
import components from "./src/components";

export const TableWrapper = {
  Basic: components.BasicTableWrapper,
};
export const BasicTableWrapper = components.BasicTableWrapper;
export const ColumnHidableTableWrapper = components.ColumnHidableTableWrapper;
export const ColumnsGroupableTableWrapper =
  components.ColumnsGroupableTableWrapper;
export const CellsEmbeddedTableWrapper = components.CellsEmbeddedTableWrapper;

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks);
      app.component("RTableWrapper", BasicTableWrapper);
      app.component("RColHidableTwrapper", ColumnHidableTableWrapper);
      app.component("RColGroupableTwrapper", ColumnsGroupableTableWrapper);
      app.component("RCellsEmbedTwrapper", CellsEmbeddedTableWrapper);
      this._installed = true;
    }
    return app;
  },
};
