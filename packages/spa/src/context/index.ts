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


export function extractMenuFromRoutes(routes: RuffSPAPageConfig[], prefix = ""): RuffSPAMenuItem[] {
  return routes.filter(route => route.path && route.meta?.name).map(route => {
    const path = prefix + route.path
    const link = "/" + path
    const key = "workspace" + link
    if (route.children && prefix === '') {
      const children = extractMenuFromRoutes(route.children, path + "/")
      return {
        key,
        keys: [key],
        name: route.meta?.name || "(Untitled)",
        icon: route.meta?.icon || undefined,
        children
      } as RuffSPAMenuItem
    }
    return {
      key,
      keys: [key],
      name: route.meta?.name || "(Untitled)",
      icon: route.meta?.icon || undefined,
      link,
    } as RuffSPAMenuItem
  })
}

export function orderMenuItems(menu: RuffSPAMenuItem[], prefix = ""): RuffSPAMenuItem[] {
  return menu.map((item, index) => ({
    ...item,
    name: `${prefix}${index + 1} ${item.name}`,
    children: item.children ? orderMenuItems(item.children, `${index + 1}.`) : undefined,
  }))
}