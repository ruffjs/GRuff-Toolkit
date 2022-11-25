<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />
  </r-page>
</template>

<script setup lang="ts">
import usePageRoutes from "@ruff-web/spa/src/reactive/usePageRoutes";
import { onMounted } from "vue";
import MarkdownView from "@ruff-web/markdown-view";

import mdraw from "./about.md?raw";

// const { getRoutes } = usePageRoutes();
// onMounted(() => {
//   console.log(getRoutes());
// });
</script>
