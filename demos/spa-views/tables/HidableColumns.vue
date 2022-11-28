<template>
  <r-scroll-page with-dir>
    <template #header-right>
      <box height="70" justify-content="center" padding="15">
        <a-radio-group v-model:value="isMobileDevice">
          <a-radio-button :value="false">PC 端</a-radio-button>
          <a-radio-button :value="true">移动端</a-radio-button>
        </a-radio-group>
      </box>
    </template>
    <r-panel>
      <h4>视图</h4>
      <div
        class="table"
        :style="{
          width: isMobileDevice ? '375px' : '100%',
          height: isMobileDevice ? '576px' : 'auto',
        }"
      >
        <Hidable :isMobileDevice="isMobileDevice" />
      </div>
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
import { ref, onMounted, watch } from "vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import Hidable from "@/components/tables/Hidable.vue";
import { delay } from "@ruff-web/utils/src/async";

const HighlightJS = hljsVuePlugin.component;

const isMobileDevice = ref(false);
const tpl = `
<r-col-hidable-twrapper :pagination="false" :columns="columns">
    <template
      #default="{ bodyHeight: y, isScrollNeeded, computedColumns, hiddenColumns }"
    >
      <a-table
        rowKey="id"
        :scroll="isMobileDevice ? { y } : isScrollNeeded ? { y } : undefined"
        :columns="computedColumns"
        :data-source="dataSource"
        :pagination="false"
        :loading="false"
      >
        ...
        <template v-if="isMobileDevice" #expandedRowRender="{ record }">
          <r-tcell-hiddens :hiddenColumns="hiddenColumns" :record="record" />
        </template>
      </a-table>
    </template>
  </r-col-hidable-twrapper>
`;
const ts = `
import { ref } from "vue";

const props = defineProps({
  isMobileDevice: Boolean,
});

const columns: any = [
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
  {
    title: "用户手机号",
    dataIndex: "phone",
    hidden: () => props.isMobileDevice,
  },
  {
    title: "所属站点",
    dataIndex: "projects",
    useCell: "projects",
    ellipsis: true,
    hidden: () => props.isMobileDevice,
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
    hidden: () => props.isMobileDevice,
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
];
...
`;
watch(isMobileDevice, async () => {
  await delay(1000);
  window.dispatchEvent(new Event("resize"));
});
onMounted(() => {
  // code.value = codes.autoHeightCode;
});
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 20px;
}
</style>
