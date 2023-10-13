<template v-show="isVisible">
  <router-link v-show="isVisible" to="/onboarding">
    <Message severity="warn" :closable="false">{{ t('uploadDocuments') }}!</Message>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { AccountStatus } from '../views/login/types/login.interface'
import { useUserStore } from '../stores/user'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'

const { t } = useI18n({ useScope: 'global' })
const useUser = useUserStore()
const isVisible = ref(false)

onMounted(() => {
  areDocumentsUploaded()
})

const areDocumentsUploaded = () => {
  isVisible.value = useUser.getUser.client.status == AccountStatus.REGISTERED
}
</script>

<style scoped></style>
