<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />

    <r-panel>
      <box row justify-content="start">
        <a-button @click="getDeviceList5">指定数量(5)</a-button>
        <a-button @click="getDeviceList8n2">指定页长和页数 (8, 2)</a-button>
        <a-button @click="getDeviceListQ">筛选设备</a-button>
        <a-button @click="pickDeviceList">使用pick方法 (2231, 2232, 2166)</a-button>
        <a-button @click="clear">清空</a-button>
      </box>
      <JSONView read-only mode="tree" v-model="(list as any)"
    /></r-panel>
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import JSONView from "json-editor-vue";
import mdraw from "./resource-model.md?raw";
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

const getDeviceList5 = async () => {
  try {
    const res = await client.device.list(5);
    list.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const getDeviceList8n2 = async () => {
  try {
    const res = await client.device.list(8, 2);
    list.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const getDeviceListQ = async () => {
  try {
    const res = await client.device
      .query({ type: "Device", online: true })
      .query("sort=lastReport")
      .list();
    list.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const pickDeviceList = async () => {
  try {
    const res = await client.device.pick([2231, 2232, 2166]);
    list.value = res.$raw;
  } catch (error) {
    console.log(error);
  }
};

const clear = () => {
  list.value = [];
};
</script>
