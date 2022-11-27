<template>
  <r-scroll-page with-dir>
    <r-panel>
      <box width="400" :margin="[20, 'auto']">
        <r-selectable-input
          :fields="searchFields"
          :data="searchData"
          show-button
          @change="handleChange"
          @serach="handleSearch"
      /></box>
      <box width="400" :margin="[20, 'auto']">
        <r-selectable-input
          :fields="searchFields"
          :data="searchData"
          @change="handleChange"
          @serach="handleSearch"
      /></box>
      <h4>模板代码</h4>
      <div class="code">
        <HighlightJS language="html" :code="tpl" />
      </div>
      <h4>业务脚本</h4>
      <div class="code">
        <HighlightJS language="ts" :code="ts" />
      </div>
    </r-panel>
  </r-scroll-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<box width="400" :margin="[20, 'auto']">
  <r-selectable-input
    :fields="searchFields"
    :data="searchData"
    show-button
    @change="handleChange"
    @serach="handleSearch"
/></box>
<box width="400" :margin="[20, 'auto']">
  <r-selectable-input
    :fields="searchFields"
    :data="searchData"
    @change="handleChange"
    @serach="handleSearch"
/></box>
`;
const ts = `
const searchFields = [
  {
    field: "sn",
    name: "编号",
    placeholder: "搜索编号",
    default: "",
  },
  {
    field: "name",
    name: "名称",
    placeholder: "搜索名称",
    default: "",
  },
];
const searchData = ref(["sn", ""]);

const handleChange = (valuse: Record<string, string>, field: string) => {
  searchData.value = [field, valuse[field]];
};

const handleSearch = (valuse: string[], field: string) => {
  ...
};
`;

const searchFields = [
  {
    field: "sn",
    name: "编号",
    placeholder: "搜索编号",
    default: "",
  },
  {
    field: "name",
    name: "名称",
    placeholder: "搜索名称",
    default: "",
  },
];
const searchData = ref(["sn", ""]);

const handleChange = (valuse: Record<string, string>, field: string) => {
  searchData.value = [field, valuse[field]];
};

const handleSearch = (valuse: string[], field: string) => {
  console.log(searchData.value);
  if (searchData.value[0]) {
    alert(`search ${searchData.value[0]}`);
  }
};
</script>

<style></style>
