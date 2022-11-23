<template>
  <div class="table-demo">
    <div class="table-demo-item">
      <h4 class="table-demo-name">1. 基于Http Client获取表格数据</h4>
      <div class="table-demo-body">
        <TableWithHttpClient :isMobileDevice="isMobileDevice" />
      </div>
    </div>
    <div class="table-demo-item">
      <h4 class="table-demo-name">2. 基于Http Client DataPool获取表格数据</h4>
      <div class="table-demo-body">
        <TableWithDataPool :isMobileDevice="isMobileDevice" />
      </div>
    </div>
    <div class="table-demo-item">
      <h4 class="table-demo-name">3. 基于Http Client DataPool更新表格数据 + 分页</h4>
      <div class="table-demo-body">
        <TableDataController :isMobileDevice="isMobileDevice" />
      </div>
    </div>
    <div class="table-demo-item">
      <h4 class="table-demo-name">4. 使用过滤表单</h4>
      <div class="table-demo-body">
        <TableWithDataPool :isMobileDevice="isMobileDevice" />
      </div>
    </div>
    <div class="table-demo-item">
      <h4 class="table-demo-name">5. 使用集成于模型的网络与表格配置</h4>
      <div class="table-demo-body">
        <TableWithDataPool :isMobileDevice="isMobileDevice" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import TableWithHttpClient from "@/components/tables/TableWithHttpClient.vue";
import TableWithDataPool from "@/components/tables/TableWithDataPool/index.vue";
import TableDataController from "@/components/tables/TableDataController/Pagination.vue";

const isMobileDevice = ref(window.screen.availWidth <= 576);
const onWindowResize = () => {
  if (window.screen.availWidth <= 576) {
    isMobileDevice.value = true;
  } else {
    isMobileDevice.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", onWindowResize);
  const symbol = Symbol("test");
  const a: {
    [symbol]?: string;
  } = {
    [symbol]: "foo",
  };
  const b = {
    ...a,
  };
  const c = {
    [symbol]: "bar",
    ...a,
  };

  console.log("test if symbol can be merged", b, c);
});
onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});
</script>

<style lang="scss">
.table-demo {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  background-color: black;
  overflow-y: auto;

  .table-demo-item {
    position: relative;
    width: 1200px;
    max-width: 96vw;
    height: 520px;
    max-height: 96vh;
    margin: 0 auto 50px;
    background-color: white;
    padding: 20px;
    border-radius: 20px;

    .table-demo-name {
      height: 20px;
      line-height: 20px;
    }

    .table-demo-body {
      position: relative;
      width: 100%;
      height: 460px;
    }
  }
}
</style>
