<template>
  <ConfigProvider :locale="zhCN">
    <r-app name="GRuff Demos">
      <r-scaffold name="GRuff Demos" :menu="menu" :shotcuts="shortcuts">
        <template #memu>当配置了menu属性时优先应用menu属性进行渲染</template>
      </r-scaffold>
    </r-app>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import menu from "./spa-configs/menu";
import shortcuts from "./spa-configs/shortcu";
</script>
