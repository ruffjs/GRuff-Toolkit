import { ConfigEnv, UserConfigExport } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [jsx({}), vue()],
    resolve: {
      alias: {
        "@ruff-web": resolve(__dirname, "packages"),
        "@": resolve(__dirname, "demos"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: "@root-entry-name: default;",
        },
      },
    },
    server: {
      port: 3721,
      proxy: {
        "/test-dev-svc": {
          target: "https://test-dev-svc.ruffcorp.com/",
          changeOrigin: true,
          rewrite(path: string) {
            console.log(
              "/test-dev-svc",
              path,
              "to",
              path.replace("/test-dev-svc", "")
            );
            return path.replace("/test-dev-svc", "");
          },
        },
        "/test-user-svc": {
          target: "https://test-user-svc.ruffcorp.com/",
          changeOrigin: true,
          rewrite(path: string) {
            console.log(
              "/test-user-svc",
              path,
              "to",
              path.replace("/test-user-svc", "")
            );
            return path.replace("/test-user-svc", "");
          },
        },
      },
    },
    build: {
      sourcemap: false,
    },
  };
};
