<template>
  <a-dropdown placement="bottomRight">
    <bx-touchable :padding="[0, 10]" row>
      <box>
        <txt class="top-bar-text">{{ name }}</txt>
      </box>
    </bx-touchable>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="selectedKeys">
        <a-menu-item
          v-for="(item, index) in items"
          :key="item.key || index"
          @click="item.onclick"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  name: String,
  selected: String,
  items: Array as () => Array<{
    key: string;
    onclick: AnyFn;
    name: string;
  }>,
});

const selectedKeys = ref<string[]>([]);

watch(
  () => props.selected,
  () => {
    if (props.selected && props.items?.find((item) => item.key === props.selected)) {
      selectedKeys.value = [props.selected];
    }
  }
);

watch(
  () => props.items,
  () => {
    if (
      selectedKeys.value[0] &&
      props.items?.find((item) => item.key === selectedKeys.value[0])
    ) {
      //
    } else {
      selectedKeys.value = [];
    }
  }
);
</script>
<style lang="scss" scoped></style>
