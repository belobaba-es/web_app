<template>
    <div class="flex justify-content-between align-items-center p-3 border-round surface-200">
        <span>
            <i class="pi pi-check"></i>
        </span>
        <span>
            {{ props.label }}
        </span>
        <span class="cursor-pointer" @click="editDocumentHandler(
            props.taxId
        )">
            <i class="pi pi-pencil"></i>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '../../../stores/account';

const props = defineProps<{
    label: string,
    taxId: string
}>();

const accountStore = useAccountStore();

const editDocumentHandler = (taxId: string) => {
    // accountStore.editDocument(taxId, documentId, props.isCompany);
}

</script>

