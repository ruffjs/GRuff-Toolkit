<template>
  <r-scroll-page with-dir>
    <r-panel>
      <h4>视图</h4>
      <div class="table"><UseCellsByNames /></div>
      <h4>模板代码 1</h4>
      <div class="code">
        <HighlightJS language="html" :code="tpl1" />
      </div>
      <h4>业务脚本 1</h4>
      <div class="code">
        <HighlightJS language="ts" :code="ts1" />
      </div>
      <h4>模板代码 2</h4>
      <div class="code">
        <HighlightJS language="html" :code="tpl2" />
      </div>
      <h4>业务脚本 2</h4>
      <div class="code">
        <HighlightJS language="ts" :code="ts2" />
      </div>
    </r-panel>
  </r-scroll-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import UseCellsByNames from "@/components/tables/UseCellsByNames.vue";

const HighlightJS = hljsVuePlugin.component;
const tpl1 = `
<r-table-wrapper :data-length="dataSource.length" :pagination="false">
    <template #default="{ bodyHeight: y, isScrollNeeded }">
      <a-table
        rowKey="id"
        :scroll="isScrollNeeded ? { y } : undefined"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :loading="false"
      />
    </template>
  </r-table-wrapper>
`;
const ts1 = `
import { ref } from "vue";
import { withCell } from "@ruff-web/table-cells/src/utils/cell";

...

const columns: any[] = [
  withCell("ruff-link-cell", {
    title: "用户名称",
    dataIndex: "name",
    disabled(record: AnyRecord) {
      return record?.level === "Admin";
    },
    action(record: AnyRecord) {
      handleEdit(record);
    },
  }),
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
  withCell("ruff-tooltip-cell", {
    title: "所属站点",
    dataIndex: "projects",
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
  }),
  withCell("ruff-actions-cell", {
    title: "操作",
    width: 200,
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
  }),
];

...

const handleEdit = (record: any) => {
  alert(\`编辑\${record.name}\`);
};

const handleDelete = (id: number) => {
  alert(\`删除Id为[\${id}]的用户\`);
};
`;

const tpl2 = `
<r-cells-embed-twrapper
    :pagination="false"
    :data-source="dataSource"
    :columns="columns"
    row-key="id"
  />
`;
const ts2 = `
const columns: any[] = [
  {
    title: "用户名称",
    dataIndex: "name",
    rfCell: "ruff-link-cell",
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
    hidden: () => props.isMobileDevice,
  },
  {
    title: "所属站点",
    dataIndex: "projects",
    hidden: () => props.isMobileDevice,
    rfCell: "ruff-tooltip-cell",
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
    width: 200,
    hidden: () => props.isMobileDevice,
    rfCell: "ruff-actions-cell",
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
