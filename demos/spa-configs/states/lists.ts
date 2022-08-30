import { Store } from "vuex";
// import * as api from "../../utils/http/api"

export default {
  data: {
    sites: [],
    sitesWithAll: [],
    roles: [],
  },
  actions: {
    async updateSites({ commit }: Store<any>) {
      // const project = (await api.getSite({})) as any
      // console.log(project)
      // commit("assignState", {
      //   sites: project.data,
      //   sitesWithAll: [
      //     ...project.data,
      //     {
      //       name: "全部站点",
      //       id: -1,
      //     },
      //   ],
      // })
    },
    async updateRoles({ commit }: Store<any>) {
      // const res = (await api.getRole()) as any
      // // console.log(res.data.data.content);
      // commit("assignState", { roles: res.data.content })
    },
  },
};
