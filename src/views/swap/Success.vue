<template>
  <PageLayout :title="t('swap')">
    <div class="grid container-success flex justify-content-center align-items-center">
      <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-6">
        <div class="flex justify-content-center mb-4">
          <img :src="successIcon" />
        </div>
        <h1 class="text-center">{{ t('swapSuccessfulTitle') }}</h1>
        <p class="text-center">{{ t('swapSuccessfulText') }}</p>
        
        <!-- DesktopComponent -->
        <div class="my-5 justify-content-between hidden sm:hidden md:hidden lg:flex xl:flex">
          <SuccessComponentDesktop
            :summary="summary"
            :transactionSummary="transactionSummary"
            :usdIcon="usdIcon"
            :usdName="usdName"
          />
        </div>

        <!-- MobileComponent -->
        <div class="my-5 flex sm:flex md:flex lg:hidden xl:hidden">
          <SuccessComponentMobile
            :summary="summary"
            :transactionSummary="transactionSummary"
            :usdIcon="usdIcon"
            :usdName="usdName"
          />
        </div>

        <Divider :align="'bottom'" />
        <p class="mt-3 mb-3 text-sm text-center">
          {{ t('swapPriceQuote') }}
        </p>
        <div class="text-center" v-if="transactionSummary.quoteId">
          <span class="font-medium text-primary text-2xl">Fee:</span>
          <span class="text-2xl font-medium">{{ transactionSummary.feeAmount }}</span>
          /
          <span class="font-medium text-primary text-2xl">Total:</span>
          <span class="text-2xl font-medium">{{ transactionSummary.totalAmount }}</span>
        </div>
        <div class="flex justify-content-center mt-lg-2 mt-3">
          <div class="mr-4">
            <Button
              type="button"
              icon="pi pi-angle-left"
              :label="t('swapBackButtonTitle')"
              class="font-light w-100"
              @click="router.push('/swap')"
            />
          </div>
          <div class="">
            <Button
              type="button"
              icon="pi pi-history"
              iconPos="right"
              :label="t('viewSwapHistory')"
              class="font-light w-100 border-300 p-button-outlined"
              @click="router.push('/swap/history')"
            />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue'
import { useSwap } from '../../composables/useSwap'
import { useI18n } from 'vue-i18n'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { SummarySwap } from './types/sumary'
import SuccessComponentDesktop from './components/SuccessComponentDesktop.vue'
import SuccessComponentMobile from './components/SuccessComponentMobile.vue'

const { t } = useI18n({ useScope: 'global' })
const { successIcon, transactionSummary } = useSwap()

const router = useRouter()
const { getWalletByAssetCode } = useBalanceWallet()
const usdIcon = getWalletByAssetCode('USD')?.icon
const usdName = getWalletByAssetCode('USD')?.name

const summary: SummarySwap = transactionSummary.value as SummarySwap
</script>
