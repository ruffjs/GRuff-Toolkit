import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal, notification } from "ant-design-vue";
import { computed, createVNode } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
// import * as api from "@/utils/http/api"
// import { login } from "@/utils/clients/guestClient"
// import { notifyReqErr } from "@/utils/clients/helper"
// import { UserAttrType, UsrResourceType } from "@/utils/clients/types"
// import { getAttr } from "@/utils/clients/userClient"

export default function () {
  const store = useStore<RuffSPAState>();
  const router = useRouter();
  const route = useRoute();
  const userInfo = computed(() => store.state.user.info);

  const isSuper = computed(() => store.getters["user/isSuper"]);
  const isAdmin = computed(() => isSuper.value || store.getters["user/isPM"]);
  const isCommon = computed(
    () => isAdmin.value || store.getters["user/isNormal"]
  );

  const signIn = async (username: string, password: string) => {
    try {
      // const res = await api.login(username, password)
      // const { token, info: meta } = res.data as any
      // // console.log(token, meta)
      // store.dispatch("user/updateAccount", {
      //   token,
      //   info: {
      //     id: meta.id,
      //     email: meta.email,
      //     name: meta.name,
      //     nickname: meta.name,
      //     level: meta.level,
      //     groups: [...meta.roles],
      //   },
      //   meta,
      //   admin: meta.level === "Admin",
      //   superuser: meta.type === "Tenant",
      //   banned: false,
      // })
      // store.dispatch("lists/updateSites")
      // if (route.query.fromPath) {
      //   router.replace(route.query.fromPath as string)
      // } else {
      //   router.replace({
      //     name: "workspace/home",
      //   })
      // }
    } catch (error) {
      // console.log("handleSignInError", error)
      // if (
      //   error &&
      //   (error as any).response &&
      //   (error as any).response.data.message
      // ) {
      //   notification.error({
      //     message: "请求失败",
      //     description: (error as any).response.data.message,
      //   })
      // } else {
      //   console.log(error)
      // }
    }
  };

  const updateInfo = async () => {
    // TO-DO
    // 与服务器交互
    if (userInfo.value === null) return;
    try {
      // const res = await getAttr<UsrProfile>(
      //   UsrResourceType.UserAccount,
      //   info.value.id,
      //   UserAttrType.Profile
      // )
      // store.commit("user/storeState", {
      //   current: {
      //     id: res.data.id,
      //     name: res.data.name,
      //     level: res.data.level,
      //     roles: res.data.roles,
      //     projects: res.data.projects,
      //   },
      // })
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    Modal.confirm({
      // title: "退出登录",
      icon: createVNode(ExclamationCircleOutlined),
      content: "确定退出登录？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        store.commit("user/storeState", {
          token: "",
          current: null,
        });
        router.replace("/sign-in");
      },
    });
  };

  return {
    userInfo,
    isAdmin,
    isCommon,
    isSuper,

    signIn,
    updateInfo,
    // checkAuthByRoles,
    signOut,
  };
}
