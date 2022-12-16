<template>
  <PageLayout :title="t('swap')">
    <div class="flex align-items-center my-3">
      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
      <span class="text-xl"> {{ t('swapHistory') }}</span>
    </div>
    <DataTable :value="quotes.results" responsiveLayout="scroll">
      <Column field="assetId" :header="t('Swap')" header-class="flex justify-content-center">
        <template #body="slotProps">
          <div class="h-5rem w-6rem relative">
            <img :src="usdIcon" class="h-3rem h-3rem absolute top-0 left-0" />
            <img :src="iconAsset(slotProps.data.assetId)" class="h-3rem h-3rem absolute bottom-0 right-0" />
          </div>
        </template>
      </Column>
      <Column field="totalAmount" :header="t('Move done')">
        <template #body="slotProps">
          <span class="font-medium">{{ slotProps.data.totalAmount }}</span>
        </template>
      </Column>
      <Column>
        <template #body>
          <img :src="swapIcon" />
        </template>
      </Column>
      <Column field="unitCount" :header="t('To your balance in')">
        <template #body="slotProps">
          <span class="font-medium">{{ slotProps.data.unitCount }}</span>
        </template>
      </Column>
      <Column field="createdAt" :header="t('Operation date')">
        <template #body="slotProps">
          {{ secondsToDate(slotProps.data.createdAt._seconds) }}
        </template>
      </Column>
      <Column field="status" :header="t('Status')">
        <template #body="slotProps">
          <span class="font-medium" :class="statusClass(slotProps.data.status)">{{ slotProps.data.status }}</span>
        </template>
      </Column>
      <Column field="feeAmount" :header="t('Quote / Price')"></Column>
      <Column field="quoteId" :header="t('Number of order')"></Column>
    </DataTable>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted } from 'vue'
import { useSwap } from '../../composables/useSwap'
import { useSwapStore } from '../../stores/swap'
import swapIcon from '../../assets/icons/swap.svg'
const { t } = useI18n({ useScope: 'global' })
const { quotes } = useSwap()
const { fetchQuotes } = useSwapStore()

onMounted(async () => {
  await fetchQuotes()
})

const usdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'

const iconAsset = (assetId: string) => {
  return `https://storage.googleapis.com/noba-dev/${assetId}.svg`
}
const secondsToDate = (seconds: number) => {
  const locale = localStorage.getItem('noba@lang')
  const date = new Date(seconds * 1000)
  return date.toLocaleString(locale!)
}

const statusClass = (status:string) => {
    return {
        'text-green-500': status === 'completed',
        'text-orange-500': status === 'pending'
    }
}
</script>

<style scoped></style>
