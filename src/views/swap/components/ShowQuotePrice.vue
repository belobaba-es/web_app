<template>
  <div class="mt-6 mb-3">
    <p class="text-sm text-center main-text">{{ t('swapPriceWarning') }}</p>
    <p class="text-sm text-center main-text">{{ quoteText }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSwap } from '../../../composables/useSwap'
import { onMounted, ref } from 'vue'
import calculateBalance from '../../../shared/calculateBalance'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { transactionSummary, unitCount, assetName, totalAmount } = useSwap()
const quoteText = ref('')

onMounted(() => {
  const quotePrice =
    (transactionSummary.value.totalAmount === 0 ? totalAmount.value : transactionSummary.value.totalAmount) /
    (transactionSummary.value.unitCount === 0 ? unitCount.value : transactionSummary.value.unitCount)

  quoteText.value = `1 ${assetName.value}  = ${calculateBalance('USD', quotePrice, 0)} USD`

  console.log('--unitCount.value', unitCount.value)
  console.log('--totalAmount.value', totalAmount.value)
  console.log('-- transactionSummary.value', transactionSummary.value)
  console.log('-- quotePrice', quotePrice)
})
</script>

<style scoped>
.main-text {
  color: #a4a4a4 !important;
}
</style>