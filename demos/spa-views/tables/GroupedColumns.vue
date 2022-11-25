<template>
  <r-scroll-page with-dir>
    <r-panel>
      <h4>视图</h4>
      <div class="table"><GroupColumns /></div>
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
import GroupColumns from "@/components/tables/GroupColumns.vue";

const HighlightJS = hljsVuePlugin.component;
const tpl = `
<r-col-groupable-twrapper :columns="columns" :group-index="group" :pagination="false">
      <template #default="{ scrollYConfig, computedColumns }">
        <a-table
          rowKey="id"
          :scroll="isMobileDevice ? undefined : scrollYConfig"
          :columns="computedColumns"
          :data-source="dataSource"
          :pagination="false"
          :loading="false"
        >
        ...
        </a-table>
      </template>
    </r-col-groupable-twrapper>
`;
const ts = `
import { ref } from "vue";

defineProps({
  isMobileDevice: Boolean,
});
const group = ref("default");

const columns = {
  default: [
    {
      title: "用户名称",
      dataIndex: "name",
      useCell: "link",
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
  ],
  admin: [
    {
      title: "用户手机号",
      dataIndex: "phone",
    },
    {
      title: "操作",
      dataIndex: "operating",
      width: 100,
      useCell: "actions",
      actions: (record: AnyRecord) => {
        return [
          {
            name: "编辑",
            disabled: record.level === "Admin",
            action: () => {
              handleEdit(record);
            },
          },
        ];
      },
    },
  ],
  super: [
    {
      title: "所属站点",
      dataIndex: "projects",
      useCell: "projects",
      ellipsis: true,
      customRender: ({ text, record }: any) => {
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
      useCell: "actions",
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
  ],
};
...
`;
onMounted(() => {
  // code.value = codes.autoHeightCode;
});
</script>

<style lang="scss" scoped>
.table {
  /* height: 400px; */
  margin-bottom: 20px;
}
</style>
