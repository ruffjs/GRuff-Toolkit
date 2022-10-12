type StoredRecord<T> = {
  data: T;
  time: number;
};

type Size = {
  width: number;
  height: number;
};
type DeviceMode = "desktop" | "mobile";
type DeviceType = "desktop" | "mobile" | "tablet" | "high-d";
type ScreenAngleType = "landscape" | "portrait";
type ThemeMode = "dark" | "light";
type CustomThemeMode = ThemeMode | "system";
type MenuStatus = "unfolded" | "collapsed";

type Menu = {};
type MenuGroup = Menu[];
type MemuKeyTargetMap = Record<
  string,
  {
    ref: string;
    target?: string;
  }
>;

type ShotcutItem_Link = {
  type: "link";
  link: string;
  icon?: string;
  name?: string;
};
type ShotcutItem_DropDownItem = {
  key: string;
  onclick: AnyFn;
  name: string;
  icon?: string;
};
type ShotcutItem_DropDown = {
  type: "dropdown";
  name?: string;
  icon?: string;
  selected: string;
  items: ShotcutItem_DropDownItem[];
};
type ShotcutItem_Component<T extends Object = any> = {
  type: "component";
  component: T;
};
type ShotcutItem<T extends Object = any> =
  | ShotcutItem_Link
  | ShotcutItem_DropDown
  | ShotcutItem_Component<T>;

type AppState<T extends Object = any> = {
  viewport: number;
  viewDeviceMode: DeviceMode;
  viewDeviceType: DeviceType;
  viewAngleMode: ScreenAngleType;
  themeMode_system: ThemeMode;
  themeMode_custom: CustomThemeMode;
  themeSchemeName: string;
  menuStatus: MenuStatus;
  memuItems: RuffSPAMenuItem[];
  memuKeyTargetMap: MemuKeyTargetMap;
  shotcuts: ShotcutItem[];
};

type AppGetters = {
  theme: [ThemeMode, string];
};

type User = {
  email?: string;
  name: string;
  display?: string;
  levelLable?: string;
  usergroups?: string[];
};
type UserState = {
  token: string;
  uid: string | number;
  i: User;
  x: AnyRecord;
  isAdministrator: boolean;
  isHighestUser: boolean;
  isCurrentlyBanned: boolean;
};
