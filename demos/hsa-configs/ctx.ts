import { CreateSPAContext, withDefaults } from "@ruff-web/spa/src/context";
import pages from "./pages";
import PageNotFound from "../hsa-views/errors/PageNotFound.vue";
import "../styles/index.scss";

import clients from "@/entries/http/clients";

export default CreateSPAContext({
  storageConfig: {
    namespace: "HSA",
    keys: {
      strings: ['usr.token', "user.uid"],
    }
  },
  anonymousAccess: true,
  pages: withDefaults(pages, {
    home: "/home",
    default: PageNotFound,
  }),
  async onRequestUserData(userState: UserState, uid: string | number) {
    try {
      // console.log(userState, uid)
      const res: any = await clients.user.user(uid).profile()
      return {
        uid: res.id,
        email: res.email,
        username: res.email || res.phone,
        display: res.name,
        admin: res.level === "Admin",
        banned: false,
        levelLable: res.level,
        usergroups: res.roles,
        custom: res.$raw
      }
    } catch (error) {
      console.log(error)
      return Promise.reject();
    }

  },
  async onRequestPermission(userState: UserState, acceesDescription: any) {
    return Promise.resolve();
  },
});