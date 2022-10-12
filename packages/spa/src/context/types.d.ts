type DefaultPages = {
  home?: any;
  forbidden?: any;
  default?: any;
};
type WithDefaultsPages = Array<RuffSPAPageConfig> & DefaultPages;
interface IRuffSPAContext {
  storage: RuffAppStorage;
  store: Store<RuffSPAState>;
  router: Router;
}
type CreateSPAContextConfiguration = {
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
  onCreate?: (runtime: IRuffSPAContext) => void;
  onInstalled?: (runtime: IRuffSPAContext) => void;
  onRequestUserToken?: (userState: UserState, payload: AnyRecord) => Promise<{ token: string, payload: AnyRecord }>;
  onRequestUserData?: (userState: UserState, uid: string | number) => Promise<AnyRecord>;
  onRequestPermission?: (
    userState: UserState,
    acceesDescription: AnyRecord
  ) => Promise<unknown>;
};
