<template>
  <r-table-wrapper :pagination="false">
    <template #default="{ bodyHeight: y, scrollYConfig }">
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
</template>

<script lang="ts" setup>
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
</script>
