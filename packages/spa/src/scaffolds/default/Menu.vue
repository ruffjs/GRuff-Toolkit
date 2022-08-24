<template>
  <box flex="1" height="calc(100vh - 64px)" style="overflow-y: auto">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :theme="computedTheme[0]"
      :inline-collapsed="isMenuCollapsed && isDesktopDevice"
      background="var(--ruff-menu-background)"
    >
      <MenuItem v-for="item in menuItems" :key="item.key" :item="item" />
    </a-menu>
  </box>
</template>

<script setup lang="ts">
import useConfigurations from "../../traits/useConfigurations";
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";

const route = useRoute();
const router = useRouter();
const {
  computedTheme,
  isDesktopDevice,
  isMenuCollapsed,
  setMenuStatus,
  menuItems,
  memuKeyTargetMap,
} = useConfigurations();

const state = reactive<any>({
  selectedKeys: [],
  preSelectedKeys: [""],
  openKeys: isMenuCollapsed.value
    ? []
    : menuItems.value.filter((i: any) => i.children?.length > 0).map((i) => i.key),
  preOpenKeys: [""],
});

const matchRouteNameAndMenuKey = (name: string) => {
  // console.log(name, memuKeyTargetMap.value)
  if (name && memuKeyTargetMap.value[name] && memuKeyTargetMap.value[name].ref) {
    const refKey = memuKeyTargetMap.value[name].ref;
    if (refKey !== state.selectedKeys[0]) {
      state.selectedKeys[0] = refKey;
    }
  } else {
    state.selectedKeys = [];
  }
};

watch(
  isMenuCollapsed,
  () => {
    state.preOpenKeys = isMenuCollapsed.value
      ? []
      : menuItems.value.filter((i: any) => i.children?.length > 0).map((i) => i.key);
  },
  { immediate: false }
);

watch(memuKeyTargetMap, () => matchRouteNameAndMenuKey(route.name as string), {
  immediate: true,
});
watch(
  () => route.name,
  (name, oldVal) => {
    matchRouteNameAndMenuKey(name as string);
    if (isDesktopDevice.value === false) {
      setMenuStatus("collapsed");
    }
  },
  { immediate: false }
);

watch(
  () => state.selectedKeys,
  (_val, oldVal) => {
    // console.log(_val, oldVal, memuKeyTargetMap.value)
    state.preSelectedKeys = oldVal;
    const [key] = _val;
    if (key && memuKeyTargetMap.value[key] && memuKeyTargetMap.value[key].target) {
      router.push(memuKeyTargetMap.value[key].target as string);
    }
  }
);
</script>
<style lang="scss">
#app {
  .ant-menu-submenu.ant-menu-submenu-inline {
    &.ant-menu-submenu-open {
      background: var(--ruff-sub-menu-background_active);
    }
    &.ant-menu-submenu-active.ant-menu-submenu-selected {
      background: var(--ruff-sub-menu-background_active);
      .ant-menu-submenu-title {
        color: var(--ruff-sub-menu-text_active);
      }
    }
  }
  .ant-menu-item-selected {
    background-color: var(--ruff-menu-background_active);
    color: var(--ruff-sub-menu-text_active);
  }

  .ant-menu-inline.ant-menu-sub {
    background: var(--ruff-sub-menu-background);
  }
  .ant-menu-item:not(:last-child),
  .ant-menu-vertical-left .ant-menu-item:not(:last-child),
  .ant-menu-vertical-right .ant-menu-item:not(:last-child),
  .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 4px;
  }
}
</style>
