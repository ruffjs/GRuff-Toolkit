<template>
  <r-scroll-page with-dir>
    <r-panel>
      <box width="700" :margin="[20, 'auto']">
        <r-date-range-select
          :ranges="ranges"
          :modelValue="selectedTimeRange"
          allow-clear
          @select="handleSelectDateRange"
          :gap="20"
      /></box>
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
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { Dayjs } from "dayjs";
import { ref } from "vue";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-date-range-select
    :ranges="ranges"
    :modelValue="selectedTimeRange"
    allow-clear
    @select="handleSelectDateRange"
    :gap="20"
/>
`;
const ts = `
import { ref } from "vue";
import { Dayjs } from "dayjs";

const ranges = [
  1,
  2,
  5,
  10,
  [14, "最近两周哦"],
  {
    value: 100,
    label: "近 100 天",
  },
];
const selectedTimeRange = ref<[Dayjs, Dayjs] | undefined>(undefined);
const handleSelectDateRange = ({ value }: { value?: [Dayjs, Dayjs] }) => {
  alert(value);
};
`;

const ranges = [
  1,
  2,
  5,
  10,
  [14, "最近两周哦"],
  {
    value: 100,
    label: "近 100 天",
  },
];
const selectedTimeRange = ref<[Dayjs, Dayjs] | undefined>(undefined);
const handleSelectDateRange = ({ value }: { value?: [Dayjs, Dayjs] }) => {
  alert(value);
};
</script>
<style lang="scss"></style>
