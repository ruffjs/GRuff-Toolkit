<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />

    <r-panel>
      <box row justify-content="start">
        <a-button @click="getUserProfile">获取用户（id: 1）的用户信息</a-button>
        <a-button @click="getUsersProfile"
          >通过IHttpPackagedResource获取用户信息</a-button
        >
        <a-button @click="clear">清空</a-button>
      </box>
      <JSONView read-only mode="tree" v-model="(profile as any)"
    /></r-panel>
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import JSONView from "json-editor-vue";
import mdraw from "./data-mock.md?raw";
import createClient from "@ruff-web/http/src/clients";
import resources from "../../hsa-utils/configs/test-user-svc";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { getSPAContext } from "@ruff-web/spa/src/context";
import { ref } from "vue";

const { storage } = getSPAContext();
const client = createClient("/test-user-svc", {
  resources,
});
client.beforeRequest = injectToken(() => storage.user.token);

const profile = ref<any>({});

const getUserProfile = async () => {
  try {
    const res = await client.user(1).profile.get();
    // const res = await client.user(1).profile();
    profile.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const getUsersProfile = async () => {
  try {
    for (const user of await client.user.list(1, 3)) {
      console.log(user);
      const res = await user.profile();
      profile.value = res.$raw;
    }
  } catch (error) {
    console.log(error);
  }
};

const clear = () => {
  profile.value = {};
};
</script>
