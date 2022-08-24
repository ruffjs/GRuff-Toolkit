import createMutations from "./createMutations"

export default function (
  { data, getters, mutations, actions }: any,
  namespace: string,
  storage: RIAppStorage,
  extendedGetters?: Record<string, AnyFn>
) {
  return {
    namespaced: true,
    state(): AppState {
      if (typeof data === "function") {
        return {
          ...data(storage),
        }
      }
      return {
        ...data,
      }
    },
    getters: {
      ...extendedGetters,
      ...getters,
    },
    mutations: {
      ...createMutations(namespace, storage),
      ...mutations,
    },
    actions: {
      ...actions,
    },
  }
}
