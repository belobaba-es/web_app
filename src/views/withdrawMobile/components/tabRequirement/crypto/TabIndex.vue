<template>
  <div class="p-4">
    <BackButtonMobile :subtitle="t('crypto')" :title="t('withdraw')" />

    <h1 class="font-regular m-0">
      {{ t('withdraw') }} <span style="color: #00beb0">{{ t('crypto') }}</span>
    </h1>

    <p class="mb-4 text-1xl" style="font-size: 1rem">{{ t('withdrawText') }}</p>

    <TabRequirements />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TabRequirements from './TabRequirements.vue'
import BackButtonMobile from '../../../../../components/BackButtonMobile.vue'

const { t } = useI18n({ useScope: 'global' })
</script>
<style lang="scss"></style>
