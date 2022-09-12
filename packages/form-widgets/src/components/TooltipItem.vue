<template>
    <a-form-item :name="name">
        <template #label>
            {{ label || '-' }}
            <a-tooltip placement="right">
                <template #title> {{ tip || '-' }} </template>
                <ruff-icon type="antd" name="QuestionCircleOutlined"
                        style="margin-left:10px" />
            </a-tooltip>
        </template>
        <slot />
    </a-form-item>
</template>

<script setup lang="ts">
defineProps({
    name: [String],
    label: [String],
    tip: [String]
})
</script>