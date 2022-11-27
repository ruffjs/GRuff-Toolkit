<template>
  <a-input
    :value="props.modelValue"
    @change="handleChange"
    placeholder="请输入或选择地址"
  >
    <template #addonAfter>
      <ruff-icon type="aim-outlined" @click="handleButtonClick" />
    </template>
  </a-input>
  <a-form-item-rest>
    <LocationPicker
      v-if="showPicker"
      :addressInfo="formData"
      @pick-address="handlePickAddress"
      @close="showPicker = false"
    />
  </a-form-item-rest>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import LocationPicker from "./LocationPicker.vue";

const emit = defineEmits(["update:modelValue", "update:location", "change", "select"]);
const props = defineProps({
  modelValue: String,
  location: String,
});
const showPicker = ref(false);
const formData = reactive<any>({
  address: "",
  latitude: 0,
  longitude: 0,
});

watch(
  () => props,
  () => {
    try {
      const [latitude, longitude] = JSON.parse(
        `[${props.location || "121.605856,31.180911"}]`
      );
      formData.latitude = latitude || 121.605856;
      formData.longitude = longitude || 31.180911;
    } catch (error) {
      formData.latitude = 121.605856;
      formData.longitude = 31.180911;
    }
    formData.address = props.modelValue;
  },
  { immediate: true, deep: true }
);

const handleChange = async (e: any) => {
  // console.log('sdfghjklg', e.target?.value)
  emit("update:modelValue", e.target?.value);
  emit("change", e.target?.value);
};
const handleButtonClick = () => {
  console.log("handleButtonClick");
  showPicker.value = true;
};
const handlePickAddress = (location: any) => {
  // console.log(location)
  emit("update:location", location.position.join(","));
  emit("update:modelValue", location.address);
  emit("select", location.address, location.position.join(","));
  emit("change", location.address);
  showPicker.value = false;
};
</script>
<style lang="scss"></style>
