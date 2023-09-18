<template>
  <router-link to="/upload-documents">
    <Message severity="success" :closable="false">{{ t('uploadDocuments') }}!</Message>
  </router-link>
</template>

<script setup lang="ts">
import Message from 'primevue/message'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped></style>
