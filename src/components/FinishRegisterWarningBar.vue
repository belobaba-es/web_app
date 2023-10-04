<template v-show="!areDocumentsUploaded()">
  <router-link to="/upload-documents">
    <Message severity="success" :closable="false">{{ t('uploadDocuments') }}!</Message>
  </router-link>
</template>

<script setup lang="ts">
import Message from 'primevue/message'

import { useI18n } from 'vue-i18n'
import { AccountStatus } from '../views/login/types/login.interface'
import { useUserStore } from '../stores/user'

const { t } = useI18n({ useScope: 'global' })
const useUser = useUserStore()

const areDocumentsUploaded = () => {
  if (useUser.getUser.client == undefined || useUser.getUser.client.status == undefined) {
    return false
  }

  return useUser.getUser.client.status === AccountStatus.APPROVED
}
</script>

<style scoped></style>