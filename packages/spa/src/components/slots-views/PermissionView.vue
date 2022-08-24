<template>
  <template v-if="show">
    <slot />
  </template>
  <template v-else-if="show === false">
    <slot v-if="!!slots.unauth" name="unauth" />
    <box v-else>{{ reason }}</box>
  </template>
  <template v-else-if="show === void 0">
    <slot v-if="!!slots.loading" name="loading" />
    <box v-else>{{ checkingText }}</box>
  </template>
</template>

<script setup lang="ts">
import { ref, useSlots, watchEffect } from "vue";
import Runtime from "../../runtime/Runtime";

const slots = useSlots();
const props = defineProps({
  accessDesc: [Object, String, Number],
  checkingText: {
    type: String,
    default: "登录中...",
  },
  defaultReason: {
    type: String,
    default: "权限不足",
  },
});
const show = ref();
const reason = ref(props.defaultReason || "权限不足");

watchEffect(async () => {
  if (props.accessDesc) {
    const runtime = Runtime.getCurrentInstance();
    try {
      await runtime.checkPermission(props.accessDesc);
      show.value = true;
    } catch (error: any) {
      // console.log(error);
      if (error?.reason) {
        reason.value = error.reason;
      } else {
        reason.value = props.defaultReason || "权限不足";
      }
      show.value = false;
    }
  } else {
    show.value = true;
  }
});
</script>
