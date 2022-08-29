<template>
    <img :src="src"
         :height="size" />
</template>

<script setup>
defineProps({
    src: String,
    size: {
        type: [Number],
        default: 24
    }
})
</script>