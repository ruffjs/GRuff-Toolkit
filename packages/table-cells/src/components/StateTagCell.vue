<template>
  <a-tag :color="state ? 'green' : ''">
    {{ state ? "在线" : "离线" }}
  </a-tag>
  <a-tag v-if="record?.alert" color="red">告警</a-tag>
</template>

<script setup lang="ts">
defineProps({
  column: Object,
  record: Object,
  state: Boolean,
});
</script>
