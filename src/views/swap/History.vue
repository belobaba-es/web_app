<template>
  <PageLayout :title="t('swap')">
    <div class="flex align-items-center my-3">
      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="router.push('/swap')" />
      <span class="text-xl"> {{ t('swapHistory') }}</span>
    </div>
    <div class="flex justify-content-between align-items-center px-2 mb-2 surface-100">
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('swap') }}</span>
      </div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('moveDone') }}</span>
      </div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center"></div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('toYourBalanceIn') }}</span>
      </div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('operationDate') }}</span>
      </div>  
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('status') }}</span>
      </div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('quotePrice') }}</span>
      </div>
      <div class="w-6rem h-4rem flex justify-content-center align-items-center">
        <span>{{ t('numberOfOrder') }}</span>
      </div>
    </div>
    <VirtualScroller
      scrollHeight="370px"
      :items="quotes.results"
      :itemSize="70"
      :showLoader="false"
      :loading="useSwapStore().loading"
      :lazy="true"
      :delay="250"
      @lazy-load="getNextPage"
    >
      <template v-slot:item="{ item, options }">
        <div :class="['scroll-item flex justify-content-between pr-2', { odd: options.odd }]">
          <div class="h-5rem w-6rem relative">
            <img :src="usdIcon" class="h-3rem h-3rem absolute top-0 left-0" />
            <img :src="iconAsset(item.code)" class="h-3rem h-3rem absolute bottom-0 right-0" />
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            <span class="font-medium">{{ item.totalAmount }}</span>
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            <img :src="swapIcon" />
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            <span class="font-medium">{{ item.unitCount }}</span>
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            {{ secondsToDate(item.createdAt._seconds) }}
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            <span class="font-medium" :class="statusClass(item.status)">{{ item.status }}</span>
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            {{ item.feeAmount }}
          </div>
          <div class="h-5rem w-6rem flex align-items-center justify-content-center">
            {{ item.quoteId }}
          </div>
        </div>
        <Divider />
      </template>
      <template v-slot:loader="{ options }">
        <div :class="['scroll-item p-2', { odd: options.odd }]" style="height: 70px">
          <Skeleton :width="'100%'" height="1.3rem" />
        </div>
      </template>
    </VirtualScroller>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { useSwap } from '../../composables/useSwap'
import { useSwapStore } from '../../stores/swap'
import swapIcon from '../../assets/icons/swap.svg'
import { useRouter } from 'vue-router'
import VirtualScroller from 'primevue/virtualscroller'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
const { t } = useI18n({ useScope: 'global' })
const { quotes } = useSwap()
const { fetchQuotes, getNextPage } = useSwapStore()
const router = useRouter()

onMounted(async () => {
  await fetchQuotes()
})

const usdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'

const iconAsset = (assetCode: string) => {
  return `https://storage.googleapis.com/noba-dev/${assetCode}.svg`
}
const secondsToDate = (seconds: number) => {
  const locale = localStorage.getItem('noba@lang')
  const date = new Date(seconds * 1000)
  return date.toLocaleString(locale!)
}

const statusClass = (status: string) => {
  return {
    'text-green-500': status === 'process',
    'text-orange-500': status === 'pending',
    'text-red-500': status === 'cancel',
  }
}
</script>

<style scoped></style>
