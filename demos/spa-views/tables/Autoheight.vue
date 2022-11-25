<template>
  <r-scroll-page with-dir>
    <r-panel>
      <h4>视图</h4>
      <div class="table"><AutoHeightTable /></div>
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
import { onMounted } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import AutoHeightTable from "@/components/tables/AutoHeight.vue";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-table-wrapper :pagination="false">
    <template #default="{ scrollYConfig }">
      <a-table
        rowKey="id"
        :scroll="scrollYConfig"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :loading="false"
      >
      </a-table>
    </template>
  </r-table-wrapper>
`;
const ts = `
import { ref } from "vue";

defineProps({
  isMobileDevice: Boolean,
});

const columns: any = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const dataSource = ref([
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "3",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "4",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "5",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "6",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "7",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "8",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "9",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "10",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
]);
`;
onMounted(() => {
  // code.value = codes.autoHeightCode;
});
</script>
<style lang="scss" scoped>
.table {
  height: 400px;
  margin-bottom: 20px;
}
</style>
