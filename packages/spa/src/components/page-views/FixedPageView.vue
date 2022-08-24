<template>
  <box :flex="1" width="100%" height="calc(100vh - 64px)" overflow="hidden">
    <box width="100%" :height="headHeight" overflow="hidden">
      <WithDirHeader
        v-if="withDir"
        :dir-path="withDir === true ? undefined : withDir"
        :title="title"
        :back="back || false"
        ><template #title> <slot name="title" /> </template
        ><template #right> <slot name="header-right" /> </template
      ></WithDirHeader>
      <slot v-else name="header" />
    </box>

    <box :flex="1" :padding="mainPadding" width="100%" :height="bodyHeight">
      <PermissionView :accessDesc="accessDesc" :checkingText="permissionCheckingText">
        <template #unauth><slot name="no-permis"></slot></template> <slot></slot>
      </PermissionView>
    </box>
  </box>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import WithDirHeader from "../page-headers/WithDirHeader.vue";
const props = defineProps({
  headerHeight: {
    type: [Number, String],
    default: "auto",
    required: false,
    validator(value) {
      if (typeof value === "number" && value >= 0) {
        return true;
      }
      if (typeof value === "string" && value === "auto") {
        return true;
      }
      return false;
    },
  },
  withDir: {
    type: [Boolean, Array as () => Array<string[] | string>],
    default: false,
  },
  title: String,
  back: [Boolean, String],
  mainPadding: {
    type: [Number, String, Array],
    default: ["--ms", "--ms"],
  },
  accessDesc: [Object, String, Number],
  permissionCheckingText: {
    type: String,
    default: "登录中...",
  },
});
const headHeight = ref("0");
const bodyHeight = ref("100%");

watch(
  props,
  () => {
    let headerHeight = props.headerHeight;
    if (props.withDir) {
      headerHeight = 80;
    }
    if (typeof headerHeight === "number") {
      headHeight.value = `${headerHeight}px`;
      bodyHeight.value = headerHeight ? `calc(100% - ${headerHeight + 10}px)` : "100%";
    } else {
      headHeight.value = "auto";
      headHeight.value = "auto";
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped></style>
