<template>
  <div>
    <span class="mb-1">{{ t('swapFrom') }}</span>

    <div class="flex" v-if="summary.transactionType === 'buy'">
      <div class="flex-shrink-0 flex align-items-center mr-2">
        <img alt="logo" :src="usdIcon" style="width: 4rem" />
      </div>
      <div class="flex-grow-1 flex-row align-items-center">
        <div class="font-medium">{{ usdName }}</div>
        <div class="font-medium">{{ summary.totalAmount }} {{ usdName }}</div>
      </div>
    </div>

    <div class="flex" v-else>
      <div class="flex-shrink-0 flex align-items-center mr-2">
        <img alt="logo" :src="summary.assetIcon" style="width: 4rem" />
      </div>
      <div class="flex-grow-1 flex-row align-items-center">
        <div class="font-medium">{{ transactionSummary.assetName }}</div>
        <div class="font-medium">{{ transactionSummary.unitCount }} {{ transactionSummary.assetName }}</div>
      </div>
    </div>
  </div>

  <div class="flex align-items-center">
    <div class="swap-circle border-circle w-3rem h-3rem m-2 flex align-items-center justify-content-center">
      <img :src="swapOneArrowIcon" />
    </div>
  </div>
  <div>
    <span class="mb-1">{{ t('swapTo') }}</span>
    <div class="flex" v-if="transactionSummary.transactionType === 'buy'">
      <div class="flex-shrink-0 flex align-items-center mr-2">
        <img alt="logo" :src="summary.assetIcon" style="width: 4rem" />
      </div>
      <div class="flex-grow-1 flex-row align-items-center">
        <div class="font-medium">{{ transactionSummary.assetName }}</div>
        <div class="font-medium">{{ transactionSummary.unitCount }} {{ transactionSummary.assetName }}</div>
      </div>
    </div>
    <div class="flex" v-else>
      <div class="flex-shrink-0 flex align-items-center mr-2">
        <img alt="logo" :src="usdIcon" style="width: 4rem" />
      </div>
      <div class="flex-grow-1 flex-row align-items-center">
        <div class="font-medium">{{ usdName }}</div>
        <div class="font-medium">{{ transactionSummary.totalAmount }} {{ usdName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { SummarySwap } from '../types/sumary'

import swapOneArrowIcon from '../../../assets/icons/swap-one-arrow.svg'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  summary: SummarySwap
  transactionSummary: SummarySwap
  usdIcon: string | undefined
  usdName: string | undefined
}>()
</script>

<style scoped>
.swap-circle {
  background-color: #bfefeb;
}
</style>
