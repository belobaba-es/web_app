<template>
    <div class="p-5 flex-column border-2 border-200 border-solid surface-100 cursor-pointer">
        <div class="flex justify-content-center mb-3">
            <img src="../../../assets/icons/icon-document.svg" alt="" srcset="">
        </div>
        <div class="flex justify-content-center" v-tooltip.top="fileName">
            <span>{{ substringFileName }}</span>
        </div>
        <div class="flex justify-content-center">

        </div>
    </div>
    <div class="py-2 flex justify-content-center">
        <p>{{ props.document.label }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Document } from '../types/document.interface';


interface Props {
    document: Document
}

const props = defineProps<Props>();

const fileName = computed<string>(() => {
    const stringToArrayUrl = props.document.file.split('/');
    return stringToArrayUrl[5].split('?')[0];
})

const substringFileName = computed(() => {
    const text = fileName.value.substring(0, 25);
    return  fileName.value.length >= 25 ? `${text} ...` : fileName.value;
})
</script>

<style scoped>

</style>