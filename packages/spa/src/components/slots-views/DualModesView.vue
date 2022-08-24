<template>
  <MultipleDevicesView>
    <template #mobile>
      <slot v-if="slots.mobile" name="mobile"></slot>
      <slot v-else></slot>
    </template>
    <template #desktop>
      <slot v-if="slots.desktop" name="desktop"></slot>
      <slot v-else></slot>
    </template>
  </MultipleDevicesView>
</template>

<script setup lang="ts">
import { useSlots } from "vue"
import MultipleDevicesView from "./MultipleDevicesView.vue"

const slots = useSlots()
</script>
