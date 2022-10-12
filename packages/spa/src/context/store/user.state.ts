import { Store } from "vuex"

export default {
  data: (storage: IStorage): UserState => {
    const { read } = storage
    const token = read("user.token")
    const uid = read("user.uid")
    const isAdministrator = read("user.isAdministrator")
    const isHighestUser = read("user.isHighestUser")
    const isCurrentlyBanned = read("user.isCurrentlyBanned")
    const i = token
      ? read<User>("user.basic-info")
      : ({
        id: 0,
        email: "",
        name: "",
        nickname: "",
        level: "",
        groups: [],
      } as User)
    const x = token ? read<User>("user.custom-data") : ({ name: "" } as AnyRecord)
    return {
      uid,
      token,
      i,
      x,
      isAdministrator,
      isHighestUser,
      isCurrentlyBanned,
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
        const {
          uid,
          email,
          username,
          display,
          admin, banned,
          levelLable,
          usergroups,
          custom
        } = payload
        commit("storeState", {
          uid,
          i: {
            email: email || "",
            name: username || "",
            display: display || username || "(无名)",
            levelLable,
            usergroups,
          },
          x: custom || {},
          isAdministrator: !!payload.super || !!admin,
          isHighestUser: !!payload.super,
          isCurrentlyBanned: !!banned,
        })
      } else {
      }
    },
  },
}
