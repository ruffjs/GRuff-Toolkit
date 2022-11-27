<template>
  <r-scroll-page with-dir>
    <r-panel>
      <h4>视图</h4>
      <div class="table"><UseCells /></div>
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
import { onMounted } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import UseCells from "@/components/tables/UseCells.vue";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-table-wrapper :data-length="dataSource.length" :pagination="false">
    <template #default="{ bodyHeight: y, isScrollNeeded }">
      <a-table
        rowKey="id"
        :scroll="isScrollNeeded ? { y } : undefined"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :loading="false"
      >
        <template #bodyCell="{ column, text, record }">
          <r-tcell-link
            v-if="column.cellname === 'link'"
            :text="text"
            :record="record"
            :column="column"
          />
          <r-tcell-tooltip
            v-if="column.cellname === 'projects'"
            :text="text"
            :record="record"
            :column="column"
          />
          <r-tcell-actions
            v-if="column.cellname === 'actions'"
            :column="column"
            :record="record"
          />
        </template>
      </a-table>
    </template>
  </r-table-wrapper>
`;
const ts = `
import { onMounted, ref } from "vue";

defineProps({
  isMobileDevice: Boolean,
});

const columns: any[] = [
  {
    title: "用户名称",
    dataIndex: "name",
    cellname: "link",
    disabled(record: AnyRecord) {
      return record?.level === "Admin";
    },
    action(record: AnyRecord) {
      handleEdit(record);
    },
  },
  {
    title: "用户角色",
    dataIndex: "roles",
    customRender({ text, record }: any) {
      var name = "";
      if (record?.level == "Admin") {
        name = "超级管理员";
      } else {
        record.roles.forEach((item: AnyRecord) => {
          name = name ? name + "、" + item.name : item.name;
        });
      }
      return name || "-";
    },
  },
  {
    title: "用户手机号",
    dataIndex: "phone",
  },
  {
    title: "所属站点",
    dataIndex: "projects",
    cellname: "projects",
    ellipsis: true,
    rfTextRender: ({ text, record }: any) => {
      let sites = "";
      if (record.level == "Admin") {
        sites = "所有站点";
      } else if (record.roles[0] && record.roles[0].id == 1) {
        sites = "所有站点";
      } else {
        text.forEach((item: AnyRecord) => {
          sites = sites ? sites + "、" + item.name : item.name;
        });
      }
      return sites;
    },
  },
  {
    title: "操作",
    dataIndex: "operating",
    width: 200,
    cellname: "actions",
    actions: (record: AnyRecord) => {
      return [
        {
          name: "编辑",
          disabled: record.level === "Admin",
          action: () => {
            handleEdit(record);
          },
        },
        {
          name: "删除",
          disabled: record.level === "Admin",
          deleteConfirm: "确定删除？",
          action: async () => {
            try {
              handleDelete(record.id);
            } catch (error) {}
          },
        },
      ];
    },
  },
];
...
`;
onMounted(() => {
  // code.value = codes.autoHeightCode;
});
</script>

<style lang="scss" scoped>
.table {
  height: 400px;
  margin-bottom: 20px;
}
</style>
