import PageRouter from "./components/PageRouter.vue"
import Workspace from "./components/Workspace.vue"
import HomePage from "../../views/HomePage.vue"
import NotFoundPage from "../../views/NotFoundSigned.vue"
import ForbiddenPage from "../../views/Forbidden.vue"

import { Component } from "vue"

export default function combineRoutes({
  anonymousAccess,
  commonViews: { sign, notFound },
  pages,
}: Record<string, any> = {}) {
  const { home, forbidden: forbiddenPage, default: notFoundPage } = pages || {}
  let Home: Component
  switch (typeof home) {
    case "string":
      Home = {
        path: "",
        name: "home",
        alias: home,
        redirect: ("/" + home).replace("//", "/"),
      }
      break

    case "object":
      // console.log(home);
      if (home?.__name) {
        Home = {
          path: "",
          alias: "home",
          name: "home",
          component: home,
        }
      } else {
        Home = {
          path: "",
          alias: "home",
          name: "home",
          component: HomePage,
        }
      }
      break

    default:
      Home = {
        path: "",
        alias: "home",
        name: "home",
        component: HomePage,
      }
  }

  const unsignedRoutes: any[] = [
    { name: "interface-not-found", path: "404", component: notFound },
  ]
  const signedRoutes: any[] = []
  if (!anonymousAccess) {
    unsignedRoutes.push({
      name: "interface-sign-in",
      path: "sign-in",
      component: sign,
    })
    signedRoutes.push({
      path: "unexpected",
      component: PageRouter,
      children: [
        {
          name: "-user-page-forbidden",
          path: "403",
          component: forbiddenPage || ForbiddenPage,
        },
        {
          name: "-user-page-not-found",
          path: "404",
          component: notFoundPage || NotFoundPage,
        },
      ],
    })
  }

  return [
    ...unsignedRoutes,
    {
      path: "",
      name: "workspace",
      component: Workspace,
      children: [...signedRoutes, ...pages, Home],
    },
  ]
}
