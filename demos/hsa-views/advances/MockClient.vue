<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />

    <r-panel>
      <box row justify-content="start">
        <a-button @click="genDevice">模拟单个设备(id: 444)</a-button>
        <a-button @click="clear">清空</a-button>
      </box>
      <JSONView read-only mode="tree" v-model="(item as any)" />

      <br />
      <box row justify-content="start">
        <a-button @click="genList">模拟设备列表(10 条)</a-button>
        <a-button @click="clear">清空</a-button>
      </box>
      <JSONView read-only mode="tree" v-model="(list as any)"
    /></r-panel>
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import JSONView from "json-editor-vue";
import mdraw from "./mock-client.md?raw";
import createClient from "@ruff-web/http/src/clients";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { getSPAContext } from "@ruff-web/spa/src/context";
import { ref } from "vue";
import resources from "@/hsa-utils/models/Device.model";

const { storage } = getSPAContext();
const client = createClient("ruffmock://", {
  resources,
});
client.beforeRequest = injectToken(() => storage.user.token);

const item = ref<any>({});
const list = ref<any[]>([]);

const genDevice = async () => {
  try {
    // console.log(resources);
    const res = await client.device.get(444);
    console.log(res.$raw);
    item.value = res.$raw;
  } catch (error) {}
};

const genList = async () => {
  try {
    // console.log(resources);
    const res = await client.device.list(10, 1);
    // console.log(res);
    list.value = res.$raw;
  } catch (error) {}
};

const clear = () => {
  list.value = [];
};
</script>
