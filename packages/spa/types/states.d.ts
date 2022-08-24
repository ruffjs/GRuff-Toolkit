type StoredRecord<T> = {
  data: T
  time: number
}

type Size = {
  width: number
  height: number
}
type DeviceMode = "desktop" | "mobile"
type DeviceType = "desktop" | "mobile" | "tablet" | "high-d"
type ScreenAngleType = "landscape" | "portrait"
type ThemeMode = "dark" | "light"
type CustomThemeMode = ThemeMode | "system"
type MenuStatus = "unfolded" | "collapsed"

type Menu = {}
type MenuGroup = Menu[]
type MemuKeyTargetMap = Record<
  string,
  {
    ref: string
    target?: string
  }
>

type AppState = {
  viewport: number
  viewDeviceMode: DeviceMode
  viewDeviceType: DeviceType
  viewAngleMode: ScreenAngleType
  themeMode_system: ThemeMode
  themeMode_custom: CustomThemeMode
  themeSchemeName: string
  menuStatus: MenuStatus
  memuItems: RIMenuItem[]
  memuKeyTargetMap: MemuKeyTargetMap
}

type AppGetters = {
  theme: [ThemeMode, string]
}

type User = {
  id?: number
  email?: string
  name: string
  nickname?: string
  level?: string
  groups?: string[]
}
type UserState = {
  token: string
  info: User
  meta: AnyRecord
  isAdmin: boolean
  isSuperAdmin: boolean
  isBanned: boolean
}
