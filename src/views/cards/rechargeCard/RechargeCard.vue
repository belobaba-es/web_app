<template>
  <div class="recharge-container">
    <div class="flex flex-column align-items-center" style="width: 100%">
      <SelectCard v-model="cardInfo" :listCards="listCards" />
      <RechargeCardInput type="crypto" />
      <RechargeCardInput type="fiat" />
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
import SelectCard from '../components/selectCard/SelectCard.vue'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'
import RechargeCardInput from './components/RechargeCardInput.vue'
import ResumeRechargeCard from './components/ResumeRechargeCard.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRechargeCard } from './composables/useRechargeCard'
import { watch } from 'vue';

const { listCards, cardInfo } = useCardCenter()
const { rechargeState, openModal, handleRequestQuote } = useRechargeCard()

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
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}
</style>
