<template>
  <router-link to="/">
    <bx-touchable
      :width="isMenuCollapsed && isDesktopDevice ? dockWidth : menuWidth"
      :height="topHeight"
      background="var(--ruff-top-bar-background)"
      justify="center"
    >
      <box row center>
        <img :src="props.logo" class="left-bar-logo" />
        <txt
          v-if="!isMenuCollapsed || isMobileDevice"
          :flex="1"
          margin-left="--s"
          size="18"
          line-height="64"
          align="center"
          color="white"
          weight="700"
          >{{ props.title }}</txt
        >
      </box>
    </bx-touchable>
  </router-link>
</template>

<script setup lang="ts">
import logoSrc from "../../assets/images/logo.png";
import useScreenInfos from "../../reactive/useScreenInfos";
import useMenuSettings from "../../reactive/useMenuSettings";

const { isDesktopDevice, isMobileDevice } = useScreenInfos();
const { isMenuCollapsed } = useMenuSettings();
const props = defineProps({
  logo: {
    type: String,
    default: logoSrc,
  },
  title: {
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
});
</script>
<style lang="scss" scoped>
.left-bar-logo {
  width: 30px;
  height: 30px;
}
</style>
