import { App } from "vue";
import Icon from "./src/RuffIcon.vue";

export default {
  install(app: App<any>) {
    app.component(Icon.name, Icon);
    return app;
  },
};
