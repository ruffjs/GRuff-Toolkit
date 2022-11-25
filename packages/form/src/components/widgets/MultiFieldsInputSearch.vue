<template>
    <a-form-item>
        <a-input-group compact>
            <a-select v-model:value="form.searchField" :options="options" style="width: 35%" />
            <a-input-search style="width: 65%" v-model:value="form.searchText" :placeholder="placeholder" enter-button
                @search="handleSearch" />
        </a-input-group>
    </a-form-item>
</template>

<script setup lang="ts">
import { OptionProps } from 'ant-design-vue/lib/select';
import { watch, reactive, ref } from 'vue';

const emit = defineEmits(['serach']);
const props = defineProps({
    fields: Array
})
const options = ref<OptionProps>([])
const placeholder = ref('')
const form = reactive({
    searchField: undefined,
    searchText: '',
})
const handleSearch = () => {
    const values: any = {}
    props.fields?.forEach((field: any) => {
        if (field.field === form.searchField && form.searchText) {
            values[field.field] = form.searchText
        } else {
            values[field.field] = undefined
        }
    })
    emit('serach', values, form.searchField, form.searchText)
}
watch(() => props.fields, (fields) => {
    if (fields?.length) {
        options.value = fields.map((field: any) => ({
            label: field.name,
            value: field.field,
        }))
        form.searchField = options.value[0].value
        form.searchText = (fields[0] as any)?.defaultValue || ''
    } else {
        options.value = []
        form.searchField = undefined
        form.searchText = ''
    }
}, { immediate: true })
watch(() => form.searchField, (field) => {
    const item = (props.fields?.find((item: any) => item.field === field) as any)
    placeholder.value = item.placeholder || ('输入' + (item.name || '关键字'))
}, { immediate: true })
</script>
<style lang="scss">
</style>
