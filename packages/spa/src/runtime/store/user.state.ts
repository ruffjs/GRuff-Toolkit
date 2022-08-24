import { Store } from "vuex"

export default {
  data: (storage: IStorage) => {
    const { read } = storage
    const token = read("user.token")
    const isAdmin = read("user.isAdmin")
    const isSuperAdmin = read("user.isSuperAdmin")
    const isBanned = read("user.isBanned")
    const info = token
      ? read<User>("user.info")
      : ({
          id: 0,
          email: "",
          name: "",
          nickname: "",
          level: "",
          groups: [],
        } as User)
    const meta = token ? read<User>("user.meta") : ({ name: "" } as AnyRecord)
    return {
      token,
      info,
      meta,
      isAdmin,
      isSuperAdmin,
      isBanned,
    }
  },
  getters: {
    signed(state: UserState) {
      return !!state.token
    },
  },
  actions: {
    updateAccount({ state, commit }: Store<any>, payload: any) {
      // console.log(payload)
      if (payload) {
        const { token, info, meta, admin, superuser, banned } = payload
        commit("storeState", {
          token,
          info,
          meta,
          isAdmin: admin || false,
          isSuperAdmin: superuser || false,
          isBanned: banned || false,
        })
      } else {
      }
    },
  },
}
