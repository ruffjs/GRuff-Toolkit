import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { computed, createVNode } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getSPAContext } from "../context";
// import * as api from "@/utils/http/api"
// import { login } from "@/utils/clients/guestClient"
// import { notifyReqErr } from "@/utils/clients/helper"
// import { UserAttrType, UsrResourceType } from "@/utils/clients/types"
// import { getAttr } from "@/utils/clients/userClient"

export default function useUserPassport() {
  const store = useStore<RuffSPAState>();
  const router = useRouter();
  const route = useRoute();
  const profile = computed(() => ({
    ...store.state.user.x,
    ...store.state.user.i
  }));

  const isBanned = computed(() => store.getters["user/isCurrentlyBanned"]);
  const isSuper = computed(() => store.getters["user/isHighestUser"]);
  const isAdmin = computed(() => isSuper.value || store.getters["user/isAdministrator"]);

  const signIn = async (data: AnyRecord, token?: string) => {
    store.dispatch("user/updateAccount", data)
    if (token) {
      const { storage } = getSPAContext()
      storage.user.token = token
      if (route.query.fromPath) {
        router.replace(route.query.fromPath as string)
      } else {
        router.replace({
          name: "workspace/home",
        })
      }
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
    profile,
    isAdmin,
    isBanned,
    isSuper,

    signIn,
    signOut,
  };
}
