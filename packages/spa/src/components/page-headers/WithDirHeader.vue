<template>
  <box :padding="paddings.outer">
    <box
      height="70"
      background="--primary-bgcolor"
      :padding="paddings.inner"
      style="position: relative"
    >
      <Breadcrumb :path="dirPath" />
      <box row>
        <slot v-if="props.title === '#'" name="title"></slot>
        <a
          v-else-if="props.back === true"
          class="breadcrumb-back"
          @click="handleRouteBack"
        >
          <slot v-if="props.title === '#'" name="title"></slot>
          <txt v-else class="ruff-sub-title1">
            <b-icon type="left-outlined" />{{ computedTitle }}
          </txt>
        </a>
        <router-link
          v-else-if="typeof props.back === 'string'"
          :to="props.back"
          class="breadcrumb-back"
        >
          <txt class="ruff-sub-title1">
            <b-icon type="left-outlined" />{{ computedTitle }}
          </txt>
        </router-link>

        <txt v-else class="ruff-sub-title1">{{ computedTitle }}</txt>
      </box>
      <abs-box top="0" right="0">
        <slot name="right"></slot>
      </abs-box>
    </box>
  </box>
</template>
<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "../crumbs/Breadcrumb.vue";

const route = useRoute();
const props = defineProps({
  dirPath: Array as () => Array<string[] | string>,
  title: String,
  back: {
    type: [Boolean, String],
    default: false,
  },
  asBanner: Boolean,
});

const router = useRouter();
const paddings = reactive({
  outer: ["--s", 0, 0],
  inner: ["--s", "--ms"],
});
const computedTitle = computed(() => {
  if (props.title) {
    return props.title;
  } else {
    let names: string[] = [];
    if (props.dirPath) {
      names = props.dirPath.map((item) => {
        if (typeof item === "string") {
          return item;
        } else if (typeof item === "object" && item instanceof Array) {
          return item[0] || "";
        } else {
          return "";
        }
      });
    } else {
      names = route.matched.map((item) => {
        if (item.meta) {
          return item.meta.name || item.meta._ruff_spa_shortName || "";
        }
        return "";
      }) as string[];
    }
    return names.filter((name) => name).reverse()[0] || "(页面标题)";
  }
});

watch(
  props,
  () => {
    // console.log(props.title, props.dirPath, props.back);
    if (props.asBanner) {
      paddings.outer = ["--s", 0, 0];
      paddings.inner = ["--s", "--ms"];
    } else {
      paddings.outer = ["--s", "--ms"];
      paddings.inner = ["--s", "--ms"];
    }
  },
  {
    immediate: true,
  }
);

const handleRouteBack = () => {
  router.back();
};
</script>
<style lang="scss">
.ant-breadcrumb-separator {
  color: var(--primary-color);
}
</style>
