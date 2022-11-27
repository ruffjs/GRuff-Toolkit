<template>
  <r-scroll-page with-dir>
    <r-panel>
      <h4>视图</h4>
      <div class="table"><WithPagination /></div>
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
import WithPagination from "@/components/tables/WithPagination.vue";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-table-wrapper
    :pagination="pagination"
    @pageChange="handlePageChange"
    @pageSizeChange="handlePageSizeChange"
  >
    <template #default="{ bodyHeight: y, scrollYConfig }">
      <a-table
        rowKey="id"
        :data-y="y"
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
import { reactive, ref } from "vue";

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
]);

const pagination = reactive({
  current: 2,
  pageSize: 10,
  pageSizeOptions: ["5", "10", "20"],
  total: 50,
});

const handlePageChange = (current: number) => {
  // console.log("handlePageChange", current);
  pagination.current = current;
};

const handlePageSizeChange = (current: number, pageSize: number) => {
  console.log("handlePageSizeChange", current, pageSize);
};
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
