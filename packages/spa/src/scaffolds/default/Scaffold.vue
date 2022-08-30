<template>
  <DualModesView>
    <template #mobile>
      <box width="100vw" height="100vh" overflow="hidden">
        <b-box
          :flex="1"
          row
          width="calc(100vw + 256px)"
          :margin-left="isMenuCollapsed ? -256 : 0"
          style="transition: margin-left 0.15s ease-in-out"
        >
          <box
            :width="256"
            height="100vh"
            column
            background="var(--ruff-side-bar-background)"
          >
            <Logo :logo="props.logo" :title="props.name" />
            <Menu v-if="props.menu" />
            <box v-else flex="1" height="calc(100vh - 64px)" style="overflow-y: auto">
              <slot name="memu" />
            </box>
          </box>
          <box :flex="1" height="100vh">
            <box width="100vw" :height="64">
              <TopBar />
            </box>
            <box
              :flex="1"
              width="100vw"
              height="calc(100vh - 64px)"
              background="var(--ruff-workspace-background)"
            >
              <router-view />
            </box>
          </box>
        </b-box>
      </box>
    </template>
    <template #desktop>
      <b-box :flex="1" row width="100vw">
        <box
          :width="isMenuCollapsed ? 80 : 256"
          column
          background="var(--ruff-side-bar-background)"
        >
          <Logo :logo="props.logo" :title="props.name" />
          <Menu v-if="props.menu" />
          <box v-else flex="1" height="calc(100vh - 64px)" style="overflow-y: auto">
            <slot name="memu" />
          </box>
        </box>
        <box
          :flex="1"
          :width="isMenuCollapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 256px)'"
        >
          <box width="100%" :height="64">
            <TopBar />
          </box>
          <box
            :flex="1"
            width="100%"
            height="calc(100vh - 64px)"
            background="var(--ruff-workspace-background)"
          >
            <router-view />
          </box>
        </box>
      </b-box>
    </template>
    <div>Hello</div>
  </DualModesView>
</template>

<script setup lang="ts">
import { Component, watch } from "vue";

import useConfigurations from "../../traits/useConfigurations";
import logoSrc from "../../assets/images/logo.png";

import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
import TopBar from "./TopBar.vue";
import DualModesView from "../../components/slots-views/DualModesView.vue";

const props = defineProps({
  logo: {
    type: String,
    default: logoSrc,
  },
  name: {
    type: String,
    default: "Ruff IoT SPA",
  },
  menu: Array as () => RuffSPAMenuItem[],
  shotcuts: {
    type: Array as () => ShotcutItem<Component>[],
    default: [],
  },
});
const { isMenuCollapsed, setMenuItems, setShotcuts } = useConfigurations();
watch(
  () => props.menu,
  (menu) => {
    setMenuItems(menu || []);
  },
  {
    immediate: true,
  }
);

watch(
  () => props.shotcuts,
  (shotcuts) => {
    setShotcuts(shotcuts || []);
  },
  {
    immediate: true,
  }
);
</script>
