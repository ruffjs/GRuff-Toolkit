import { createApp } from "vue"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import Demo from "./Demo.vue"
import TableWrapper from "@ruff-web/table-wrappers"
import tableCells from "@ruff-web/table-cells"

createApp(Demo).use(Antd).use(TableWrapper).use(tableCells).mount("#app")