<template>
  <div class="table-demo">
    <div class="table-demo-item">
      <h4 class="table-demo-name">1. 基于Http Client的手动更新表格</h4>
      <div class="table-demo-body">
        <UseCellsByNames :isMobileDevice="isMobileDevice" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
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
