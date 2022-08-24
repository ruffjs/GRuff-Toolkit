import * as VueRouter from "vue-router"

import combineRoutes from "./combineRoutes"
import standardizeRoute from "./standardizeRoute"
import NProgress from "./NProgress"
import { Store } from "vuex"
import { getCurrentRuntime } from ".."

const checkAccessPermission = async (
  route: VueRouter.RouteLocationNormalized
) => {
  if (route.meta?._ruff_spa_accessDesc) {
    // console.log("to.meta", route.meta._ruff_spa_accessDesc)
    const runtime = getCurrentRuntime()
    const promises = (route.meta._ruff_spa_accessDesc as AnyArray).map(
      accessDesc => runtime.checkPermission(accessDesc)
    )

    try {
      await Promise.all(promises)
      return true
    } catch (error) {
      console.log("Check Access Permission Failed:", error)
      return false
    }
  }
  return true
}

export default function createVueRouter(
  options: Record<string, any> = {},
  store: Store<any>
) {
  const { anonymousAccess } = options || {}
  const routes = combineRoutes(options).map(standardizeRoute, {
    name: "",
  }) as VueRouter.RouteRecordRaw[]
  console.log("createAndUseRouter", routes)

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(), // VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  }) as VueRouter.Router

  router.afterEach((to, from, next) => {
    NProgress.done()
  })

  if (anonymousAccess) {
    router.beforeEach(async (to, from, next) => {
      NProgress.start()
      // 匹配到路由
      if (to.matched.length) {
        next()
      } else {
        next({ name: "interface-not-found" })
      }
    })
  } else {
    router.beforeEach(async (to, from, next) => {
      // const { usr } = app.storage
      NProgress.start()
      // 匹配到路由
      if (to.matched.length) {
        // 持照用户访问
        // console.log("__user.signed", store.getters["user/signed"])
        if (store.getters["user/signed"]) {
          // 具备访问改页面的权限
          const can = await checkAccessPermission(to)
          if (can) {
            // 即将访问登录页
            if (to.name === "interface-sign-in") {
              // 跳转至首页
              next("/")
            } else {
              if (
                to.name === "interface-not-found" &&
                router.hasRoute("workspace/unexpected/-user-page-not-found")
              ) {
                next({
                  name: "workspace/unexpected/-user-page-not-found",
                })
              } else {
                // 正常访问
                next()
              }
            }
          } else {
            if (router.hasRoute("workspace/unexpected/-user-page-forbidden")) {
              next({
                name: "workspace/unexpected/-user-page-forbidden",
              })
            } else {
              next("/")
            }
          }
        }
        // 匿名访问
        else {
          // 即将访问登录页或404页面
          if (
            to.name === "interface-sign-in" ||
            to.name === "interface-not-found"
          ) {
            // 正常访问
            next()
          }
          // 记录当前页，并跳转至登录页
          else {
            next("/sign-in/?from=" + to.path)
          }
        }
      } else {
        // console.log('user/signed', store.getters["user/signed"])
        if (
          store.getters.signed &&
          router.hasRoute("workspace/unexpected/-user-page-not-found")
        ) {
          next({
            name: "workspace/unexpected/-user-page-not-found",
          })
        } else {
          next({ name: "interface-not-found" })
        }
      }
    })
  }
  return router
}
