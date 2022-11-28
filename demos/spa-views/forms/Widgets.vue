<template>
  <r-scroll-page with-dir>
    <r-panel>
      <a-form :model="formState">
        <box padding="30">
          <r-form-widget
            widget="test"
            v-model:value="formState.input"
            placeholder="请输入文字"
            @change="handleChange1"
          ></r-form-widget>
        </box>
        <box padding="30">
          <r-form-item
            name="custom"
            label="表单字段"
            :rules="[
              {
                required: true,
                message: 'Please input custom',
              },
              rules.lengthRange(2, 10),
            ]"
            ref="formItem"
          >
            <r-form-widget
              widget="test"
              placeholder="请输入文字"
              v-model:value="formState.custom"
              @change="formItem?.onFieldChange"
            ></r-form-widget>
          </r-form-item>
        </box>
        <box padding="30">
          <r-tooltip-item
            name="tooltip"
            label="带提示文字的输入框"
            :rules="[
              {
                required: true,
                message: 'Please input tooltip',
              },
              rules.lengthRange(2, 10),
            ]"
            tip="带提示文字的输入框"
            placement="top"
          >
            <template #default="{ handleChange }">
              <r-form-widget
                widget="test"
                v-model:value="formState.tooltip"
                placeholder="请输入文字"
                @change="handleChange"
              ></r-form-widget
            ></template>
          </r-tooltip-item>
        </box>
      </a-form>
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
import { ref } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { rules } from "@ruff-web/form/src/rules";
import { FormItemExpose } from "ant-design-vue/lib/form/FormItem";

const HighlightJS = hljsVuePlugin.component;
const tpl = `

`;
const ts = `

`;

const formState = ref({
  input: "",
  tooltip: "",
  custom: "",
});
const formItem = ref<FormItemExpose>();
const handleChange1 = (e: InputEvent) => {
  console.log((e.target as HTMLInputElement)?.value || undefined);
};
</script>
<style lang="scss"></style>
