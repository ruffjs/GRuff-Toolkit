import context from "@/spa-configs/ctx";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { createApp } from "vue";
import App from "./SPA.vue";
import clients from "./http/clients";

const storage = context.storage as any;
const store = context.store;
if (storage.token) {
  clients.user.beforeRequest = injectToken((req) => storage.token);
  createApp(App).use(context).mount("#app");
} else {
  clients.user
    .login({
      payload: {
        loginName: "demo",
        password: "123456",
        clientType: "Web",
      },
    })
    .then(async (resp) => {
      const { token, info } = resp.data;
      storage.user.token = store.state.user.token = token;
      storage.user.uid = info.id;
      clients.user.beforeRequest = injectToken((req) => token);
      createApp(App).use(context).mount("#app");
    })
    .catch((err) => {
      console.log("busHub.login err:", err, err.toJSON());
    });
}
