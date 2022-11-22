<template>
  <ColumnsGroupableTableWrapper
    :padding="padding"
    :header-height="headerHeight"
    :data-length="dataLength || dataSource.length"
    :simple-pagination="simplePagination"
    :pagination="pagination"
    :onHiddenCheck="onHiddenCheck"
    :columns="groupedColumns"
    :group-index="groupIndex"
  >
    <template #default="{ scrollYConfig, computedColumns, hiddenColumns }">
      <a-table
        :rowKey="rowKey"
        :scroll="scrollYConfig"
        :columns="computedColumns"
        :data-source="dataSource"
        :pagination="false"
        :loading="false"
      >
        <template v-if="hiddenColumns.length" #expandedRowRender="{ record }">
          <HiddenCells :hiddenColumns="hiddenColumns" :record="record" />
        </template>
      </a-table>
    </template>
  </ColumnsGroupableTableWrapper>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withCell } from "@ruff-web/table-cells/src/utils/cell";
import { embedCells } from "../utils/props";
import ColumnsGroupableTableWrapper from "./ColumnsGroupableTableWrapper.vue";
import { toGroups } from "../utils/group";
import HiddenCells from "@ruff-web/table-cells/src/components/HiddenCells.vue";

const props = defineProps(embedCells);
const groupedColumns = computed(() => {
  return toGroups(
    props.columns.map((col) => {
      if (typeof col.rfCell === "string") {
        return withCell(col.rfCell, col);
      }
      return col;
    })
  );
});
</script>
