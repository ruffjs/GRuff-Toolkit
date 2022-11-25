<template>
  <r-cells-embed-twrapper
    :data-source="dataSource"
    :columns="columns"
    row-key="id"
    :pagination="pagination"
    @pageChange="handlePageChange"
    @pageSizeChange="handlePageSizeChange"
  />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import clients from "@/entries/http/clients";
import { injectToken } from "@ruff-web/http/src/utils/formatters";
import { User } from "./User";
import { userdata } from "./pool";
import defineTableDataController from "@ruff-web/sdk/src/reactive/defineTableDataController";

const props = defineProps({
  isMobileDevice: Boolean,
});

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

const handleEdit = (record: any) => {
  alert(`编辑${record.name}`);
};

const handleDelete = (id: number) => {
  alert(`删除Id为[${id}]的用户`);
};

const client = clients.user.user.$getFriendlyProvider<
  never,
  "login",
  "profile",
  never,
  User
>();
const {
  dataSource,
  pagination,
  updateData,
  handlePageChange,
  handlePageSizeChange,
} = defineTableDataController({
  dataPool: userdata,
});
onMounted(() => {
  client
    .login({
      payload: {
        loginName: "demo",
        password: "123456",
        clientType: "Web",
      },
    })
    .then(async ({ data: { token } }) => {
      // console.log('userHttp.login token:', token)
      clients.user.beforeRequest = injectToken(() => token);
      updateData();
    })
    .catch((err) => {
      console.log("client.login err:", err);
    });
});
</script>
