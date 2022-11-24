import { App } from "vue"

import Box from "./src/boxes/Box.vue"
import AbsoluteBox from "./src/boxes/AbsoluteBox.vue"
import Touchable from "./src/boxes/Touchable.vue"
import ScrollBox from "./src/boxes/ScrollBox.vue"
import Text from "./src/texts/Text.vue"

export default {
  _installed: false,
  install(app: App<any>) {
    if (this._installed === false) {
      app.component("Box", Box)
      app.component("BBox", Box)
      app.component("AbsBox", AbsoluteBox)
      app.component("BAbsoluteBox", AbsoluteBox)
      app.component("BTouchable", Touchable)
      app.component("BScrollBox", ScrollBox)
      app.component("Txt", Text)
      app.component(Text.name, Text)
      this._installed = true
    }
    return app
  },
}
