<template>
    <div>
        <h1 class="text-2xl">Documentos</h1>
    </div>
    <template v-if="accountType === 'company'">
        <DocumentsCompany />
    </template>
    <template v-else>
        <DocumentsPerson />
    </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DocumentsCompany from './components/DocumentsCompany.vue'
import DocumentsPerson from './components/DocumentsPerson.vue'

const accountType = ref('company');

</script>

<style scoped>

</style>