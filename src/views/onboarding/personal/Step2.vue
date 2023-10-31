<template>
  <section class="section-main pt-6 pl-0 pr-0">
    <UploadDocumentNaturalPerson v-if="getAccountStatus() !== AccountStatus.APPROVED" />

    <DocumentsAlreadyVerified v-if="getAccountStatus() === AccountStatus.APPROVED" />
  </section>
</template>

<script setup lang="ts">
import UploadDocumentNaturalPerson from './components/UploadDocumentNaturalPerson.vue'
import { useAuth } from '../../../composables/useAuth'
import { AccountStatus } from '../../../types/accountStatus.enum'
import DocumentsAlreadyVerified from '../components/DocumentsAlreadyVerified.vue'

const { getAccountStatus } = useAuth()
</script>

<style scoped></style>
