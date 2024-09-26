<template>
  <SelectCardHeader title="rechargeCard" />
  <div class="recharge-container">
    <div class="flex flex-column align-items-center" style="width: 100%">
      <RechargeCardInput :type="AssetClassificationFilter.CRYPTO_STABLE_COIN" />
      <RechargeCardInput :type="AssetClassificationFilter.FIAT" />
      <div>
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
        <Button
          v-else
          :label="t('confirm')"
          class="w-12 py-2"
          icon="pi pi-sync"
          iconPos="right"
          @click="openModal(true)"
          :disabled="rechargeState.quoteId === '' || rechargeState.loading"
        />
      </div>
    </div>
    <ResumeRechargeCard :show-modal="rechargeState.showModalResume" @update:visible="openModal($event)" />
  </div>
</template>

<script setup lang="ts">
import RechargeCardInput from '../../cards/rechargeCard/components/RechargeCardInput.vue'
import ResumeRechargeCard from '../../cards/rechargeCard/components/ResumeRechargeCard.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRechargeCard } from '../../cards/rechargeCard/composables/useRechargeCard'
import SelectCardHeader from '../components/SelectCardHeader.vue'
import { AssetClassificationFilter } from '../../deposit/types/asset.interface'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'

const { rechargeState, openModal, handleRequestQuote } = useRechargeCard()
const { listCards, cardInfo } = useCardCenter()

const { t } = useI18n({ useScope: 'global' })

const verifyRequestQuote = async () => {
  if (cardInfo.value.cardId !== '' && rechargeState.value.assetCode !== '' && rechargeState.value.amount !== 0) {
    await handleRequestQuote()
  }
}
</script>
<style scoped lang="scss">
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
