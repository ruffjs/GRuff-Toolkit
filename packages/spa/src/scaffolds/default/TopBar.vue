<template>
  <box
    :flex="1"
    row
    justify="space-between"
    height="100%"
    background="var(--ruff-top-bar-background)"
  >
    <box row align="center">
      <b-touchable @click="toggleMenuStatus" :padding="[0, '--ms']">
        <txt :line-height="18" :margin="[8, 0]">
          <ruff-icon
            :type="isMenuCollapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
            size="18"
            class="side-bar-switch"
          />
        </txt>
      </b-touchable>
      <Breadcrumb v-if="withCrumb" />
    </box>
    <box :flex="1" paddingH="10" row justify="right" align="center">
      <template v-for="shotcut in shotcuts">
        <router-link v-if="shotcut.type === 'link'" :to="(shotcut.link as string)">
          <b-touchable :padding="[0, 10]">
            <txt :line-height="18">
              <ruff-icon type="antd" name="bell-outlined" size="18" class="top-bar-text" />
            </txt>
          </b-touchable>
        </router-link>
        <DropDown
          v-else-if="shotcut.type === 'dropdown'"
          :name="shotcut.name"
          :selected="shotcut.selected"
          :items="shotcut.items"
        />
        <component v-else-if="shotcut.type === 'component'" :is="shotcut.component" />
      </template>

      <!-- <ThemePicker /> -->
      <!-- <Account /> -->
    </box>
  </box>
</template>

<script setup lang="ts">
import useMenuSettings from "../../traits/useMenuSettings";
import useTopbarSettings from "../../traits/useTopbarSettings";
import Breadcrumb from "../../components/crumbs/Breadcrumb.vue";
import { ref } from "vue";
import DropDown from "./DropDown.vue";

const withCrumb = ref(false);
const { isMenuCollapsed, toggleMenuStatus } = useMenuSettings();
const { shotcuts } = useTopbarSettings();
</script>
<style lang="scss">
.side-bar-switch {
  color: var(--ruff-side-bar-switch-text);
  &:hover {
    color: var(--ruff-side-bar-switch-text_hover);
  }
}

.top-bar-text {
  color: var(--ruff-top-bar-text);
  &:hover {
    color: var(--ruff-top-bar-text_hover);
  }
}
</style>
