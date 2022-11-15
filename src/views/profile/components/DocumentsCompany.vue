<template>
    <div class="mb-4">
        <p class="font-medium text-sm uppercase">COMPANY - OWNERSHIP STRUCTURE</p>
    </div>
    <div class="border-2 border-200 border-solid p-3">
        <div class="grid">
            <div v-for="document in documents" class="col-12 md:col-2">
                <Document :document=document />
            </div>
        </div>
    </div>
    <div class="my-4">
        <p class="font-medium text-sm uppercase">SHAREHOLDERS - IDENTITY DOCUMENT</p>
    </div>
    <div class="grid">
        <div class="col-12 md:col-4">
            <DocumentPartners />
        </div>
        <div class="col-12 md:col-4">
            <DocumentPartners />
        </div>
        <div class="col-12 md:col-4">
            <DocumentPartners />
        </div>
    </div>
    <div class="mt-5">
        <Button 
            label="Actualizar Documentos" 
            class="p-button p-button-outlined border-300"
        />
    </div>
</template>

<script setup lang="ts">
import { Document as DocumentType } from '../types/document.interface';
import Button from 'primevue/button';
import { ref } from 'vue';
import Document from './Document.vue';
import DocumentPartners from './DocumentPartners.vue';

const documents = ref<DocumentType[]>([
    {
        label: "other undefined",
        documentType: "other",
        taxId: "854313406",
        description: "other undefined",
        file: "https://s3.amazonaws.com/uploads.sandbox.primetrust.com/uploaded_documents/87abcc12-ef46-47cb-ab16-8a17f1dc0104.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3IAMB4HICHKIYMFE%2F20221031%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221031T214942Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8e63d8ece1f8ab9dc1e848093367851442bb27bb11362c2a8a22c08a79118853",
        documentId: "87abcc12-ef46-47cb-ab16-8a17f1dc0104",
        isBusinessMember: "false",
        documentCountry: "US"
    },
    {
        taxId: "854313406",
        file: "https://s3.amazonaws.com/uploads.sandbox.primetrust.com/uploaded_documents/23a859a2-9400-4456-beba-bf984059218d.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3IAMB4HICHKIYMFE%2F20221031%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221031T215006Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4d5d5b4e2a8aa51c545c6026fec8c671e2a28debf53350c952d32354f0aaf8a5",
        label: "utility_bill undefined",
        documentCountry: "US",
        description: "utility_bill undefined",
        documentType: "utility_bill",
        isBusinessMember: "false",
        documentId: "23a859a2-9400-4456-beba-bf984059218d"
    }
])
</script>

<style scoped>

</style>