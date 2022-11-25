<template>
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
</template>

<script lang="ts" setup>
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
</script>
