<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in computedPath">
      <router-link v-if="item.to" :to="item.to">
        <txt :line-height="19" color="var(--primary-color)">{{ item.name }}</txt>
      </router-link>
      <txt v-else :line-height="19" color="var(--primary-color)">{{ item.name }}</txt>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed, Ref } from "vue";
import { useRoute } from "vue-router";

type PathItem = {
  name: string;
  to: string;
};

const route = useRoute();
const props = defineProps({
  path: Array as () => Array<string[] | string>,
});

const computedPath: Ref<PathItem[]> = computed(() => {
  if (props.path) {
    const path: PathItem[] = [];
    props.path.forEach((item) => {
      if (typeof item === "string") {
        path.push({ name: item, to: "" });
      } else if (typeof item === "object" && item instanceof Array) {
        const [name, to] = item;
        path.push({ name, to });
      }
    });
    return path;
  }
  return route.matched
    .map((item) => {
      if (item.meta) {
        const name = item.meta.name || item.meta._ruff_spa_shortName || "";
        if (name && item.meta.navto) {
          return {
            name,
            to: item.meta.navto,
          };
        } else if (name) {
          return { name, to: "" };
        }
      }
    })
    .filter((item) => item !== undefined) as PathItem[];
});
</script>
