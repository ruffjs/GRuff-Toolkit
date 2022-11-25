interface IStorage {
  write: (key: string, data: any) => void;
  read: <T = any>(key: string) => T;
  delete: (key: string) => void;
  clear: () => void;
  createBucket: (namespace: string) => AnyRecord;
}

interface RuffAppStorage extends IStorage {
  app: AnyRecord;
  user: AnyRecord;
}

interface RuffSPA {
  use(plugin: any, ...options: any[]): RuffSPA;
  start(
    onStarted?: (...args: any[]) => void,
    onError?: (...args: any[]) => void
  ): void;

  onStarted?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;

  storage: RuffAppStorage;
}

interface RuffSPAOptions {
  [x: string]: any;
}

interface RuffSPAState {
  app: AppState;
  user: UserState;
}

interface RuffSPAPageConfig {
  name?: string;
  path: string;
  alias?: string | string[];
  component?: unknown;
  redirect?: unknown;
  children?: RuffSPAPageConfig[];
  accessBy?: any;
  meta?: Record<string | number | symbol, unknown>;
}

interface RuffSPAMenuItem {
  key: string;
  keys?: string[];
  name: string;
  icon?: string;
  link?: string;
  accessBy?: any;
  children?: RuffSPAMenuItem[];
}
