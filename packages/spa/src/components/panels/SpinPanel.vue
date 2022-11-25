<template>
  <a-spin :spinning="spinning" :indicator="indicator" wrapperClassName="riot-spin-panel">
    <box
      width="100%"
      height="100%"
      background="--primary-bgcolor"
      :padding="padding"
      overflow="auto"
    >
      <PermissionView :access-by="accessBy" :checkingText="permissionCheckingText">
        <template #unauth><slot name="no-permis"></slot></template>
        <slot></slot>
      </PermissionView>
    </box>
  </a-spin>
</template>
<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue/lib/icons";
import { h } from "vue";
import PermissionView from "../slots-views/PermissionView.vue";

const props = defineProps({
  padding: {
    type: [Number, String, Array],
    default: "--ms",
  },
  spinning: Boolean,
  accessBy: [Object, String, Number],
  permissionCheckingText: {
    type: String,
    default: "登录中...",
  },
});

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px",
  },
});
</script>

<style lang="scss">
.riot-spin-panel {
  width: 100%;
  height: 100%;

  .ant-spin-container {
    width: 100%;
    height: 100%;
  }
}
</style>
