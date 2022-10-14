<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import mdraw from "./friendly-api.md?raw";
import createClient from "@ruff-web/http/src/clients";
import resources from "../../hsa-utils/configs/test-user-svc";
import resources2 from "../../hsa-utils/configs/test-dev-svc";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { getSPAContext } from "@ruff-web/spa/src/context";

const { storage } = getSPAContext();
const client = createClient("/test-user-svc", {
  resources,
});
client.beforeRequest = injectToken(() => storage.user.token);
const client2 = createClient("/test-user-svc", {
  resources: resources2,
});
client2.beforeRequest = injectToken(() => storage.user.token);

class User {
  id!: number;
  name!: string;
}

class Device {
  id!: number;
  name!: string;
}

const userProvider = client.user.$getFriendlyProvider<
  "loginLog" | "token",
  "login" | "loginBySmsCode",
  "profile" | "password" | "bindPhone",
  "doSth1" | "doSth2",
  User
>();

const unreached = async () => {
  try {
    userProvider.loginLog;

    userProvider.login;

    userProvider(1).profile;

    userProvider(1).doSth1;

    const user = await userProvider.get(1);

    user.id;

    user.name;

    user.password;

    user.doSth2;

    const device = await client2.device(2153).get<Device>();

    device.name;
  } catch (error) {}
};
</script>
