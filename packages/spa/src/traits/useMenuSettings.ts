import { computed } from "vue";
import { useStore } from "vuex";

export default function useMenuSettings() {
  const store = useStore<RuffSPAState>();

  const isMenuCollapsed = computed(() => store.getters["app/isMenuCollapsed"]);

  const getMenuStatus = () => store.state.app.menuStatus;
  const menuStatus = computed(getMenuStatus);
  const setMenuStatus = (status: MenuStatus) => {
    store.commit("app/storeState", {
      menuStatus: status === "collapsed" ? "collapsed" : "unfolded",
    });
  };
  const toggleMenuStatus = () => {
    store.commit("app/storeState", {
      menuStatus:
        store.state.app.menuStatus === "unfolded" ? "collapsed" : "unfolded",
    });
  };

  const getMenuItems = () => store.state.app.memuItems;
  const menuItems = computed(getMenuItems);
  const getMenuKeyTargetMap = () => store.state.app.memuKeyTargetMap;
  const memuKeyTargetMap = computed(getMenuKeyTargetMap);
  const setMenuItems = (memuItems: RuffSPAMenuItem[]) => {
    const map: MemuKeyTargetMap = {};
    const mapper = (item: RuffSPAMenuItem) => {
      map[item.key] = {
        ref: item.key,
      };
      if (item.link) {
        map[item.key].target = item.link;
      }
      if (item.keys) {
        item.keys.forEach((key) => {
          map[key] = {
            ...map[key],
            ref: item.key,
          };
        });
      }
      if (item.children) {
        item.children.forEach(mapper);
      }
    };
    memuItems.forEach(mapper);
    store.commit("app/assignState", { memuItems, memuKeyTargetMap: map });
  };

  return {
    isMenuCollapsed,
    menuStatus,
    getMenuStatus,
    setMenuStatus,
    toggleMenuStatus,

    menuItems,
    memuKeyTargetMap,
    getMenuKeyTargetMap,
    getMenuItems,
    setMenuItems,
  };
}
