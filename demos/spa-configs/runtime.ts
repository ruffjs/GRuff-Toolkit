import { createRuntime, withDefaults } from "@ruff-web/spa/src/runtime";

import storageConfig from "./storage";
import { globalState, extendedGetters } from "./states";
import pages from "./pages";

import "../styles/index.scss";
import { PlaceholderPage } from "@ruff-web/spa";
import { createVNode, defineComponent } from "vue";

export default createRuntime({
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
    // default: PageNotFound,
  }),
  async onPermissionCheck(userState: UserState, acceesDescription: any) {
    // console.log("onPermissionCheck", userState, acceesDescription?.roles)
    if (acceesDescription === "谁都不可访问") {
      return Promise.reject({ reason: "谁都不可访问" });
    }
    if (userState.isSuperAdmin) return true;
    if (acceesDescription?.roles?.length) {
      if (
        userState.info?.groups &&
        userState.info?.groups.some((group: any) =>
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
