import bricks from "@ruff-web/bricks"
import { App } from "vue"
import components from "./src/components"

export const TableWrapper = {
  Basic: components.BasicTableWrapper,
}
export const BasicTableWrapper = components.BasicTableWrapper
export const VariableColumnsTableWrapper =
  components.VariableColumnsTableWrapper

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks)
      app.component("RTableWrapper", BasicTableWrapper)
      app.component("RVariColsTable", VariableColumnsTableWrapper)
      this._installed = true
    }
    return app
  },
}
