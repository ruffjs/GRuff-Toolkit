<template>
  <a-dropdown placement="bottomRight">
    <b-touchable :padding="[20, 10]" row>
      <box>
        <txt class="top-bar-text">{{ theme }}</txt>
      </box>
    </b-touchable>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[themeMode]">
        <a-menu-item key="light" @click="setThemeMode('light')">浅色 </a-menu-item>
        <a-menu-item key="dark" @click="setThemeMode('dark')"> 深色 </a-menu-item>
        <a-menu-item key="system" @click="setThemeMode('system')"> 自动 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { computed } from "vue";
import useConfigurations from "../../traits/useConfigurations";

const map = {
  light: "浅色",
  dark: "深色",
  system: "自动",
};
const { themeMode, setThemeMode } = useConfigurations();
const theme = computed(() => {
  console.log(themeMode.value);
  return map[themeMode.value];
});
</script>
<style lang="scss" scoped></style>
