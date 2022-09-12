<template>
    <txt v-if="content"
         :style="{ cursor: typeof column?.onclick === 'function' ? 'pointer' : 'default' }"
         @click="column?.onclick && column.onclick(record)">{{ content }}</txt>
    <ruff-icon v-else
            type="loading-outlined"></ruff-icon>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
    index: Number,
    text: [String, Number, Object, Boolean],
    column: Object,
    record: Object
})
const content = ref('')

watch(props, async (p) => {
    if (p.column) {
        try {
            // console.log(p.column, p.record)
            if (typeof p.column.loader === 'function') {
                content.value = await p.column.loader(p.record, p.index)
            }
        } catch (error) {
            content.value = '加载失败'
        }
    }

}, { immediate: true, deep: true })
</script>