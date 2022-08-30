type DefaultPages = {
  home?: any;
  forbidden?: any;
  default?: any;
};
type WithDefaultsPages = Array<RuffSPAPageConfig> & DefaultPages;
interface RIRuntime {
  storage: RuffAppStorage;
  store: Store<RuffSPAState>;
  router: Router;
}
type CreateRuntimeConfiguration = {
  storageConfig?: any;
  anonymousAccess?: boolean;
  globalState?: any;
  extendedGetters?: {
    app?: Record<string, AnyFn>;
    user?: Record<string, AnyFn>;
  };
  signInView?: any;
  notFoundView?: any;
  pages?: WithDefaultsPages;
  boundaries?: number[];
  onCreate(runtime: RIRuntime);
  onInstalled?: (runtime: RIRuntime) => void;
  onPermissionCheck(
    userState: UserState,
    acceesDescription: AnyRecord
  ): Promise<unknown>;
};
