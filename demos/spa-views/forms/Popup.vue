<template>
  <r-scroll-page with-dir>
    <r-panel>
      <box width="400" margin-v="20" margin-h="auto">
        <r-custom-select
          :id="id"
          :disabled="disabled"
          :allowClear="allowClear"
          :display-value="displayValue"
          @clear="handleClear"
          placeholder="请选择"
        >
          <template #default="{ onInputsFocus, onInputsBlur, resolve, reject }">
            <box margin="10">
              <div @click="handleSelect('Hello, world!', resolve)">Hello, world!</div>
              <div @click="handleSelect('Bye-bye, world!', resolve)">Bye-bye, world!</div>
            </box>
          </template>
        </r-custom-select>
      </box>
      <h4>模板代码</h4>
      <div class="code">
        <HighlightJS language="html" :code="tpl" />
      </div>
      <h4>业务脚本</h4>
      <div class="code">
        <HighlightJS language="ts" :code="ts" />
      </div>
    </r-panel>
  </r-scroll-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-custom-select
  :id="id"
  :disabled="disabled"
  :allowClear="allowClear"
  :display-value="displayValue"
  @clear="handleClear"
  placeholder="请选择"
>
  <template #default="{ onInputsFocus, onInputsBlur, resolve, reject }">
    <box margin="10">
      <div @click="handleSelect('Hello, world!', resolve)">Hello, world!</div>
      <div @click="handleSelect('Bye-bye, world!', resolve)">Bye-bye, world!</div>
    </box>
  </template>
</r-custom-select>
`;
const ts = `
import { computed, ref } from "vue";

const id = ref("demo");
const disabled = ref(false);
const allowClear = ref(true);
const value = ref("");
const displayValue = computed(() => (value.value ? \`选中了"\${value.value}"\` : undefined));

const handleClear = () => {
  value.value = "";
};
const handleSelect = async (data: string, resolve: AnyFn) => {
  value.value = data;
  resolve();
};
`;

const id = ref("demo");
const disabled = ref(false);
const allowClear = ref(true);
const value = ref("");
const displayValue = computed(() => (value.value ? `选中了"${value.value}"` : undefined));

const handleClear = () => {
  value.value = "";
};
const handleSelect = async (data: string, resolve: AnyFn) => {
  value.value = data;
  resolve();
};
</script>
<style lang="scss"></style>
