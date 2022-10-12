import context from "@/hsa-configs/ctx";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { createApp } from "vue";
import App from "./HttpSharingSPA.vue";
import clients from "./http/clients";

const storage = context.storage as any
console.log(storage, storage.user.token)
if (storage.user.token) {
    clients.user.beforeRequest = injectToken((req) => storage.user.token)
    createApp(App).use(context).mount("#app");
} else {
    clients.user.login({
        payload: {
            loginName: "demo",
            password: "123456",
            clientType: "Web",
        },
    }).then(async (resp) => {
        console.log(resp.data)
        const { token, info } = resp.data
        storage.user.token = token
        storage.user.uid = info.id
        clients.user.beforeRequest = injectToken((req) => token)
        createApp(App).use(context).mount("#app");
    }).catch(err => {
        console.log('busHub.login err:', err, err.toJSON())
    });
}