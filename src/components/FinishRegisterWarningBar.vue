<template v-show="isVisible">
  <router-link v-show="isVisible" to="/onboarding">
    <Message severity="warn" :closable="false">{{ t('uploadDocuments') }}!</Message>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import { AccountStatus } from '../types/accountStatus.enum'
import { useAuth } from '../composables/useAuth'

const { t } = useI18n({ useScope: 'global' })
const isVisible = ref(false)
const { getAccountStatus } = useAuth()

onMounted(() => {
  areDocumentsUploaded()
})

const areDocumentsUploaded = () => {
  isVisible.value = getAccountStatus() == AccountStatus.REGISTERED
}
</script>

<style scoped></style>
