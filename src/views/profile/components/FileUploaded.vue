<template>
    <div class="flex justify-content-between align-items-center p-3 border-round surface-200">
        <span>
            <i class="pi pi-check"></i>
        </span>
        <span>
            {{ props.identityDocument.label }}
        </span>
        <span class="cursor-pointer" @click="editDocumentHandler(
            props.identityDocument.taxId,
            props.identityDocument.documentId
        )">
            <i class="pi pi-pencil"></i>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useAccountStore } from '../../../stores/account';

const props = defineProps({
    identityDocument: {
        type: Object,
        required: true,
    }
});

const accountStore = useAccountStore();

const editDocumentHandler = (taxId: string, documentId: string) => {
    accountStore.editDocument(taxId, documentId);
}

</script>

