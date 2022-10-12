import lists from "./lists"
import mappings from "./mappings"

export const globalState = {
  lists: lists,
  mappings: mappings,
}

export const extendedGetters = {
  user: {
    isCarrier(state: UserState) {
      if (state.x?.level === "Member" && state.x?.roles) {
        return state.x.roles.some((item: any) =>
          ["CSCC", "CUCC", "CTCC"].includes(item.code)
        )
      }
      return false
    },
    isNormal(state: UserState) {
      if (state.x?.roles) {
        return state.x.roles.some((item: any) => item.code === "Normal")
      }
      return false
    },
    isPM(state: UserState) {
      if (state.x?.roles) {
        return state.x.roles.some((item: any) => item.code === "PM")
      }
      return false
    },
    isSuper(state: UserState) {
      if (state.x) {
        return state.x.level === "Admin"
      }
      return false
    },
  },
}
