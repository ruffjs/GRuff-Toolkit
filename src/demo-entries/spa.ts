import runtime from "@/spa-configs/runtime";
import { createApp } from "vue";
import App from "../App.vue";

createApp(App).use(runtime).mount("#app");
