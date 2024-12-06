<template>
  <div class="mt-6 mb-3">
    <p class="text-sm text-center main-text">{{ t('swapPriceWarning') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
.main-text {
  color: #a4a4a4 !important;
}
</style>
