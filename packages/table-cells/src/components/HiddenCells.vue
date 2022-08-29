<template>
  <dl class="ruff-table-hidden-cells">
    <template v-for="item in hiddenColumns" :key="item.dataIndex">
      <dt>{{ item.title }}</dt>
      <dd v-if="item.useCell === 'actions'">
        <span
          v-for="(action, index) in item.actions(record)"
          :key="index"
          :class="
            action.class ? action.class : action.deleteConfirm ? 'red-font' : 'blue-font'
          "
          style="margin-right: 10px"
          @click="action.action"
          >{{ action.name }}</span
        >
      </dd>
      <dd v-else-if="item.customRender && typeof item.customRender === 'function'">
        {{ item.customRender({ text: record[item.dataIndex], record, column: item }) }}
      </dd>
      <dd v-else>{{ record[item.dataIndex] }}</dd>
    </template>
  </dl>
</template>

<script setup>
defineProps({
  hiddenColumns: Array,
  record: Object,
});
</script>

<style lang="scss">
.ruff-table-hidden-cells {
  dt {
    color: #999;
  }

  dd {
    margin-bottom: 10px;
  }
}
</style>
