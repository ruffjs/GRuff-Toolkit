<template>
  <r-page :with-dir="['Gruff Tookkit', '首页']">
    <MarkdownView theme="dark" :value="text" />
  </r-page>
</template>

<script setup lang="ts">
import usePageRoutes from "@ruff-web/spa/src/traits/usePageRoutes";
import { onMounted } from "vue";
import MarkdownView from "@ruff-web/markdown-view";

import text from "./text.md?raw";

console.log("text", text);

const { getRoutes } = usePageRoutes();
onMounted(() => {
  console.log(getRoutes());
});
</script>
