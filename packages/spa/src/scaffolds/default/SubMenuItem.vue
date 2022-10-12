<template>
  <template v-if="show && item?.children?.length">
    <a-sub-menu :key="item?.key">
      <template #title>{{ item?.name }}</template>
      <SubMenuItem
        v-for="subitem in (item.children as any[])"
        :key="subitem.key"
        :item="subitem"
      />
    </a-sub-menu>
  </template>
  <template v-else-if="show">
    <a-menu-item :key="item?.key">{{ item?.name }}</a-menu-item>
  </template>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import usePassport from "@ruff-web/spa/src/traits/useUserPassport";
import { getSPAContext } from "../../context";

export default {
  name: "SubMenuItem",
};
</script>
<script setup lang="ts">
const props = defineProps({
  item: Object as () => RuffSPAMenuItem,
});
const { userInfo } = usePassport();
const show = ref(false);
const checkShowState = async () => {
  if (props.item?.accessDesc) {
    const runtime = getSPAContext();
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
