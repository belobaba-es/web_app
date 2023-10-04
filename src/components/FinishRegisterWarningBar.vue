<template v-show="isVisible">
  <router-link v-show="isVisible" to="/upload-documents">
    <Message severity="success" :closable="false">{{ t('uploadDocuments') }}!</Message>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { AccountStatus } from '../views/login/types/login.interface'
import { useUserStore } from '../stores/user'
import { onMounted, ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const useUser = useUserStore()
const isVisible = ref(false)

onMounted(() => {
  areDocumentsUploaded()
})

const areDocumentsUploaded = () => {
  if (useUser.getUser.client == undefined || useUser.getUser.client.status == undefined) {
    return
  }

  isVisible.value = useUser.getUser.client.status == AccountStatus.REGISTERED
}
</script>

<style scoped></style>