<template>
  <ConfigProvider :locale="zhCN">
    <r-app name="Ruff 储罐监测系统">
      <r-scaffold name="Ruff 储罐监测系统" :menu="menu" :shotcuts="[]">
        <template #memu>当配置了menu属性时优先应用menu属性进行渲染</template>
      </r-scaffold>
    </r-app>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import menu from "./configs/menu";
</script>
