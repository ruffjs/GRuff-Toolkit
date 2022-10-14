<template>
  <r-page main-padding="--ms">
    <MarkdownView theme="dark" :value="mdraw" />
  </r-page>
</template>

<script setup lang="ts">
import MarkdownView from "@ruff-web/markdown-view";
import mdraw from "./data-mock.md?raw";
</script>
