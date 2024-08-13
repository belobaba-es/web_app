<template>
  <Dialog
    v-model:visible="props.showModal"
    :modal="true"
    closeIcon="pi pi-times-circle"
    class="modal-asset-selector"
    :style="{ width: '30rem' }"
  >
    <template #header>
      <div class="header-container">
        <h2 class="font-medium text-center mb-0" style="color: #00beb0">Aceptar cotización</h2>
        <p class="text-center">Ahora puedes comprar, transmitir y transferir cómodamente.</p>
      </div>
    </template>
    <div class="body-container">
      <div class="quotation-details">
        <div class="flex flex-row justify-content-between align-items-center">
          <p class="m-0" style="font-size: 14px">Desde tu balance:</p>
        </div>
        <div class="flex flex-row justify-content-between align-items-center">
          <p class="m-0" style="color: #00beb0">{{ rechargeState.assetName }}</p>
          <p class="m-0" style="color: #00beb0">{{ rechargeState.amount }}</p>
        </div>
      </div>
      <Divider />
      <div class="payment-details">
        <div class="flex flex-row justify-content-between align-items-center">
          <div>
            <p class="m-0" style="font-size: 14px">Hacia tarjeta:</p>
            <p class="m-0" style="color: #00beb0">Card Noba {{ cardInfo.isPhysical ? 'Fisica' : 'Virtual' }}</p>
            <p class="m-0">{{ cardInfo.cardNumber }}</p>
          </div>
          <p class="m-0" style="color: #00beb0">{{ rechargeState.unitCount }} USD</p>
        </div>
      </div>
      <Divider />
    </div>
    <template #footer>
      <div class="footer-container">
        <Button
          type="button"
          class="accept-button w-4 py-3"
          @click="handleAcceptQuote()"
          :loading="rechargeState.loading"
        >
          {{ t('confirm') }}
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import { useCardCenter } from '../../cardCenter/Composables/useCardCenter'
import { useRechargeCard } from '../composables/useRechargeCard'
import { defineProps } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { rechargeState } = useRechargeCard()
const { cardInfo } = useCardCenter()
const { handleAcceptQuote } = useRechargeCard()
const { t } = useI18n({ useScope: 'global' })

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.quotation-details,
.payment-details,
.total-amount {
  margin-bottom: 1rem;
}

.total-amount p:last-child {
  color: #00beb0;
}

.accept-button {
  background-color: #00beb0;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;
}

.cancel-button {
  background-color: #e7e7e7;
  color: #666;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

p {
  font-size: 16px;
}
</style>
