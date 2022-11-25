import { Component, computed } from "vue";
import { useStore } from "vuex";

export default function useTopbarSettings() {
  const store = useStore<RuffSPAState>();

  const getShotcuts = (): ShotcutItem<Component>[] => store.state.app.shotcuts;
  const shotcuts = computed(getShotcuts);
  const setShotcuts = (shotcuts: ShotcutItem[]) => {
    store.commit("app/assignState", { shotcuts });
  };

  return {
    getShotcuts,
    shotcuts,
    setShotcuts,
  };
}
