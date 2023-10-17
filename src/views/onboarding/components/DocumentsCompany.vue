<template>
  <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 p-panel p-component shareholders-panel">
    <div class="p-panel-header">
      <span class="p-panel-title">{{ t('uploadDocumentsTitle') }}</span>
    </div>
    <div class="p-toggleable-content" role="region">
      <div class="p-panel-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped></style>
