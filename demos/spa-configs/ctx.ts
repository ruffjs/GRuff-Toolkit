import { CreateSPAContext, withDefaults } from "@ruff-web/spa/src/context";

import storageConfig from "./storage";
import { globalState, extendedGetters } from "./states";
import pages from "./pages";
import PageNotFound from "../spa-views/errors/PageNotFound.vue";

import "../styles/index.scss";
import { PlaceholderPage } from "@ruff-web/spa";
import { createVNode, defineComponent } from "vue";
import clients from "@/entries/http/clients";

export default CreateSPAContext({
  anonymousAccess: false,
  storageConfig,
  globalState,
  extendedGetters,
  //   signInView: ViewSignIn,
  //   notFoundView: ViewNotFound,
  pages: withDefaults(pages, {
    home: "/monitor/history",
    // home: PlaceholderPage,
    // home: defineComponent(PlaceholderPage as {}),
    // home: () => createVNode("div", {}, "Hello, world"), // FunctionalComponent
    // forbidden: PageForbidden,
    default: PageNotFound,
  }),
  async onRequestPermission(userState: UserState, acceesDescription: any) {
    // console.log("onRequestPermission", userState, acceesDescription?.roles)
    if (acceesDescription === "谁都不可访问") {
      return Promise.reject({ reason: "谁都不可访问" });
    }
    if (userState.isHighestUser) return true;
    if (acceesDescription?.roles?.length) {
      if (
        userState.i?.usergroups &&
        userState.i?.usergroups.some((group: any) =>
          acceesDescription.roles.some(
            (role: any) =>
              <number>role === group.id || <string>role === group.code
          )
        )
      ) {
        return Promise.resolve();
      }
      return Promise.reject();
    }
    return Promise.resolve();
  },
  async onRequestUserData(userState: UserState, uid: string | number) {
    try {
      // console.log(userState, uid)
      const res: any = await clients.user.user(uid).profile();
      return {
        uid: res.id,
        email: res.email,
        username: res.email || res.phone,
        display: res.name,
        admin: res.level === "Admin",
        banned: false,
        levelLable: res.level,
        usergroups: res.roles,
        custom: res.$raw,
      };
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  },
  onCreate({ storage, store }) {
    // client.onTokenRequired = () => {
    //   // console.log(storage.user.token, store.state.user.token)
    //   if (storage.user.token) {
    //     // storage.read('usr.token')
    //     return storage.user.token;
    //   }
    //   return undefined;
    // };
  },
});
