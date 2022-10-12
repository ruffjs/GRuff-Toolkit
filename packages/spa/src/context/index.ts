import Context from "./Context";
import registerComponents from "./registerComponents";

export function withDefaults(pages: RuffSPAPageConfig[], defaults: DefaultPages) {
  const withDefaultsPages = pages as WithDefaultsPages;
  Object.assign(withDefaultsPages, defaults);
  return withDefaultsPages;
}

export function CreateSPAContext(configs?: CreateSPAContextConfiguration | undefined) {
  const runtime = Context.createInstance(configs);
  runtime.onInstalled = () => {
    registerComponents(Context.getCurrentVueInstance());
    if (typeof configs?.onInstalled === "function") {
      configs.onInstalled(runtime);
    }
    delete runtime.onInstalled;
  };
  return runtime;
}

export function getSPAContext() {
  return Context.getCurrentInstance();
}

export function getVueApp() {
  return Context.getCurrentVueInstance();
}
