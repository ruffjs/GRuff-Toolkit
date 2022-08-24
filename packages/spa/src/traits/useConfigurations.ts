import { computed } from "vue"
import { useStore } from "vuex"
const rootElement: HTMLElement = document.documentElement
const titleElement: HTMLTitleElement =
  document.head.querySelector("title") ||
  (() => {
    const element = document.createElement("title")
    document.head.appendChild(element)
    return element
  })()

export default function useConfigurations() {
  const store = useStore<RIRootState>()

  const isMobileDevice = computed(() => store.getters["app/isMobileDevice"])
  const isDesktopDevice = computed(() => store.getters["app/isDesktopDevice"])
  const getDeviceType = () => store.state.app.viewDeviceMode
  const viewDeviceMode = computed(getDeviceType)

  // 应用标题，显示于网页标题栏
  const getAppTitle = () => titleElement.innerHTML
  const appTitle = computed(getAppTitle)
  const setAppTitle = (title: string) => {
    titleElement.innerHTML = title
  }

  const getThemeMode = () => store.state.app.themeMode_custom
  const themeMode = computed(getThemeMode)
  const setThemeMode = (themeMode_custom: CustomThemeMode) => {
    let themeMode = store.state.app.themeMode_system
    if (["dark", "light"].includes(themeMode_custom) === true) {
      themeMode = themeMode_custom as ThemeMode
    }
    console.log(themeMode_custom, themeMode)
    store.commit("app/storeState", { themeMode_custom })
    rootElement.setAttribute("data-theme-mode", themeMode)
  }

  const getColorScheme = () => store.state.app.themeSchemeName
  const colorScheme = computed(getColorScheme)
  const setColorScheme = (themeSchemeName: string) => {
    store.commit("app/storeState", { themeSchemeName })
    rootElement.setAttribute("data-theme-scheme", themeSchemeName || "default")
  }

  const getComputedTheme = (): [CustomThemeMode, string] =>
    store.getters["app/computedTheme"]
  const computedTheme = computed(getComputedTheme)
  const setTheme = (
    themeMode_custom: CustomThemeMode,
    themeSchemeName: string
  ) => {
    let themeMode = store.state.app.themeMode_system
    if (["dark", "light"].includes(themeMode_custom) === true) {
      themeMode = themeMode_custom as ThemeMode
    }
    store.commit("app/storeState", { themeMode_custom, themeSchemeName })
    // console.log(themeMode)
    rootElement.setAttribute("data-theme-mode", themeMode)
    rootElement.setAttribute("data-theme-scheme", themeSchemeName || "default")
  }

  const isMenuCollapsed = computed(() => store.getters["app/isMenuCollapsed"])

  const getMenuStatus = () => store.state.app.menuStatus
  const menuStatus = computed(getMenuStatus)
  const setMenuStatus = (status: MenuStatus) => {
    console.log(11111111, status)
    store.commit("app/storeState", {
      menuStatus: status === "collapsed" ? "collapsed" : "unfolded",
    })
  }
  const toggleMenuStatus = () => {
    console.log(222222)
    store.commit("app/storeState", {
      menuStatus:
        store.state.app.menuStatus === "unfolded" ? "collapsed" : "unfolded",
    })
  }

  const getMenuItems = () => store.state.app.memuItems
  const menuItems = computed(getMenuItems)
  const getMenuKeyTargetMap = () => store.state.app.memuKeyTargetMap
  const memuKeyTargetMap = computed(getMenuKeyTargetMap)
  const setMenuItems = (memuItems: RIMenuItem[]) => {
    const map: MemuKeyTargetMap = {}
    const mapper = (item: RIMenuItem) => {
      map[item.key] = {
        ref: item.key,
      }
      if (item.link) {
        map[item.key].target = item.link
      }
      if (item.keys) {
        item.keys.forEach(key => {
          map[key] = {
            ...map[key],
            ref: item.key,
          }
        })
      }
      if (item.children) {
        item.children.forEach(mapper)
      }
    }
    memuItems.forEach(mapper)
    store.commit("app/assignState", { memuItems, memuKeyTargetMap: map })
  }

  return {
    isMobileDevice,
    isDesktopDevice,
    viewDeviceMode,
    getDeviceType,

    appTitle,
    getAppTitle,
    setAppTitle,

    themeMode,
    getThemeMode,
    setThemeMode,

    colorScheme,
    getColorScheme,
    setColorScheme,

    computedTheme,
    getComputedTheme,
    setTheme,

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
  }
}
