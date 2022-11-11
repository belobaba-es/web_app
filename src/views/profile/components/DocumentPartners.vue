<template>
    <div class="border-2 border-200 border-solid border-round-left border-round-right">
        <div class="px-3 pt-3 flex justify-content-between align-items-center">
            <div>
                <p class="font-medium text-sm">Pedro Gonzalez</p>
            </div>
            <div>
                <img src="../../../assets/icons/icon-user.svg" alt="">
            </div>
        </div>
        <Divider type="solid" />
        <div class="px-2">
            <div class="grid">
                <div v-for="document in documents" class="col-12 md:col-6">
                    <Document :document=document />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import { ref } from 'vue';
import { Document as DocumentType } from '../types/document.interface';
import Document from './Document.vue';

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