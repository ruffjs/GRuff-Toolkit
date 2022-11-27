<template>
  <a-row :gutter="props.gap" style="width: 100%">
    <a-col :span="9">
      <a-form-item :label="props.label || undefined">
        <a-select
          v-model:value="rangeType"
          :placeholder="placeholder"
          :allow-clear="allowClear"
          :options="options"
        />
      </a-form-item>
    </a-col>
    <a-col :span="15" v-if="rangeType === 'custom'">
      <a-form-item :label="props.label ? props.customLabel : undefined">
        <a-range-picker
          :allowClear="false"
          :value="props.modelValue"
          @change="handlePickerChange"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { SelectProps } from "ant-design-vue";
import dayjs, { Dayjs } from "dayjs";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["update:modelValue", "change", "select"]);
const props = defineProps({
  allowClear: {
    type: [Boolean],
    default: false,
  },
  placeholder: {
    type: [String],
    default: "请选择时段",
  },
  defaultType: [String],
  label: {
    type: [String, Boolean],
    default: "时段选择",
  },
  customLabel: {
    type: [String],
    default: "自定义时段",
  },
  ranges: {
    type: [Array],
    default: [1, 3, 7],
  },
  gap: {
    type: [Number],
    default: 10,
  },
  modelValue: Array,
});

const rangeType = ref();
const options = ref<SelectProps["options"]>([
  {
    value: "custom",
    label: "自定义",
  },
]);
watch(
  () => props.ranges,
  (ranges) => {
    options.value = ranges
      .map((item) => {
        if (typeof item === "number") {
          return {
            value: item,
            label: `最近 ${item} 天`,
          };
        } else if (typeof item === "object") {
          if (item instanceof Array) {
            return {
              value: item[0],
              label: item[1],
            };
          }
          return item as SelectProps["options"];
        }
      })
      .concat({
        value: "custom",
        label: "自定义",
      }) as any;
  },
  { immediate: true }
);

const getTimeRange = (day = 1) => {
  const start = dayjs().subtract(day, "day"); // .startOf("day");
  const end = dayjs(); // .endOf("day");
  return {
    start,
    end,
  };
};

const handleChange = (value: [Dayjs, Dayjs] | undefined = undefined) => {
  emit("update:modelValue", value);
  emit("change", value);
  emit("select", {
    value,
    rangeType: rangeType.value,
  });
};
const handlePickerChange = (value: [Dayjs, Dayjs]) => {
  if (value) {
    const [a, b] = value;
    handleChange([a.startOf("day"), b.endOf("day")]);
  } else {
    handleChange();
  }
};
const handleChangeRangeType = () => {
  if (typeof rangeType.value === "number") {
    const { start, end } = getTimeRange(rangeType.value);
    handleChange([start, end]);
  } else {
    handleChange(undefined);
  }
};

watch(rangeType, async () => {
  // console.log(rangeType.value)
  handleChangeRangeType();
});

onMounted(() => {
  if (props.modelValue) {
    rangeType.value = "custom";
  } else {
    if (
      typeof props.defaultType === "string" &&
      ["day", "triduum", "week"].includes(props.defaultType)
    ) {
      rangeType.value = props.defaultType;
    } else {
      rangeType.value = undefined;
    }
  }
});
</script>
<style lang="scss"></style>
