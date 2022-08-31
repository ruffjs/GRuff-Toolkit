import { defineComponent, DefineComponent, VNode } from "vue";
import { useRouter } from "vue-router";

export default function usePageRoutes() {
  const router = useRouter();

  const getRoutes = () =>
    router.getRoutes().filter((route) => {
      if (route.name) {
        const name = route.name.toString();
        if (name.startsWith("workspace/")) {
          if (name.startsWith("workspace/unexpected")) {
            return false;
          }
          return true;
        }
      }
      return false;
    });

  const findRoute = (path: string) =>
    getRoutes().find(({ name }) => (name = `workspace/${path}`));

  const resetHomePage = (newHomePage: string | DefineComponent | Function) => {
    const homeRoute = getRoutes().find(
      ({ name }) => (name = "workspace/-home-page")
    );
    if (homeRoute) {
      switch (typeof newHomePage) {
        case "string":
          homeRoute.redirect = newHomePage;
          homeRoute.components = undefined;
          break;

        case "object":
          homeRoute.redirect = undefined;
          homeRoute.components = {
            default: defineComponent(newHomePage as {}),
          };
          break;

        case "function":
          homeRoute.redirect = undefined;
          homeRoute.components = {
            default: newHomePage as AnyFn<any, VNode>,
          };
          break;
      }
    }
  };

  return {
    getRoutes,
    findRoute,
    resetHomePage,
  };
}
