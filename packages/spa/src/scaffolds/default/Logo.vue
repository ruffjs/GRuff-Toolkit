<template>
  <router-link to="/">
    <b-touchable
      :width="isMenuCollapsed && isDesktopDevice ? 80 : 256"
      :height="64"
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
    </b-touchable>
  </router-link>
</template>

<script setup lang="ts">
import logoSrc from "../../assets/images/logo.png"
import useConfigurations from "../../traits/useConfigurations"

const { isDesktopDevice, isMobileDevice, isMenuCollapsed } = useConfigurations()
const props = defineProps({
  logo: {
    type: String,
    default: logoSrc,
  },
  title: {
    type: String,
    default: "Ruff IoT SPA",
  },
})
</script>
<style lang="scss" scoped>
.left-bar-logo {
  width: 30px;
  height: 30px;
}
</style>
