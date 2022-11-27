<template>
  <a-modal
    :visible="visible"
    :width="width"
    :confirm-loading="loading"
    :mask-closable="maskClosable"
    @cancel="handleCancel"
  >
    <template #title
      ><span @click="handleTitleClick" style="user-select: none; cursor: default">{{
        title
      }}</span></template
    >
    <template #footer>
      <div
        v-show="clickCount > titleClickWillEffectTime"
        class="left-bottom-hidden-container"
      >
        <slot name="left-bottom-hidden-content" />
      </div>
      <template v-if="props.mode === 'read'">
        <a-button key="back" @click="handleCancel">返回</a-button>
      </template>
      <template v-else-if="props.mode === 'add' || props.mode === 'edit'">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
          >确认</a-button
        >
      </template>
    </template>
    <a-form
      ref="formRef"
      :name="name"
      :model="props.model"
      layout="vertical"
      :rules="props.rules"
    >
      <slot />
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { FormWidth } from "./widgets/const";
import { Rule } from "ant-design-vue/lib/form";
import { onActivated, onMounted, ref, watch } from "vue";

export type FormMode = "add" | "edit" | "read" | "hide";
export type FormProps = {
  mode: FormMode;
  title: string;
  size: FormWidth;
  model: AnyRecord;
  rules: Record<string, Rule | Rule[]>;
  loading: boolean;
  maskClosable: boolean;
};

const emit = defineEmits(["cancel", "ok", "error", "titleClickedTimes"]);
const props = defineProps({
  name: [String],
  mode: {
    type: [String],
    default: "hide",
  },
  title: {
    type: [String],
    default: "hide",
  },
  size: {
    type: [String],
    default: FormWidth.normal,
  },
  model: {
    type: [Object],
    default: null,
  },
  rules: {
    type: [Object],
    default: null,
  },
  loading: {
    type: [Boolean],
    default: false,
  },
  maskClosable: {
    type: [Boolean],
    default: false,
  },
  titleClickWillEffectTime: {
    type: [Number],
    default: 4,
  },
  onOk: Function,
  onCancel: Function,
});
const clickCount = ref(0);
const visible = ref(true);
const formRef = ref();
const width = ref(FormWidth.normal);

onMounted(() => {
  clickCount.value = 0;
});

onActivated(() => {
  clickCount.value = 0;
});

watch(
  props,
  () => {
    if (props.mode === "hide") {
      visible.value = false;
    } else {
      visible.value = true;
    }
    if (props.size) {
      width.value = <FormWidth>props.size;
    }
  },
  { immediate: true }
);

const handleTitleClick = () => {
  console.log(clickCount.value);
  if (clickCount.value < props.titleClickWillEffectTime) {
    clickCount.value++;
  } else if (clickCount.value === props.titleClickWillEffectTime) {
    emit("titleClickedTimes");
    clickCount.value++;
  }
};

const handleOk = async () => {
  try {
    if (props.model && props.rules) {
      await formRef.value.validate();
    }
    emit("ok", props.model);
    clickCount.value = 0;
  } catch (error) {
    console.log(props.model);
    emit("error");
  }
};

const handleCancel = async () => {
  if (props.model) {
    // console.log(props.model)
    await formRef.value.resetFields();
  }
  emit("cancel");
  clickCount.value = 0;
};
</script>
<style lang="scss" scoped>
.left-bottom-hidden-container {
  float: left;
  width: 50%;
  height: 32px;
  line-height: 32px;
  text-align: left;
}
</style>
