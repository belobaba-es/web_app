<template>
  <section class="section-main" style="height: 100%; paddingbottom: 2rem">
    <FinishRegisterWarningBar />
    <!--    todo uncomment-->
    <!--    <AccountValidationProcess />-->
    <!--    <PageLayout :title="t('swap')" v-show="useUser.swapModuleIsActive()">-->
    <PageLayout :title="t('swap')" v-show="true">
      <div class="grid flex justify-content-center">
        <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-4">
          <div class="flex justify-content-end mb-4">
            <Button
              type="button"
              :label="t('viewSwapHistory')"
              class="font-semi-bold mt-lg-5 border-300 bg-white text-black-alpha-80 btn-historic"
              icon="pi pi-history"
              icon-pos="right"
              @click="router.push('/swap/history')"
            />
          </div>
          <div class="flex-row">
            <div>
              <AssetInput type="fiat" v-if="transactionType === 'buy'" />
              <AssetInput type="crypto" v-else />
            </div>
            <div class="flex justify-content-center align-items-center">
              <div
                class="swap-circle border-circle w-5rem h-5rem m-2 flex align-items-center justify-content-center cursor-pointer"
                @click="switchTransactionType()"
              >
                <img :src="swapIcon" />
              </div>
            </div>
            <div>
              <AssetInput type="crypto" v-if="transactionType === 'buy'" />
              <AssetInput type="fiat" v-else />
            </div>

            <ShowQuotePrice v-if="exchangeId" />

            <div class="flex-row justify-content-center align-items-center" v-if="progressBarPercent > 0">
              <div class="grid">
                <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8 mx-auto mb-3 mt-3">
                  <ProgressBar :value="progressBarPercent" class="swap"> {{ progressBarSeconds }} Seg</ProgressBar>
                </div>
              </div>
            </div>

            <!--            <ShowFee v-if="exchangeId" />-->

            <div class="mb-2">
              <Button
                :label="swapBtnText"
                class="w-full py-3 text-uppercase"
                style="color: #000; fontweight: 700"
                :disabled="loading || (!exchangeId && !shouldRefreshQuote)"
                @click="swapHandler"
                :loading="loading"
              />
            </div>
            <div class="mt-3 mb-3">
              <p class="text-sm text-center">{{ t('swapExchangeServiceText') }}</p>
            </div>
          </div>
        </div>
      </div>
      <ModalAssetSelector
        :show-modal="showModalAssetSelector"
        @update:visible="modal($event)"
        @selected-asset="selectedAsset"
        :asset-classification-filter="AssetClassificationFilter.CRYPTO_STABLE_COIN"
      />
    </PageLayout>
  </section>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import AssetInput from './components/AssetInput.vue'
import swapIcon from '../../assets/icons/swap.svg'
import { Asset, AssetClassificationFilter } from '../deposit/types/asset.interface'
import ModalAssetSelector from '../../components/ModalAssetSelector.vue'
import ProgressBar from 'primevue/progressbar'
import { useRouter } from 'vue-router'
import { useSwapStore } from '../../stores/swap'
import { storeToRefs } from 'pinia'
import { onUnmounted } from 'vue'
import ShowQuotePrice from './components/ShowQuotePrice.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'

const {
  assetIcon,
  assetName,
  showModalAssetSelector,
  assetId,
  progressBarPercent,
  progressBarSeconds,
  swapBtnText,
  loading,
  exchangeId,
  transactionType,
  assetCode,
  shouldRefreshQuote,
} = storeToRefs(useSwapStore())

const { t } = useI18n({ useScope: 'global' })

const router = useRouter()
const { createExchange, swapHandler, switchTransactionType, clearSwap } = useSwapStore()

const selectedAsset = async (asset: Asset) => {
  showModalAssetSelector.value = false
  assetIcon.value = asset.icon
  assetName.value = asset.name
  assetId.value = asset.assetId
  assetCode.value = asset.code
  await createExchange()
}

const modal = (b: boolean) => {
  showModalAssetSelector.value = b
}

onUnmounted(() => {
  clearSwap()
})
</script>

<style scoped>
.history-btn > .p-button:hover {
  background-color: #fff;
  color: #1b1b19;
}

.swap-circle {
  background-color: #ede5ce;
}

.swap-circle > img {
  transform: rotate(90deg);
  width: 2rem;
}

.btn-historic {
  width: 40%;
}

@media screen and (min-width: 1200px) {
  .xl\:col-4 {
    width: 40rem;
  }
}

@media screen and (max-width: 400px) {
  .btn-historic {
    width: 90%;
  }
}
</style>
