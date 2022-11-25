import { computed } from "vue";
import { useStore } from "vuex";

const rootElement: HTMLElement = document.documentElement;
const rootStyle = rootElement.style;

export default function useColorTheme() {
  const store = useStore<RuffSPAState>();

  const getThemeMode = () => store.state.app.themeMode_custom;
  const themeMode = computed(getThemeMode);
  const setThemeMode = (themeMode_custom: CustomThemeMode) => {
    let themeMode = store.state.app.themeMode_system;
    if (["dark", "light"].includes(themeMode_custom) === true) {
      themeMode = themeMode_custom as ThemeMode;
    }
    console.log(themeMode_custom, themeMode);
    store.commit("app/storeState", { themeMode_custom });
    rootElement.setAttribute("data-theme-mode", themeMode);
  };

  const getColorScheme = () => store.state.app.themeSchemeName;
  const colorScheme = computed(getColorScheme);
  const setColorScheme = (themeSchemeName: string) => {
    store.commit("app/storeState", { themeSchemeName });
    rootElement.setAttribute("data-theme-scheme", themeSchemeName || "default");
  };

  const getComputedTheme = (): [CustomThemeMode, string] =>
    store.getters["app/computedTheme"];
  const computedTheme = computed(getComputedTheme);
  const setTheme = (
    themeMode_custom: CustomThemeMode,
    themeSchemeName: string
  ) => {
    let themeMode = store.state.app.themeMode_system;
    if (["dark", "light"].includes(themeMode_custom) === true) {
      themeMode = themeMode_custom as ThemeMode;
    }
    store.commit("app/storeState", { themeMode_custom, themeSchemeName });
    // console.log(themeMode)
    rootElement.setAttribute("data-theme-mode", themeMode);
    rootElement.setAttribute("data-theme-scheme", themeSchemeName || "default");
  };

  const getStyleProp = (propName: string) =>
    rootStyle.getPropertyValue(propName);
  const setStyleProp = (
    propName: string,
    value: any,
    priority?: string | undefined
  ) => rootStyle.setProperty(propName, value, priority);

  const getComputedCSSProp = (propName: string) => {
    const computedStyle = getComputedStyle(rootElement);
    return computedStyle.getPropertyValue(propName);
  };

  const getCSSVarValue = (varName: string) => {
    return getComputedCSSProp(`--${varName}`);
  };

  return {
    themeMode,
    getThemeMode,
    setThemeMode,

    colorScheme,
    getColorScheme,
    setColorScheme,

    computedTheme,
    getComputedTheme,
    setTheme,

    getStyleProp,
    setStyleProp,
    getComputedCSSProp,
    getCSSVarValue,
  };
}
