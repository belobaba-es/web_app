<template>
  <DocumentsPartners
    v-if="getAccountStatus() !== AccountStatus.APPROVED && getAccountStatus() !== AccountStatus.REJECTED"
  />

  <DocumentsAlreadyVerified
    v-if="getAccountStatus() === AccountStatus.APPROVED || getAccountStatus() === AccountStatus.REJECTED"
  />
</template>
<script setup lang="ts">
import { AccountStatus } from '../../../types/accountStatus.enum'
import { useAuth } from '../../../composables/useAuth'
import DocumentsAlreadyVerified from '../components/DocumentsAlreadyVerified.vue'
import DocumentsPartners from './components/DocumentsPartners.vue'

const { getAccountStatus } = useAuth()
</script>
