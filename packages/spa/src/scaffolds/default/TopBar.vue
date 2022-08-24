<template>
  <box :flex="1" row justify="space-between" background="var(--ruff-top-bar-background)">
    <box row align="center">
      <b-touchable @click="toggleMenuStatus" padding="--ms">
        <txt :line-height="18" :margin="[8, 0]">
          <b-icon
            :type="isMenuCollapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
            size="18"
            class="side-bar-switch"
          />
        </txt>
      </b-touchable>
      <Breadcrumb v-if="withCrumb" />
    </box>
    <box :flex="1" paddingH="10" row justify="right">
      <router-link to="/notice">
        <b-touchable :padding="[20, 10]">
          <txt :line-height="24">
            <b-icon type="bell-outlined" size="18" class="top-bar-text" />
          </txt>
        </b-touchable>
      </router-link>
      <ThemePicker />
      <Account />
    </box>
  </box>
</template>

<script setup lang="ts">
import useConfigurations from "../../traits/useConfigurations";
import Account from "./Account.vue";
import ThemePicker from "./ThemePicker.vue";
import Breadcrumb from "../../components/crumbs/Breadcrumb.vue";
import { ref } from "vue";

const withCrumb = ref(false);
const { isMenuCollapsed, toggleMenuStatus } = useConfigurations();
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
