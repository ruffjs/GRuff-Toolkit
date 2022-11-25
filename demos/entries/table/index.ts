import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Demo from "./Demo.vue";
import TableWrappers from "@ruff-web/table-pro";
import tableCells from "@ruff-web/table-cells";

createApp(Demo).use(Antd).use(TableWrappers).use(tableCells).mount("#app");
