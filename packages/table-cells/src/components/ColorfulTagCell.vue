<template>
    <a-tag :color="item.color">
        {{ item.text }}
    </a-tag>
</template>

<script setup>
defineProps({
    item: Object
})
</script>