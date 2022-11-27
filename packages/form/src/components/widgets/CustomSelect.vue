<template>
  <box class="ruff-select-wrapper">
    <box
      class="ruff-select-input-wrapper"
      :class="{
        'ruff-select-disabled': disabled,
        'ruff-select-focused': !disabled && states.optionShown,
        'ruff-select-hovered': !disabled && states.displayInputHovered,
      }"
      row
      @mousedown="handleDisplayInputMousedown"
      @mouseover="handleDisplayInputMouseover"
      @mouseout="handleDisplayInputMouseout"
    >
      <input
        ref="displayInput"
        readonly
        class="ruff-select-input"
        :id="id"
        :value="displayValue"
        @focus="handleDisplayInputFocus"
        @blur="handleDisplayInputBlur"
        :placeholder="placeholder"
      />
      <div class="ruff-select-input-mask"></div>
      <div class="ruff-select-icon-trigger">
        <ruff-icon
          v-if="displayValue && !disabled && allowClear && states.displayInputHovered"
          type="antd"
          name="close-circle-filled"
          size="12"
          color="rgba(0, 0, 0, 0.25)"
          @mousedown.stop="handleClearMousedown"
        />
        <ruff-icon
          v-else
          type="antd"
          name="down-outlined"
          size="12"
          color="rgba(0, 0, 0, 0.25)"
        />
      </div>
    </box>
    <teleport v-if="teleport" to="#ruff-select-options-teleport">
      <div
        class="ruff-select-options-wrapper"
        :style="style"
        @mousedown="handleOptionMousedown"
      >
        <slot
          :onMousedown="handleOptionMousedown"
          :onInputsFocus="handleOptionInputsFocus"
          :onInputsBlur="handleOptionInputsBlur"
          :resolve="handleResolve"
          :reject="handleReject"
        />
      </div>
    </teleport>
  </box>
</template>

<script setup lang="ts">
import { delay } from "@ruff-web/utils/src/async";
import { CSSProperties, reactive, ref, onDeactivated, onMounted } from "vue";

const emit = defineEmits(["clear"]);
const hideTop = "-9999px";
const teleport = ref<HTMLElement | null>(
  document.getElementById("ruff-select-options-teleport")
);
const displayInput = ref<HTMLElement | null>(null);
const style = reactive<CSSProperties>({
  position: "absolute",
  width: "0",
  height: "0",
  top: hideTop,
  left: "0",
});

const props = defineProps({
  id: String,
  disabled: Boolean,
  allowClear: Boolean,
  placeholder: String,
  displayValue: String,
  minOptionsWidth: {
    type: Number,
    default: 200,
  },
});

const init = () => {
  let element = document.getElementById("ruff-select-options-teleport");
  if (!element) {
    element = document.createElement("div");
    element.setAttribute("id", "ruff-select-options-teleport");
    document.body.appendChild(element);
  }
  element.style.position = "absolute";
  element.style.width = "100%";
  element.style.height = "0";
  element.style.top = "0";
  element.style.left = "0";
  element.style.zIndex = "9999";
  teleport.value = element;
};

const show = async () => {
  // console.log(11111)
  if (props.disabled) return;
  if (!displayInput.value) return;
  if (!teleport.value) init();
  if (states.optionShown) return;
  const box = displayInput.value.parentElement;
  if (box) {
    const viewHeight = window.visualViewport?.height || 0;
    const rect = box.getBoundingClientRect();
    style.width =
      rect.width > props.minOptionsWidth
        ? rect.width + "px"
        : props.minOptionsWidth + "px";
    style.left = rect.left + "px";
    if (rect.bottom > viewHeight / 2 - 4) {
      style.height = `${rect.top - 8}px`;
      style.top = "4px";
    } else {
      style.height = `${viewHeight / 2 - 8}px`;
      style.top = `${rect.bottom + 4}px`;
    }
  }
};

const hide = async () => {
  if (props.disabled) return;
  if (!displayInput.value) return;
  style.top = hideTop;
};

const states = reactive({
  displayInputHovered: false,
  displayInputFocused: false,
  aroundOptionClicked: false,
  optionShown: false,
  optionInputsFocused: false,
});

const handleDisplayInputMouseover = () => {
  states.displayInputHovered = true;
};

const handleDisplayInputMouseout = () => {
  states.displayInputHovered = false;
};

const handleClearMousedown = () => {
  // console.log('handleClearMousedown')
  emit("clear");
};

const handleDisplayInputMousedown = async () => {
  // console.log('handleDisplayInputMousedown', states.displayInputFocused, states.optionShown)
  if (props.disabled) return;
  if (states.optionShown) {
    hide();
    states.optionShown = false;
    displayInput.value?.blur();
  } else {
    show();
    states.optionShown = true;
    await delay(0);
    displayInput.value?.focus();
  }
};

const handleDisplayInputFocus = () => {
  // console.log('handleDisplayInputFocus', states.optionShown, states.displayInputFocused)
  if (props.disabled) return;
  if (states.optionShown) return;
  handleDisplayInputMousedown();
};

const handleDisplayInputBlur = () => {
  // console.log('handleDisplayInputBlur')
  if (props.disabled) return;
  if (states.optionInputsFocused) return;
  if (states.aroundOptionClicked) return;
  if (states.optionShown) {
    handleDisplayInputMousedown();
  }
};

const handleOptionInputsFocus = () => {
  // console.log('handleOptionInputsFocus')
  states.optionInputsFocused = true;
};
const handleOptionInputsBlur = () => {
  // console.log('handleOptionInputsBlur')
  if (states.optionInputsFocused) {
    states.optionInputsFocused = false;
    handleDisplayInputBlur();
  }
};

const handleOptionMousedown = async () => {
  // console.log('handleOptionMousedown')
  states.aroundOptionClicked = true;
  await delay(50);
  states.aroundOptionClicked = false;
};

const handleResolve = async () => {
  // console.log('handleResolve')
  await delay(0);
  states.aroundOptionClicked = false;
  handleDisplayInputBlur();
};

const handleReject = async () => {};

onMounted(() => {
  init();
});

onDeactivated(() => {
  hide();
});
</script>
<style lang="scss" scoped>
.ruff-select-input-wrapper {
  width: 100%;
  height: 32px;
  padding: 0 11px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  transition: border 0.2s ease-in-out;

  &.ruff-select-disabled {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }

  &.ruff-select-hovered {
    border-color: #40a9ff;
  }

  &.ruff-select-focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border-right-width: 1px !important;
    outline: 0;
  }

  .ruff-select-input {
    flex: 1;
    width: 0;
    height: 32px;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
  }

  .ruff-select-input-mask {
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .ruff-select-icon-trigger {
    width: 12px;
    height: 32px;
    z-index: 20;
  }
}

.ruff-select-options-wrapper {
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: absolute;
  top: -9999px;
  left: -9999px;
  z-index: 1050;
  box-sizing: border-box;
  padding: 4px 0;
  overflow: hidden;
  font-size: var(--b-body3);
  font-variant: initial;
  background-color: #fff;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
}
</style>
