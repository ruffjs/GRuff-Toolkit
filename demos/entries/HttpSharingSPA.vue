<template>
  <ConfigProvider :locale="zhCN">
    <r-app name="Http Client Sharing">
      <r-scaffold
        name="Http Client Sharing"
        :menu="menu"
        :menu-width="256"
        :top-height="50"
        :shotcuts="shortcuts"
      />
    </r-app>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import { menu } from "../hsa-configs/pages";
import shortcuts from "../hsa-configs/shortcu";
</script>
