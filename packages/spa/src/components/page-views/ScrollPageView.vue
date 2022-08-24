<template>
  <box :flex="1" width="100%" height="calc(100vh - 64px)">
    <box v-if="withDir" width="100%">
      <WithDirHeader
        :dir-path="withDir === true ? undefined : withDir"
        :title="title"
        :back="back || false"
        ><template #title> <slot name="title" /> </template
        ><template #right> <slot name="header-right" /> </template
      ></WithDirHeader>
    </box>

    <b-scroll-box flex="1" width="100%" :height="withDir ? 'calc(100% - 80px)' : '100%'">
      <box v-if="!withDir">
        <slot name="header" />
      </box>
      <box :flex="1" :padding="mainPadding">
        <PermissionView :accessDesc="accessDesc" :checkingText="permissionCheckingText">
          <template #unauth><slot name="no-permis"></slot></template>
          <slot></slot>
        </PermissionView>
      </box>
    </b-scroll-box>
  </box>
</template>

<script setup lang="ts">
import WithDirHeader from "../page-headers/WithDirHeader.vue";
import PermissionView from "../slots-views/PermissionView.vue";
defineProps({
  withDir: {
    type: [Boolean, Array as () => Array<string[] | string>],
    default: false,
  },
  title: String,
  back: Boolean,
  mainPadding: {
    type: [Number, String, Array],
    default: [0, "--ms", "--ms"],
  },
  accessDesc: [Object, String, Number],
  permissionCheckingText: {
    type: String,
    default: "登录中...",
  },
});
</script>
<style lang="scss" scoped></style>
