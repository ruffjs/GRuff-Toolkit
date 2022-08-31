<template>
  <h4>Hello, Home Page</h4>
</template>

<script setup lang="ts">
import usePageRoutes from "@ruff-web/spa/src/traits/usePageRoutes";
import { onMounted } from "vue";

const { getRoutes, resetHomePage } = usePageRoutes();
onMounted(() => {
  console.log(getRoutes());
});
</script>
