<template>
  <div>
    <a-radio-group v-model:value="group">
      <a-radio-button value="default">用户</a-radio-button>
      <a-radio-button value="admin">管理员</a-radio-button>
      <a-radio-button value="super">超管</a-radio-button>
    </a-radio-group>
  </div>
  <div>
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
    </r-col-groupable-twrapper>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { toGroupedCols } from "@ruff-web/table-pro/src/utils/group";

defineProps({
  isMobileDevice: Boolean,
});
const group = ref("default");

const sweetColumns = [
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
    rfColScope: ["admin"],
  },
  {
    title: "所属站点",
    dataIndex: "projects",
    cellname: "projects",
    rfColScope: ["super"],
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
    width: 100,
    cellname: "actions",
    rfColScope: ["admin"],
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
  {
    title: "操作",
    dataIndex: "operating",
    width: 200,
    cellname: "actions",
    rfColScope: ["super"],
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

const columns = toGroupedCols(sweetColumns);

const dataSource = ref([
  {
    id: 116,
    createAt: "2021-11-02T03:18:45.000Z",
    updateAt: "2021-11-02T03:18:45.000Z",
    tenantId: 33,
    name: "演示账号",
    email: "tankdemo",
    phone: "19909871765",
    type: "Tenant",
    level: "Admin",
    headImgUrl: null,
    remark: "",
    creatorId: null,
    projects: [
      {
        id: -1,
        createAt: "2020-12-09T04:53:01.403Z",
        updateAt: "2020-12-09T04:53:01.403Z",
        tenantId: 0,
        name: "全部项目",
        remark: "",
      },
    ],
    roles: [
      {
        id: 2,
        createAt: "2020-12-10T10:34:04.731Z",
        updateAt: "2020-12-10T10:34:04.731Z",
        tenantId: 0,
        type: "Platform",
        code: "Ops",
        name: "运维人员",
        remark: "",
      },
    ],
    wechatUser: null,
  },
  {
    id: 171,
    createAt: "2022-08-24T02:09:54.000Z",
    updateAt: "2022-08-24T02:13:33.000Z",
    tenantId: 33,
    name: "老杨test2",
    email: null,
    phone: "18620828577",
    type: "Tenant",
    level: "Member",
    headImgUrl: null,
    remark: "",
    creatorId: 116,
    projects: [
      {
        id: 207,
        createAt: "2022-08-24T02:07:30.345Z",
        updateAt: "2022-08-24T02:07:30.345Z",
        tenantId: 33,
        name: "testtest",
        remark: null,
      },
    ],
    roles: [
      {
        id: 2,
        createAt: "2020-12-10T10:34:04.731Z",
        updateAt: "2020-12-10T10:34:04.731Z",
        tenantId: 0,
        type: "Platform",
        code: "Ops",
        name: "运维人员",
        remark: "",
      },
    ],
    wechatUser: null,
  },
]);

const handleEdit = (record: any) => {
  alert(`编辑${record.name}`);
};

const handleDelete = (id: number) => {
  alert(`删除Id为[${id}]的用户`);
};
</script>
<style lang="scss"></style>
