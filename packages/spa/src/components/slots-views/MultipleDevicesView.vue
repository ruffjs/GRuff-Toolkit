<template>
  <template v-if="viewport & flags.MP && slots['mobile']">
    <slot name="mobile"></slot>
  </template>
  <template v-else-if="viewport & flags.TC && slots['tablet']">
    <slot name="tablet"></slot>
  </template>
  <template v-else-if="viewport & flags.PC && slots['desktop']">
    <slot name="desktop"></slot>
  </template>
  <template v-else-if="viewport & flags.HD && slots['high-d']">
    <slot name="high-d"></slot>
  </template>
  <template v-else-if="viewport & flags.Mobile && slots['mobile']">
    <slot name="mobile"></slot>
  </template>
  <template v-else-if="viewport & flags.Desktop && slots['desktop']">
    <slot name="desktop"></slot>
  </template>

  <template v-else-if="viewport & flags.Wide && slots['not-phone']">
    <slot name="not-phone"></slot>
  </template>
  <template v-else><slot></slot></template>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useStore } from "vuex";
import flags from "../../runtime/viewport/flags";

const store = useStore<RuffSPAState>();
const viewport = computed(() => store.state.app.viewport);
const slots = useSlots();
</script>
