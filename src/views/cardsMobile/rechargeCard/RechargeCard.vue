<template>
  <SelectCardHeader title="rechargeCard" />
  <div class="recharge-container">
    <div class="flex flex-column align-items-center" style="width: 100%">
      <RechargeCardInput type="crypto" />
      <RechargeCardInput type="fiat" />
      <div>
        <Button
          v-if="rechargeState.quoteId === ''"
          :disabled="rechargeState.loading"
          :label="t('requestQuote')"
          :loading="rechargeState.loading"
          class="w-12 py-2"
          icon="pi pi-sync"
          iconPos="right"
          @click="verifyRequestQuote()"
        />
        <Button
          v-else
          :disabled="rechargeState.quoteId === '' || rechargeState.loading"
          :label="t('confirm')"
          class="w-12 py-2"
          icon="pi pi-sync"
          iconPos="right"
          @click="openModal(true)"
        />
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

<script lang="ts" setup>
import RechargeCardInput from '../../cards/rechargeCard/components/RechargeCardInput.vue'
import ResumeRechargeCard from '../../cards/rechargeCard/components/ResumeRechargeCard.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRechargeCard } from '../../cards/rechargeCard/composables/useRechargeCard'
import SelectCardHeader from '../components/SelectCardHeader.vue'
import { Asset, AssetClassificationFilter } from '../../deposit/types/asset.interface'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import ModalAssetSelector from '../../../components/ModalAssetSelector.vue'

const { rechargeState, openModal, handleRequestQuote } = useRechargeCard()
const { listCards, cardInfo } = useCardCenter()

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
<style lang="scss" scoped>
.recharge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}
</style>
