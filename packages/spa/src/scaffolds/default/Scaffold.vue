<template>
  <DualModesView>
    <template #mobile>
      <box width="100vw" height="100vh" overflow="hidden">
        <b-box
          :flex="1"
          row
          :width="`calc(100vw + ${menuWidth}px)`"
          :margin-left="isMenuCollapsed ? -menuWidth : 0"
          style="transition: margin-left 0.15s ease-in-out"
        >
          <box
            :width="menuWidth"
            height="100vh"
            column
            background="var(--ruff-side-bar-background)"
          >
            <Logo
              :topHeight="topHeight"
              :menuWidth="menuWidth"
              :dockWidth="dockWidth"
              :logo="props.logo"
              :title="props.name"
            />
            <box
              flex="1"
              :height="`calc(100vh - ${topHeight}px)`"
              style="overflow-y: auto"
            >
              <Menu v-if="props.menu" />
              <slot v-else name="memu" />
            </box>
          </box>
          <box :flex="1" height="100vh">
            <box width="100vw" :height="topHeight">
              <TopBar />
            </box>
            <box
              :flex="1"
              width="100vw"
              :height="`calc(100vh - ${topHeight}px)`"
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
          :width="isMenuCollapsed ? dockWidth : menuWidth"
          column
          background="var(--ruff-side-bar-background)"
        >
          <Logo
            :topHeight="topHeight"
            :menuWidth="menuWidth"
            :dockWidth="dockWidth"
            :logo="props.logo"
            :title="props.name"
          />
          <box flex="1" :height="`calc(100vh - ${topHeight}px)`" style="overflow-y: auto">
            <Menu v-if="props.menu" />
            <slot v-else name="memu" />
          </box>
        </box>
        <box :flex="1" :width="mainWidth">
          <box width="100%" :height="topHeight">
            <TopBar />
          </box>
          <box
            :flex="1"
            width="100%"
            :height="`calc(100vh - ${topHeight}px)`"
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
import { Component, computed, watch } from "vue";

import useMenuSettings from "../../traits/useMenuSettings";
import useTopbarSettings from "../../traits/useTopbarSettings";
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
  topHeight: {
    type: Number,
    default: 64,
  },
  menuWidth: {
    type: Number,
    default: 256,
  },
  dockWidth: {
    type: Number,
    default: 80,
  },
  menu: Array as () => RuffSPAMenuItem[],
  shotcuts: {
    type: Array as () => ShotcutItem<Component>[],
    default: [],
  },
});
const { isMenuCollapsed, setMenuItems } = useMenuSettings();
const { setShotcuts } = useTopbarSettings();
const mainWidth = computed(() => {
  `calc(100vw - ${isMenuCollapsed.value ? props.dockWidth : props.menuWidth}px)'`;
});

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
