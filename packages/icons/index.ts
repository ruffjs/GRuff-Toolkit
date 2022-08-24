import { App } from "vue"
import Icon from "./src/Icon.vue"

export default {
  install(app: App<any>) {
    app.component(Icon.name, Icon)
    return app
  },
}
