import { createStore, Store } from "vuex";
import createVuexModule from "./createModule";
import appState from "./app.state";
import userState from "./user.state";

export default function createVuexStore(
  states: any,
  storage: RuffAppStorage,
  extendedGetters?: {
    app?: Record<string, AnyFn>;
    user?: Record<string, AnyFn>;
  }
) {
  const modules: Record<string, any> = {
    app: createVuexModule(
      appState,
      "app",
      storage as RuffAppStorage,
      extendedGetters?.app
    ),
    user: createVuexModule(
      userState,
      "user",
      storage as RuffAppStorage,
      extendedGetters?.user
    ),
  };
  Object.keys(states || []).forEach((namespace) => {
    if (namespace !== "app" && namespace !== "user") {
      const state = states[namespace];
      if (typeof state === "function") {
        const module = state(storage);
        if (module.data) {
          modules[namespace] = createVuexModule(
            module,
            namespace,
            storage as RuffAppStorage
          );
        }
      } else if (typeof state === "object" && state !== null) {
        modules[namespace] = createVuexModule(
          state,
          namespace,
          storage as RuffAppStorage
        );
      }
    } else {
      throw 'Custom module cannot name as "app" and "user"';
    }
  });
  return createStore<RuffSPAState>({ modules });
}
