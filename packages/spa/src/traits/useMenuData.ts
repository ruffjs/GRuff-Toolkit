import { computed } from "vue";
import { useStore } from "vuex";

export default function () {
  const store = useStore<RuffSPAState>();
  const items = computed(() => store.state.app.memuItems);
  const linkMap: Record<string, string> = {};
  const keyMap: Record<string, string> = {};

  const update = (newItems: RuffSPAMenuItem[]) => {
    store.commit("app/storeState", {
      memuItems: newItems,
    });
  };

  const mapper = (item: RuffSPAMenuItem) => {
    keyMap[item.key] = item.key;
    if (item.link) {
      linkMap[item.key] = item.link;
    }
    if (item.keys) {
      item.keys.forEach((key) => {
        keyMap[key] = item.key;
      });
    }
    if (item.children) {
      item.children.forEach(mapper);
    }
  };
  items.value.forEach(mapper);
  return {
    items,
    update,
    linkMap,
    keyMap,
  };
}
