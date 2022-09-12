<template>
  <template v-if="show && item?.children?.length">
    <a-sub-menu :key="item?.key" background="var(--ruff-sub-menu-background)">
      <template #icon>
        <ruff-icon type="antd" :name="item?.icon" />
      </template>
      <template #title>{{ item?.name }}</template>
      <SubMenuItem
        v-for="subitem in (item?.children as any[])"
        :key="subitem.key"
        :item="subitem"
      />
    </a-sub-menu>
  </template>
  <template v-else-if="show">
    <a-menu-item :key="item?.key" background="var(--ruff-menu-background)">
      <template #icon>
        <ruff-icon type="antd" :name="item?.icon" />
      </template>
      <span>{{ item?.name }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import usePassport from "@ruff-web/spa/src/traits/useUserPassport";
import { ref, watch } from "vue";
import { getCurrentRuntime } from "../../runtime";
import SubMenuItem from "./SubMenuItem.vue";

const props = defineProps({
  item: Object as () => RuffSPAMenuItem,
});
const { userInfo } = usePassport();
const show = ref(false);

const checkShowState = async () => {
  if (props.item?.accessDesc) {
    const runtime = getCurrentRuntime();
    try {
      await runtime.checkPermission(props.item?.accessDesc);
      show.value = true;
    } catch (error) {
      show.value = false;
    }
  } else {
    show.value = true;
  }
};
watch(props, checkShowState, { immediate: true, deep: true });
watch(userInfo, checkShowState, { immediate: true, deep: true });
</script>
<style lang="scss" scoped></style>
