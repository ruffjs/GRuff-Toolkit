<template>
  <template v-for="(action, i) in actions">
    <a-divider v-if="i" type="vertical" />
    <a-dropdown v-if="action.children">
      <a-button type="link" class="ant-dropdown-link" @click.prevent>{{
        action.name || "更多"
      }}</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="(act, i) in action.children">
            <a-popconfirm
              v-if="act.confirm"
              :disabled="!!act.disabled"
              :title="act.confirm.question"
              :ok-text="act.confirm.okText || '确定'"
              :cancel-text="act.confirm.cancelText || '取消'"
              @cancel="act.confirm.cancel"
              @confirm="act.action"
            >
              <span :class="act.class">{{ act.name }}</span>
            </a-popconfirm>
            <span v-else :class="act.class">
              {{ act.name }}
            </span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-popconfirm
      v-else-if="action.deleteConfirm"
      :title="action.deleteConfirm"
      :ok-text="action.confirm?.okText || '确定'"
      :cancel-text="action.confirm?.cancelText || '取消'"
      @confirm="action.action"
      :disabled="!!action.disabled"
    >
      <template #icon>
        <ruff-icon type="antd" name="question-circle-outlined" style="color: var(--b-negative-color)" />
      </template>
      <a-button
        type="link"
        danger
        :class="
          action.class
            ? (action.disabled ? '' : 'ruff-color-error-i ') + action.class
            : action.disabled
            ? ''
            : 'ruff-color-error-i'
        "
        :disabled="!!action.disabled"
        >{{ action.name || "删除" }}</a-button
      >
    </a-popconfirm>
    <a-popconfirm
      v-else-if="action.confirm"
      :disabled="!!action.disabled"
      :title="action.confirm.question"
      :ok-text="action.confirm.okText || '确定'"
      :cancel-text="action.confirm.cancelText || '取消'"
      @cancel="action.confirm.cancel"
      @confirm="action.action"
    >
      <a-button
        type="link"
        :class="action.class"
        @click.prevent
        :disabled="!!action.disabled"
        >{{ action.name }}</a-button
      >
    </a-popconfirm>
    <a-button
      v-else
      type="link"
      :class="action.class"
      :disabled="!!action.disabled"
      @click="action.action"
    >
      {{ action.name }}
    </a-button>
  </template>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  index: Number,
  text: [String, Number, Object, Boolean],
  column: {
    type: Object,
    required: true,
  },
  record: {
    type: Object,
    required: true,
  },
  payload: Object,
});

const actions = ref(
  props.column?.actions ? props.column.actions(props.record, props.payload) : []
);
watch(
  props,
  (p) => {
    // console.log(p.column?.actions);
    actions.value = p.column?.actions
      ? p.column.actions(props.record, props.payload)
      : [];
  },
  { deep: true, immediate: true }
);
</script>
