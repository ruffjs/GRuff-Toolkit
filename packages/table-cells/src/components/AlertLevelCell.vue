<template>
    <div class="alert-level-cell"
         :style="`border-left:4px solid ${data.color}`">
        {{ data.text }}
    </div>
</template>

<script setup>
import { alertLevelList } from "@/utils/const";
import { reactive, watch } from "vue";

const props = defineProps({
    index: Number,
    level: [String, Number, Object, Boolean],
    column: Object,
    record: Object
})
const init = alertLevelList.find((l) => l.value == props.level)
const data = reactive(init ? { ...init } : { text: '-', color: undefined });
watch(props, (p) => {
    const { text, color } = alertLevelList.find((l) => l.value == p.level) || { text: '-', color: undefined }
    // console.log(alertLevelList)
    data.text = text
    data.color = color
})
</script>

<style lang="scss" scoped>
.alert-level-cell {
    width: 75px;
    height: 0.14rem;
    margin: 5px 0;
    padding-left: 8px;
    line-height: 0.14rem;
}
</style>