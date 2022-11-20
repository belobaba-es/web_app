<template>
    <div class="p-5 flex-column border-2 border-200 border-solid surface-100 cursor-pointer" @click="downLoadDocument()">
        <div class="flex justify-content-center mb-3 icon-document-file">
            <i class="pi"></i>
        </div>
        <div class="flex justify-content-center" v-tooltip.top="fileName">
            <span class="text-sm">{{ substringFileName }}</span>
        </div>
        <div class="flex justify-content-center">

        </div>
    </div>
    <div class="py-2 flex justify-content-center">
        <p class="text-sm">{{ props.document.label }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Document } from '../types/account.interface';


interface Props {
    document: Document
}

const props = defineProps<Props>();

const fileName = computed<string>(() => {
    const stringToArrayUrl = props.document.file.split('/');
    return stringToArrayUrl[5].split('?')[0];
})

const substringFileName = computed(() => {
    const text = fileName.value.substring(0, 7);
    return  fileName.value.length >= 7 ? `${text} ...` : fileName.value;
})

const downLoadDocument = () => {
    const documentURL = props.document.file;
}
</script>

<style scoped>

</style>