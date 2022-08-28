import { Router } from "vue-router"
import {
  App as VueApp,
  ComponentInternalInstance,
  getCurrentInstance,
} from "vue"
import Antd from "ant-design-vue"
import "../styles/antd/antd.variable.css"
import bricks from "@ruff-web/bricks"
import icons from "@ruff-web/icons"
import { allocateStorage } from "@ruff-web/data-storage/index"
import createVuexStore from "./store/createVuexStore"
import createVueRouter from "./router/createVueRouter"
import NotFoundView from "../views/NotFound.vue"
import SignInView from "../views/SignIn.vue"
import { Store } from "vuex"
import Viewport from "./viewport/Viewport"
import TableWrappers from "@ruff-web/table-wrappers"
import tableCells from "@ruff-web/table-cells"

const darkModeMedia =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")

export default class Runtime implements RIRuntime {
  private static currentInstance: Runtime
  private static currentVueApp: VueApp
  static createInstance(configs?: CreateRuntimeConfiguration | undefined) {
    if (!Runtime.currentInstance) {
      const {
        storageConfig,
        anonymousAccess,
        globalState,
        extendedGetters,
        signInView,
        notFoundView,
        pages,
        boundaries,
        onCreate,
        onPermissionCheck,
      } = configs || {}

      const storage = allocateStorage(
        storageConfig?.namespace || "RIA",
        storageConfig?.keys || {}
      )

      Object.assign(storage, {
        app: storage.createBucket("app"),
        user: storage.createBucket("user"),
      })

      const store = createVuexStore(
        globalState,
        storage as RIAppStorage,
        extendedGetters
      )

      const router = createVueRouter(
        {
          anonymousAccess,
          commonViews: {
            sign: signInView || SignInView,
            notFound: notFoundView || NotFoundView,
          },
          pages,
        },
        store
      )

      darkModeMedia.addEventListener("change", e => {
        const themeMode_system =
          (window as any).ReactNativeWebView || e.matches ? "dark" : "light"
        store.commit("app/storeState", {
          themeMode_system,
        })
        if (
          ["dark", "light"].includes(store.state.app.themeMode_custom) === false
        ) {
          document.documentElement.setAttribute(
            "data-theme-mode",
            themeMode_system
          )
        }
      })

      onCreate &&
        onCreate(
          (Runtime.currentInstance = new Runtime({
            storage,
            store,
            router,
            boundaries,
          }))
        )

      if (onPermissionCheck) {
        Runtime.currentInstance._onPermissionCheck = onPermissionCheck
      }
    }
    return Runtime.currentInstance
  }
  static getCurrentInstance() {
    return Runtime.currentInstance
  }
  static getCurrentVueInstance() {
    if (Runtime.currentVueApp) {
      return Runtime.currentVueApp
    }
    return (getCurrentInstance() as ComponentInternalInstance).appContext.app
  }

  private _installed: boolean = false
  private _storage: IStorage
  private _store: Store<RIRootState>
  private _router: Router

  get storage() {
    return this._storage as RIAppStorage
  }
  get store() {
    return this._store
  }
  get router() {
    return this._router
  }

  private constructor({ storage, store, router, boundaries }: any) {
    this._storage = storage
    this._store = store
    this._router = router
    Viewport.createViewport(
      boundaries || [],
      (states: AnyRecord, persistent = false) =>
        persistent
          ? store.commit("app/storeState", states)
          : store.commit("app/assignState", states)
    )
    Runtime.currentInstance = this
  }

  private _onPermissionCheck(
    userState: UserState,
    acceesDescription: any
  ): Promise<unknown> {
    return Promise.resolve()
  }
  async checkPermission(acceesDescription: any) {
    return this._onPermissionCheck(this._store.state.user, acceesDescription)
  }

  onInstalled?: () => void
  install(vueApp: VueApp) {
    // app.config.globalProperties.$router
    if (!this._installed) {
      console.log("Vue App:", vueApp)
      Runtime.currentVueApp = vueApp
      vueApp.config.errorHandler = (err, vm, info) => {
        console.log(err, vm, info)
      }
      vueApp.config.warnHandler = (err, vm, info) => { }
      vueApp
        .use(Antd)
        .use(icons)
        .use(bricks)
        .use(TableWrappers)
        .use(tableCells)
        .use(this.store)
        .use(this.router)
      this._installed = true
      this.onInstalled && this.onInstalled()
    }
  }
}
