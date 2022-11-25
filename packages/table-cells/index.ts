import bricks from "@ruff-web/brix";
import { App } from "vue";
import components from "./src/components";

export default {
  ...components,
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.use(bricks);
      app.component("RTcellHiddens", components.HiddenCells);
      app.component("RTcellActions", components.Actions);
      app.component("RTcellLink", components.Link);
      app.component("RTcellTooltip", components.WithTooltipCell);
      this._installed = true;
    }
    return app;
  },
};
