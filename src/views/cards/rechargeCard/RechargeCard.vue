<template>
  <div class="recharge-container">
    <div class="flex flex-column align-items-center" style="width: 100%">
      <SelectCard v-model="cardInfo" :listCards="listCards" />
      <RechargeCardInput type="crypto" />
      <RechargeCardInput type="fiat" />
''
      <div class="flex gap-2">
        <Button
          v-if="rechargeState.quoteId === ''"
          :label="t('requestQuote')"
          class="w-12 py-2"
          icon="pi pi-sync"
          iconPos="right"
          @click="verifyRequestQuote()"
          :disabled="rechargeState.loading"
          :loading="rechargeState.loading"
        />
        <template v-else>
          <Button
            :label="t('confirm')"
            class="w-12 py-2"
            icon="pi pi-check"
            iconPos="right"
            @click="openModal(true)"
            :disabled="rechargeState.quoteId === '' || rechargeState.loading"
          />
          <Button
            :label="t('requestQuote')"
            class="w-12 py-2"
            icon="pi pi-refresh"
            iconPos="right"
            @click="verifyRequestQuote()"
            :disabled="rechargeState.loading"
            :loading="rechargeState.loading"
          />
        </template>
      </div>
      <ModalAssetSelector
        :show-modal="rechargeState.showModalAssetSelector"
        @update:visible="modalAssetSelector($event)"
        @selected-asset="selectedAsset"
        :asset-classification-filter="AssetClassificationFilter.ALL"
      />
    </div>
    <ResumeRechargeCard :show-modal="rechargeState.showModalResume" @update:visible="openModal($event)" />
  </div>
</template>

<script setup lang="ts">
import SelectCard from '../components/selectCard/SelectCard.vue'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'
import RechargeCardInput from './components/RechargeCardInput.vue'
import ResumeRechargeCard from './components/ResumeRechargeCard.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRechargeCard } from './composables/useRechargeCard'
import { Asset, AssetClassificationFilter } from '../../deposit/types/asset.interface'
import ModalAssetSelector from '../../../components/ModalAssetSelector.vue'

const { listCards, cardInfo } = useCardCenter()
const { rechargeState, openModal, handleRequestQuote, openModalSelector } = useRechargeCard()

const { t } = useI18n({ useScope: 'global' })

const verifyRequestQuote = async () => {
  if (cardInfo.value.cardId !== '' && rechargeState.value.assetCode !== '' && rechargeState.value.amount !== 0) {
    await handleRequestQuote()
  }
}
const selectedAsset = async (asset: Asset) => {
  rechargeState.value.showModalAssetSelector = false
  rechargeState.value.assetIcon = asset.icon
  rechargeState.value.assetName = asset.name
  rechargeState.value.assetId = asset.assetId
  rechargeState.value.assetCode = asset.code
}
const modalAssetSelector = (b: boolean) => {
  rechargeState.value.showModalAssetSelector = b
}
</script>
<style scoped lang="scss">
.recharge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}
</style>
