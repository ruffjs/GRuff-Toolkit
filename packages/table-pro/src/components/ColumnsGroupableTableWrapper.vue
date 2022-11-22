<template>
  <box width="100%" height="100%" background="--primary-bgcolor" :padding="padding">
    <box v-if="slots.header" :height="headerHeight">
      <slot name="header" />
    </box>
    <box flex="1" :height="tableHeight">
      <div class="ruff-table-wrapper" ref="tableWrapper">
        <slot
          :bodyHeight="bodyHeight"
          :isScrollNeeded="isScrollNeeded"
          :scrollYConfig="isScrollNeeded ? { y: bodyHeight } : undefined"
          :computedColumns="computedColumns"
          :hiddenColumns="hiddenColumns"
        />
      </div>
    </box>
    <box v-if="pagination" row="reverse" :height="paginationHeight" padding-top="13">
      <a-pagination
        size="small"
        :simple="simplePagination"
        :show-size-changer="(pagination as any).showSizeChanger"
        :show-quick-jumper="(pagination as any).showQuickJumper"
        showLessItems
        :value="(pagination as any).index"
        :current="(pagination as any).index"
        :total="(pagination as any).total"
        :page-size="(pagination as any).size"
        :show-total="(total: number) => `共计 ${(pagination as any).total} 条`"
        :page-size-options="(pagination as any).pageSizeOptions"
        @change="(...args: any) => emit('pageChange', ...args)"
        @showSizeChange="(...args: any) => emit('pageSizeChange', ...args)"
      />
    </box>
  </box>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { variColumns } from "../utils/props";
import { analyzeHidableColumns } from "../utils/methods";
import useHeightCalculator from "../traits/useHeightCalculator";
import useTableWrapperProps from "../traits/useTableWrapperProps";

const slots = useSlots();
const emit = defineEmits(["pageChange", "pageSizeChange"]);
const props = defineProps(variColumns);
const { tableWrapper, bodyHeight, isScrollNeeded } = useHeightCalculator();
const { tableHeight, paginationHeight } = useTableWrapperProps(props, slots);

const hiddenColumns = ref<any[]>([]);
const computedColumns = computed(() => {
  let columns = [];
  if (props.columns && props.columns instanceof Array) {
    columns = props.columns;
  } else {
    const defaultColumns = props.columns?.default || [];
    const selectedColumns =
      props.columns && props.groupIndex !== "default"
        ? props.columns[props.groupIndex] || []
        : [];

    columns = [...defaultColumns, ...selectedColumns];
  }

  const [showns, hiddens] = analyzeHidableColumns(columns, props);
  hiddenColumns.value = hiddens;
  return showns;
});
</script>
<style lang="scss"></style>
