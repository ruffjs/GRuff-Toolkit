<template>
  <r-scroll-page with-dir>
    <a-radio-group v-model:value="isMobileDevice">
      <a-radio-button :value="false">PC 端</a-radio-button>
      <a-radio-button :value="true">移动端</a-radio-button>
    </a-radio-group>
    <r-panel>
      <h4>视图</h4>
      <div
        class="table"
        :style="{
          width: isMobileDevice ? '375px' : '100%',
          height: isMobileDevice ? '576px' : 'auto',
        }"
      >
        <Hidable :isMobileDevice="isMobileDevice" />
      </div>
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
import { ref, onMounted, watch } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import Hidable from "@/components/tables/Hidable.vue";
import { delay } from "@ruff-web/utils/src/async";

const HighlightJS = hljsVuePlugin.component;

const isMobileDevice = ref(false);
const tpl = `

`;
const ts = `

`;
watch(isMobileDevice, async () => {
  await delay(1000);
  window.dispatchEvent(new Event("resize"));
});
onMounted(() => {
  // code.value = codes.autoHeightCode;
});
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 20px;
}
</style>
