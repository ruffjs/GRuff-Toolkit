import { Router } from "vue-router";
import {
  App as VueApp,
  ComponentInternalInstance,
  h,
  defineComponent,
  getCurrentInstance,
} from "vue";
import Antd from "ant-design-vue";
import "../styles/antd/antd.variable.css";
import bricks from "@ruff-web/brix";
import icons from "@ruff-web/icons";
import { allocateStorage } from "@ruff-web/data-storage/index";
import createVuexStore from "./store/createVuexStore";
import createVueRouter from "./router/createVueRouter";
import NotFoundView from "../views/NotFound.vue";
import SignInView from "../views/SignIn.vue";
import { Store } from "vuex";
import Viewport from "./viewport/Viewport";
import TableWrappers from "@ruff-web/table-pro";
import tableCells from "@ruff-web/table-cells";
import formComponents from "@ruff-web/form";

const darkModeMedia =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

export default class Context implements IRuffSPAContext {
  private static currentInstance: Context;
  private static currentVueApp: VueApp;
  static createInstance(configs?: CreateSPAContextConfiguration | undefined) {
    if (!Context.currentInstance) {
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
        onRequestUserToken,
        onRequestUserData,
        onRequestPermission,
      } = configs || {};

      const storage = allocateStorage(
        storageConfig?.namespace || "RIA",
        storageConfig?.keys || {}
      );

      Object.assign(storage, {
        app: storage.createBucket("app"),
        user: storage.createBucket("user"),
      });

      const store = createVuexStore(
        globalState,
        storage as unknown as RuffAppStorage,
        extendedGetters
      );

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
      );
      // console.log(router);

      darkModeMedia.addEventListener("change", (e) => {
        const themeMode_system =
          (window as any).ReactNativeWebView || e.matches ? "dark" : "light";
        store.commit("app/storeState", {
          themeMode_system,
        });
        if (
          ["dark", "light"].includes(store.state.app.themeMode_custom) === false
        ) {
          document.documentElement.setAttribute(
            "data-theme-mode",
            themeMode_system
          );
        }
      });
      Context.currentInstance = new Context({
        storage,
        store,
        router,
        boundaries,
      });
      onCreate && onCreate(Context.currentInstance);

      if (onRequestUserToken) {
        Context.currentInstance._onRequestUserToken = onRequestUserToken;
      }
      if (onRequestUserData) {
        Context.currentInstance._onRequestUserData = onRequestUserData;
      }
      if (onRequestPermission) {
        Context.currentInstance._onRequestPermission = onRequestPermission;
      }
    }
    return Context.currentInstance;
  }
  static getCurrentInstance() {
    return Context.currentInstance;
  }
  static getCurrentVueInstance() {
    if (Context.currentVueApp) {
      return Context.currentVueApp;
    }
    return (getCurrentInstance() as ComponentInternalInstance).appContext.app;
  }

  private _installed: boolean = false;
  private _storage: IStorage;
  private _store: Store<RuffSPAState>;
  private _router: Router;

  get storage() {
    return this._storage as RuffAppStorage;
  }
  get store() {
    return this._store;
  }
  get router() {
    return this._router;
  }

  private constructor({ storage, store, router, boundaries }: any) {
    this._storage = storage;
    this._store = store;
    this._router = router;
    Viewport.createViewport(
      boundaries || [],
      (states: AnyRecord, persistent = false) =>
        persistent
          ? store.commit("app/storeState", states)
          : store.commit("app/assignState", states)
    );
    Context.currentInstance = this;
    this.requestToken = this.requestToken.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
  }

  static DEFAULT_USER_TOKEN =
    "#DEFAULT_USER_TOKEN:for_the_app_not_use_token_for_sign_in";
  private _onRequestUserToken(
    userState: UserState,
    payload: AnyRecord
  ): Promise<{ token: string; payload: AnyRecord }> {
    return Promise.resolve({ token: Context.DEFAULT_USER_TOKEN, payload: {} });
  }
  private _onRequestUserData(
    userState: UserState,
    uid: string | number
  ): Promise<AnyRecord> {
    return Promise.resolve({});
  }
  private _onRequestPermission(
    userState: UserState,
    acceesDescription: any
  ): Promise<unknown> {
    return Promise.resolve();
  }
  async requestToken(payload: AnyRecord) {
    return this._onRequestUserToken(this._store.state.user, payload);
  }
  async updateUserData(uid: string | number) {
    return this._onRequestUserData(this._store.state.user, uid);
  }
  async checkPermission(acceesDescription: any) {
    return this._onRequestPermission(this._store.state.user, acceesDescription);
  }

  onInstalled?: () => void;
  install(vueApp: VueApp) {
    // app.config.globalProperties.$router
    if (!this._installed) {
      // console.log("Vue App:", vueApp);
      Context.currentVueApp = vueApp;
      vueApp.config.errorHandler = (err, vm, info) => {
        console.log(err, vm, info);
      };
      vueApp.config.warnHandler = (err, vm, info) => {};

      vueApp
        .use(Antd)
        .use(icons)
        .use(bricks)
        .use(TableWrappers)
        .use(tableCells)
        .use(formComponents)
        .use(this._store)
        .use(this._router);
      this._installed = true;
      this.onInstalled && this.onInstalled();
    }
  }
}
