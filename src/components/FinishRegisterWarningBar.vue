<template>
  <router-link to="/upload-documents">
    <div class="card">
      <h1>{{ t('uploadDocuments') }}!</h1>
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })

console.log('aqui')
</script>

<style scoped></style>
