import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default function useScreenInfos() {
  const store = useStore<RuffSPAState>();
  const mouse = reactive({
    x: 0,
    y: 0,
  });

  const isMobileDevice = computed(() => store.getters["app/isMobileDevice"]);
  const isDesktopDevice = computed(() => store.getters["app/isDesktopDevice"]);
  const getDeviceType = () => store.state.app.viewDeviceMode;
  const viewDeviceMode = computed(getDeviceType);

  onMounted(() => {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    });
  });

  return {
    isMobileDevice,
    isDesktopDevice,
    viewDeviceMode,
    getDeviceType,

    mouse,
  };
}
