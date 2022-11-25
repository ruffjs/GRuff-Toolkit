<template>
  <router-view v-slot="{ Component, route }">
    <slot v-if="String(route.name || '').startsWith('workspace') && slots.default" />
    <component
      v-else
      :is="Component"
      :key="route.meta.usePathKey ? route.path : route.name"
    />
  </router-view>
</template>

<script setup lang="tsx">
import { onErrorCaptured, onMounted, useSlots, watch } from "vue";
// import { ConfigProvider } from "ant-design-vue";
import { registerTheme } from "../styles/antd/cssVariables";

import useGeneralSettings from "../reactive/useGeneralSettings";
import useColorTheme from "../reactive/useColorTheme";

const { name } = defineProps({
  name: String,
});

const slots = useSlots();
const { setAppTitle } = useGeneralSettings();
const {
  computedTheme,
  setTheme,
  getThemeMode,
  getColorScheme,
  getCSSVarValue,
} = useColorTheme();

watch(
  computedTheme,
  () => {
    // ConfigProvider.config({
    //   theme: {
    //     primaryColor: getCSSVarValue("highlight-color"), // 全局主色
    //     successColor: getCSSVarValue("positive-color"), // 成功色
    //     warningColor: getCSSVarValue("negative-color-secondary"), // 警告色
    //     errorColor: getCSSVarValue("negative-color"), // 错误色
    //     infoColor: getCSSVarValue("highlight-color-secondary"),
    //   } as any,
    // });
    registerTheme("ant", {
      primaryColor: getCSSVarValue("highlight-color"), // 全局主色
      successColor: getCSSVarValue("positive-color"), // 成功色
      warningColor: getCSSVarValue("negative-color-secondary"), // 警告色
      errorColor: getCSSVarValue("negative-color"), // 错误色
      infoColor: getCSSVarValue("highlight-color-secondary"),
    } as any);
  }
  // { immediate: true }
);

onMounted(() => {
  console.log("Application Mounted", new Date());
  setAppTitle(name || "");
  setTheme(getThemeMode(), getColorScheme());
  // ConfigProvider.config({
  //   theme: {
  //     primaryColor: getCSSVarValue("highlight-color"), // 全局主色
  //     successColor: getCSSVarValue("positive-color"), // 成功色
  //     warningColor: getCSSVarValue("negative-color-secondary"), // 警告色
  //     errorColor: getCSSVarValue("negative-color"), // 错误色
  //     infoColor: getCSSVarValue("highlight-color-secondary"),
  //   } as any,
  // });
  registerTheme("ant", {
    primaryColor: getCSSVarValue("highlight-color"), // 全局主色
    successColor: getCSSVarValue("positive-color"), // 成功色
    warningColor: getCSSVarValue("negative-color-secondary"), // 警告色
    errorColor: getCSSVarValue("negative-color"), // 错误色
    infoColor: getCSSVarValue("highlight-color-secondary"),
  } as any);
});

onErrorCaptured((hook, target, info) => {
  console.log(hook, target, info);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: 100%;
  --sideMenuBackground: black;
}
</style>
