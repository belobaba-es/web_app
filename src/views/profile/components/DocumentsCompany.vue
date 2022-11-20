<template>
    <div class="mb-4">
        <p class="font-medium text-sm uppercase">COMPANY - OWNERSHIP STRUCTURE</p>
    </div>
    <div class="border-2 border-200 border-solid p-3">
        <div class="grid">
            <div v-for="document in owner?.documents" class="col-12 md:col-2">
                <Document :document=document />
            </div>
        </div>
    </div>
    <div class="my-4">
        <p class="font-medium text-sm uppercase">SHAREHOLDERS - IDENTITY DOCUMENT</p>
    </div>
    <div class="grid">
        <div v-for="(partner, idx) in members" class="col-12 md:col-4">
            <DocumentPartners 
                :key="idx"
                :partner="partner"
            />
        </div>
    </div>
    <div class="mt-5">
        <Button 
            label="Actualizar Documentos" 
            class="p-button edit-document-button"
            @click="onEdit()"
        />
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Document from './Document.vue';
import DocumentPartners from './DocumentPartners.vue';
import { useRouter, useRoute } from 'vue-router';
import { useAccount } from '../../../composables/useAccount';

const router = useRouter();
const route = useRoute();
const { owner, members } = useAccount();

const onEdit = () => router.push(`/profile/${route.params.accountId}/documentation/company/edit`);

</script>

<style scoped>

</style>