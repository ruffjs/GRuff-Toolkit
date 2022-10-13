<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="text" />
  </r-page>
</template>

<script setup lang="ts">
import usePageRoutes from "@ruff-web/spa/src/traits/usePageRoutes";
import { onMounted } from "vue";
import MarkdownView from "@ruff-web/markdown-view";

import text from "./startup.md?raw";

const { getRoutes } = usePageRoutes();
onMounted(() => {
  console.log(getRoutes());
});
</script>
