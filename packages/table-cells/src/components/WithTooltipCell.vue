<template>
  <a-tooltip :placement="placement" :title="title">
    <span style="cursor: pointer"> {{ title || "-" }}</span>
  </a-tooltip>
</template>

<script setup>
import useCustomText from "../traits/useCustomText";

const props = defineProps({
  index: Number,
  text: [String, Number, Object, Boolean],
  column: Object,
  record: Object,
  placement: {
    type: String,
    default: "topLeft",
  },
});

const title = useCustomText(props);
</script>
