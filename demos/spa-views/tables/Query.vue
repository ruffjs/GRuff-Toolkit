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

`;
const ts = `

`;
</script>

<style lang="scss" scoped>
.table {
  height: 400px;
  margin-bottom: 20px;
}
</style>
