<template>
  <div>
    <h1 class="text-2xl">{{ t('documents') }}</h1>
  </div>
  <template v-if="natureAccount === 'COMPANY'">
    <DocumentsCompany />
  </template>
  <template v-else>
    <DocumentsPerson />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DocumentsCompany from './components/DocumentsCompany.vue'
import DocumentsPerson from './components/DocumentsPerson.vue'
import { useAccount } from '../../composables/useAccount'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { natureAccount } = useAccount()
</script>

<style scoped></style>
