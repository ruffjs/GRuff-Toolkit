const strings = [
  "app.themeMode",
  "app.colorMode",
  "app.menuMode",
  "usr.token",
] as const

const numbers = [""] as const

const booleans = ["app.isMenuCollapsed"] as const

const others = [
  "app.areas",
  "user.current",
  "user.roles",
  "user.projects",
] as const

export default {
  namespace: "RTM",
  keys: {
    strings,
    numbers,
    booleans,
    others,
  },
}
