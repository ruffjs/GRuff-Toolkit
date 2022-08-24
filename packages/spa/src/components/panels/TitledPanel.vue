<template>
  <box flex="1" height="100%" background="--primary-bgcolor">
    <box
      row
      :height="titleHeight ? titleHeight : 35"
      :border-bottom="grayLine && grayLine !== 'none' ? '--border-10' : '--border-0'"
      items="center"
      :padding="[0, '--s']"
      cursor="default"
    >
      <box flex="1" width="0" justify="center">
        <box
          v-if="blueLine"
          height="--body2"
          :borderLeft="
            blueLine === 'bold'
              ? ['solid', '--xs', '-highlight-color']
              : ['solid', '-xxs', '-highlight-color']
          "
          padding-left="--xs"
        >
          <txt
            line-height="--body2"
            :size="size === 'l' ? '--body-l' : size === 's' ? '--body-s' : '--body-m'"
            >{{ title }}</txt
          >
        </box>
        <txt
          v-else
          line-height="--body2"
          :size="size === 'l' ? '--body-l' : size === 's' ? '--body-s' : '--body-m'"
          >{{ title }}</txt
        >
      </box>
      <box justify="center">
        <slot name="right-top" />
      </box>
    </box>
    <b-scroll-box flex="1" both>
      <PermissionView :accessDesc="accessDesc" :checkingText="permissionCheckingText">
        <template #unauth><slot name="no-permis"></slot></template>
        <slot></slot>
      </PermissionView>
    </b-scroll-box>
  </box>
</template>
<script setup lang="ts">
defineProps({
  size: [String],
  title: [String],
  titleHeight: [String],
  blueLine: [Boolean, String],
  grayLine: {
    type: [Boolean, String],
    default: true,
  },
  accessDesc: [Object, String, Number],
  permissionCheckingText: {
    type: String,
    default: "登录中...",
  },
});
</script>
