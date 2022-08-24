<template>
  <box width="100%" height="100%" background="--primary-bgcolor" :padding="padding">
    <PermissionView :accessDesc="accessDesc" :checkingText="permissionCheckingText">
      <template #unauth><slot name="no-permis"></slot></template>
      <slot></slot>
    </PermissionView>
  </box>
</template>
<script setup lang="ts">
import PermissionView from "../slots-views/PermissionView.vue";

defineProps({
  padding: {
    type: [Number, String, Array],
    default: "--ms",
  },
  accessDesc: [Object, String, Number],
  permissionCheckingText: {
    type: String,
    default: "登录中...",
  },
});
</script>
