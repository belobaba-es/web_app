<template>
  <div class="flex align-items-center p-2 justify-content-between">
    <div class="pr-8">
      <p class="m-0" style="font-size: 16px">
        {{ name }}
      </p>
      <p class="m-0">{{ number }}</p>
    </div>
    <p class="font-medium" :style="getStatusStyle(status)" style="padding: 0.25rem 1.25rem; border-radius: 1rem">
      {{ t(`${status}`) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardCenterValidation } from '../Composables/useCardCenterValidation'

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
  name: String,
  number: String,
  status: String,
})

const { getStatusStyle } = useCardCenterValidation()
</script>
<style></style>
