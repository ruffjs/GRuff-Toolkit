export default {
  data: (storage: IStorage) => {
    const { read } = storage
    const darkModeMedia: MediaQueryList =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")

    return {
      viewport: 1,
      viewDeviceMode: "desktop",
      viewDeviceType: "desktop",
      viewAngleMode: "landscape",
      themeMode_system: darkModeMedia.matches ? "dark" : "light",
      themeMode_custom: read("app.themeMode_custom") || "system",
      themeSchemeName: read("app.themeSchemeName") || "default",
      menuStatus: read("app.menuStatus") || "unfolded",
      memuItems: [],
      memuKeyTargetMap: {},
      slots: {
        view404: null,
        page404: null,
        page403: null,
      },
    } as AppState
  },
  getters: {
    isMobileDevice(state: AppState) {
      return state.viewDeviceMode === "mobile"
    },
    isDesktopDevice(state: AppState) {
      return state.viewDeviceMode === "desktop"
    },
    computedTheme: (state: AppState, getters: AppGetters) => {
      let themeMode = state.themeMode_custom
      if (["dark", "light"].includes(themeMode) === false) {
        themeMode = state.themeMode_system
      }
      return [themeMode, state.themeSchemeName]
    },
    isMenuCollapsed(state: AppState) {
      return state.menuStatus === "collapsed"
    },
  },
}
