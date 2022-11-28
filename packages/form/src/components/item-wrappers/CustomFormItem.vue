<template>
  <a-form-item
    :name="name"
    :html-for="htmlFor"
    :label="label"
    :label-align="labelAlign"
    :rules="rules"
    ref="formItem"
  >
    <slot :handleChange="handleChange" :handleBlur="handleBlur" />
  </a-form-item>
</template>

<script setup lang="ts">
import { FormItemExpose } from "ant-design-vue/lib/form/FormItem";
import { ref } from "vue";

defineProps({
  name: [String],
  htmlFor: [String],
  label: [String],
  labelAlign: {
    type: [String],
    default: "right",
  },
  rules: [Array],
  tip: [String],
  placement: {
    type: [String],
    default: "right",
  },
});

const formItem = ref<FormItemExpose>();
const handleChange = () => {
  if (formItem.value) {
    formItem.value.onFieldChange();
  }
};

const handleBlur = () => {
  if (formItem.value) {
    formItem.value.onFieldBlur();
  }
};
</script>
