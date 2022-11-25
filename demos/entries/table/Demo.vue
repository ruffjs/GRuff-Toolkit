<template>
  <div class="table-demo">
    <div class="table-demo-item">
      <h4 class="table-demo-name">1. 自动高度</h4>
      <div class="table-demo-body">
        <AutoHeight :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">2. 自动高度 + 分页</h4>
      <div class="table-demo-body">
        <WithPagination :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">3. 自动高度 + 单元格组件</h4>
      <div class="table-demo-body">
        <UseCells :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">4. 自动高度 + 注入式单元格组件</h4>
      <div class="table-demo-body">
        <UseCellsByInjection :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">5. 自动高度 + 可隐藏列</h4>
      <div class="table-demo-body">
        <Hidable :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">6. 自动高度 + 列分组</h4>
      <div class="table-demo-body">
        <GroupColumns :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">7. 自动高度 + 使用糖函数简化分组配置</h4>
      <div class="table-demo-body">
        <GroupColumnsWithSugar :isMobileDevice="isMobileDevice" />
      </div>
    </div>

    <div class="table-demo-item">
      <h4 class="table-demo-name">8. 自动高度 + 申明式，列可隐藏、可分组单元格组件</h4>
      <div class="table-demo-body">
        <UseCellsByNames :isMobileDevice="isMobileDevice" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import AutoHeight from "@/components/tables/AutoHeight.vue";
import WithPagination from "@/components/tables/WithPagination.vue";
import UseCells from "@/components/tables/UseCells.vue";
import Hidable from "@/components/tables/Hidable.vue";
import GroupColumns from "@/components/tables/GroupColumns.vue";
import GroupColumnsWithSugar from "@/components/tables/GroupColumnsWithSugar.vue";
import UseCellsByInjection from "@/components/tables/UseCellsByInjection.vue";
import UseCellsByNames from "@/components/tables/UseCellsByNames.vue";

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
