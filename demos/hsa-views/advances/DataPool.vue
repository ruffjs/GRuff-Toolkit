<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />

    <r-panel>
      <a-button @click="fetchUserProfile">读取用户(uid: 1)信息</a-button>
      <a-button @click="mappingUserProfile">读取用户(uid: 2)信息并映射</a-button>
      <JSONView read-only mode="tree" v-model="(profile as any)" />
      <br />
      <a-button @click="fetchUserList">读取多个用户信息（ 6 条数据）</a-button>
      <JSONView read-only mode="tree" v-model="(list as any)" />
    </r-panel>
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
import DataPool from "@ruff-web/http/src/helpers/DataPool";
import { readonly } from "@ruff-web/data-mapping";

const { storage } = getSPAContext();
const client = createClient("/test-user-svc", {
  resources,
});
client.beforeRequest = injectToken(() => storage.user.token);

const userPool = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", "profile", DataPool.ITEM),
  client,
  mapping: {},
});
const accountPool = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", "profile", DataPool.ITEM),
  client,
  unmap: ["level", "type", "roles"],
  mapping: {
    uid: "id",
    name: readonly<any>("name"),
    mb: {
      get(data: any) {
        return "+86" + data.phone;
      },
      set(phone: string, data: any) {
        data.phone = phone;
      },
    },
  },
});
const usersPool = new DataPool({
  apiId: DataPool.formatApiId("api/v1/user", DataPool.LIST),
  client,
  mapping: {},
});

const profile = ref<any>({});
const list = ref<any[]>([]);

const fetchUserProfile = async () => {
  profile.value = {};
  try {
    const res = await userPool.read(1);
    // console.log(res);
    profile.value = res.getMapped();
  } catch (error) {}
};

const mappingUserProfile = async () => {
  // profile.value = {};
  try {
    const res = await accountPool.read(2);
    // console.log(res);
    profile.value = res.getMapped();
  } catch (error) {}
};

const fetchUserList = async () => {
  profile.value = {};
  try {
    const res = await usersPool.read({ pageSize: 6 });
    list.value = res.map((r) => r.getMapped());
  } catch (error) {}
};
</script>
