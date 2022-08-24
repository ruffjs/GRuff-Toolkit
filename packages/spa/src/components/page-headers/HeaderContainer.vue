<template>
  <box :padding="['--ms', '--ms', 0]">
    <box
      width=""
      background="--primary-bgcolor"
      :padding="oneLine ? ['--xs', '--ms', '--xs'] : ['--s', '--ms', '--ms']"
    >
      <slot></slot>
    </box>
  </box>
</template>
<script setup lang="ts">
defineProps({
  oneLine: [Boolean],
})
</script>
