import lists from "./lists"
import mappings from "./mappings"

export const globalState = {
  lists: lists,
  mappings: mappings,
}

export const extendedGetters = {
  user: {
    isCarrier(state: UserState) {
      if (state.meta?.level === "Member" && state.meta?.roles) {
        return state.meta.roles.some((item: any) =>
          ["CSCC", "CUCC", "CTCC"].includes(item.code)
        )
      }
      return false
    },
    isNormal(state: UserState) {
      if (state.meta?.roles) {
        return state.meta.roles.some((item: any) => item.code === "Normal")
      }
      return false
    },
    isPM(state: UserState) {
      if (state.meta?.roles) {
        return state.meta.roles.some((item: any) => item.code === "PM")
      }
      return false
    },
    isSuper(state: UserState) {
      if (state.meta) {
        return state.meta.level === "Admin"
      }
      return false
    },
  },
}
