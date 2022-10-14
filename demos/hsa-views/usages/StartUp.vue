<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />
    <r-panel>
      <a-button @click="getDeviceList">查询设备列表</a-button>
      <JSONView read-Only mode="tree" v-model="(list as any)" />

      <br />

      <a-button @click="getDeviceItem">查询设备（id: 2153）的信息</a-button>
      <JSONView read-only mode="tree" v-model="(item as any)" />

      <br />

      <a-button @click="clear">重置</a-button>
    </r-panel>
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import JSONView from "json-editor-vue";
import mdraw from "./start-up.md?raw";
import createClient from "@ruff-web/http/src/clients";
import resources from "../../hsa-utils/configs/test-dev-svc";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { getSPAContext } from "@ruff-web/spa/src/context";
import { ref } from "vue";

const { storage } = getSPAContext();
const client = createClient("/test-dev-svc", {
  resources,
});
client.beforeRequest = injectToken(() => storage.user.token);

const list = ref<any[]>([]);
const item = ref<any>({});

const getDeviceList = async () => {
  try {
    const res = await client.device.list();
    list.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const getDeviceItem = async () => {
  try {
    // const res = await client.device.get(2153);
    const res = await client.device(2153).get();
    item.value = res.$raw;
  } catch (error) {}
};

const clear = () => {
  list.value = [];
  item.value = {};
};
</script>
