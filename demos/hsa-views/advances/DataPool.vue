<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />

    <r-panel>
      <box row justify-content="start">
        <a-button @click="createUser">创建用户</a-button>
        <a-button :disabled="!profile?.id" @click="modifyUserProfile"
          >修改用户信息</a-button
        >
        <a-button :disabled="!profile?.id" @click="deleteUser">删除用户</a-button>
      </box>

      <JSONView read-only mode="tree" v-model="(profile as any)"
    /></r-panel>
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import JSONView from "json-editor-vue";
import mdraw from "./data-pool.md?raw";
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

const createUser = async () => {
  try {
    const res = await client.user.query({ phone: "18620881237" }).list(1);
    if (res.length) {
      await client.user(res[0].id as number).drop();
    }
  } catch (error) {}
  profile.value = {};
  client.user
    .post({
      name: "Test User",
      phone: "18620881237",
      password: "string123",
      remark: "string",
      roleIds: [1],
      allProject: true,
    })
    .then(async (res) => {
      profile.value = res.$raw;
    })
    .catch((err) => {
      console.log("write data err", err);
    });
};

const deleteUser = () => {
  client
    .user(profile.value.id as number)
    .drop()
    .then(async (res) => {
      profile.value = {};
    })
    .catch((err) => {
      console.log("write data err", err);
    });
};

const modifyUserProfile = async () => {
  client
    .user(profile.value.id as number)
    .set({
      name: "Modified User",
      remark: "has been modified",
    })
    .then(async (res) => {
      profile.value = res.$raw;
    })
    .catch((err) => {
      console.log("write data error:", err);
    });
};
</script>
