<template>
  <r-page :with-dir="['Gruff Tookkit', '首页']"> 这里会列出一些目录 </r-page>
</template>

<script setup lang="ts">
import usePageRoutes from "@ruff-web/spa/src/reactive/usePageRoutes";
import { onMounted } from "vue";

const { getRoutes } = usePageRoutes();
onMounted(() => {
  console.log(getRoutes());
});
</script>
