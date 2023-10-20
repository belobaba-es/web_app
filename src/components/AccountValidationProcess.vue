<template>
  <Message v-if="!isEmailValidated" severity="warn">
    <div class="pl-4">
      <h3>{{ t('titleAccountValidationProcess') }}</h3>
      {{ t('accountValidationProcess') }}
    </div>
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { isUserActive } = useAuth()
const { t } = useI18n({ useScope: 'global' })
const isEmailValidated = ref(true)

onMounted(async () => {
  isEmailValidated.value = isUserActive()
})
</script>
