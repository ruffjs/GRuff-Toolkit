import Runtime from "./Runtime";
import registerComponents from "./registerComponents";

export function withDefaults(
  pages: RuffSPAPageConfig[],
  defaults: DefaultPages
) {
  const withDefaultsPages = pages as WithDefaultsPages;
  Object.assign(withDefaultsPages, defaults);
  return withDefaultsPages;
}

export function createRuntime(
  configs?: CreateRuntimeConfiguration | undefined
) {
  const runtime = Runtime.createInstance(configs);
  runtime.onInstalled = () => {
    registerComponents(Runtime.getCurrentVueInstance());
    if (typeof configs?.onInstalled === "function") {
      configs.onInstalled(runtime);
    }
    delete runtime.onInstalled;
  };
  return runtime;
}

export function getCurrentRuntime() {
  return Runtime.getCurrentInstance();
}

export function getCurrentVueApp() {
  return Runtime.getCurrentVueInstance();
}
