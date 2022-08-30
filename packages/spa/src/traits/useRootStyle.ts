import { computed } from "vue";
import { useStore } from "vuex";
const rootElement = document.documentElement;
const style = rootElement.style;

export default function useRootStyle() {
  const { getters } = useStore<RuffSPAState>();
  const theme = computed(() => getters["app/computedTheme"]);
  const getProp = (propName: string) => style.getPropertyValue(propName);
  const setProp = (
    propName: string,
    value: any,
    priority?: string | undefined
  ) => style.setProperty(propName, value, priority);

  const getComputedProp = (propName: string) => {
    const computedStyle = getComputedStyle(rootElement);
    return computedStyle.getPropertyValue(propName);
  };

  const getVarValue = (varName: string) => {
    return getComputedProp(`--${varName}`);
  };

  return {
    theme,
    getProp,
    setProp,
    getComputedProp,
    getVarValue,
  };
}
