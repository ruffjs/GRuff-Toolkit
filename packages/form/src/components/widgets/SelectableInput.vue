<template>
  <a-form-item>
    <a-input-group compact>
      <a-select v-model:value="form.searchField" :options="options" style="width: 35%" />
      <a-input-search
        style="width: 65%"
        v-if="showButton"
        v-model:value="form.searchText"
        enter-button
        :placeholder="placeholder"
        @search="handleSearch"
      />
      <a-input
        style="width: 65%"
        v-else
        v-model:value="form.searchText"
        :placeholder="placeholder"
      />
    </a-input-group>
  </a-form-item>
</template>

<script setup lang="ts">
import { OptionProps } from "ant-design-vue/lib/select";
import { watch, reactive, ref } from "vue";

const emit = defineEmits(["change", "serach"]);
const props = defineProps({
  fields: Array,
  data: Array,
  showButton: Boolean,
});
const options = ref<OptionProps>([]);
const placeholder = ref("");
const form = reactive({
  searchField: undefined,
  searchText: "",
});
const calcValues = () => {
  const values: any = {};
  props.fields?.forEach((field: any) => {
    if (field.field === form.searchField) {
      values[field.field] = form.searchText || "";
    } else {
      values[field.field] = undefined;
    }
  });
  return values;
};

const handleSearch = () => {
  emit("serach", calcValues(), form.searchField, form.searchText);
};
watch(
  () => props.fields,
  (fields) => {
    if (fields?.length) {
      options.value = fields.map((field: any) => ({
        label: field.name,
        value: field.field,
      }));
      form.searchField = options.value[0].value;
      form.searchText = (fields[0] as any)?.defaultValue || "";
    } else {
      options.value = [];
      form.searchField = undefined;
      form.searchText = "";
    }
  },
  { immediate: true }
);
watch(
  () => props.data,
  (data) => {
    if (data) {
      form.searchField = (data[0] as any) || undefined;
      form.searchText = (data[1] as any) || "";
    }
  },
  { immediate: true }
);
watch(
  () => form.searchField,
  (field) => {
    const item =
      (props.fields?.find((item: any) => item.field === field) as any) ||
      (props.fields ? props.fields[0] : null);
    if (item) {
      placeholder.value = item.placeholder || "输入" + (item.name || "关键字");
      form.searchText = item.default || "";
      emit("change", calcValues(), form.searchField, form.searchText);
    }
  },
  { immediate: true }
);

watch(
  () => form.searchText,
  () => {
    emit("change", calcValues(), form.searchField, form.searchText);
  },
  { immediate: true }
);
</script>
<style lang="scss"></style>
