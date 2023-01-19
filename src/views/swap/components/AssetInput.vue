<template>
  <div class="flex-row mb-3">
    <div class="flex justify-content-between align-items-center">
      <template v-if="type === 'fiat'">
        <span v-if="transactionType === 'buy'">
          {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode('USD') }}</span>
        </span>
        <span v-else>
          <span> {{ t('iWant') }}: </span>
        </span>
      </template>
      <template v-else>
        <span v-if="transactionType === 'buy'"> {{ t('iWant') }}: </span>
        <span v-else>
          {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(assetCode) }}</span>
        </span>
      </template>
    </div>
    <div
      class="p-3 mt-2 border-1 border-primary-100 border-solid border-round-lg bg-gray-100 flex align-items-center justify-content-between"
    >
      <div class="input-mount">
        <template v-if="type === 'fiat'">
          <InputNumber
            v-model="amount"
            mode="decimal"
            :max-fraction-digits="2"
            :min-fraction-digits="2"
            :readonly="transactionType === 'sell'"
          />
        </template>
        <template v-else>
          <InputNumber
            v-model="unitCount"
            mode="decimal"
            :max-fraction-digits="8"
            :min-fraction-digits="8"
            :readonly="transactionType === 'buy'"
          />
        </template>
      </div>
      <div>
        <template v-if="type === 'crypto'">
          <Button
            type="button"
            class="bg-white btn-select-crypto border-none border-round-3xl"
            @click="openModalSelector"
            :disabled="disabledBtnSelectCrypto"
          >
            <img v-if="assetIcon" class="logo-cripto" alt="logo" :src="assetIcon" />
            <span class="ml-2 font-medium text-black-alpha-70 mx-3">{{
              assetName ? assetName : t('selectCrypto')
            }}</span>
            <i class="pi pi-caret-down text-primary"></i>
          </Button>
        </template>
        <template v-else>
          <img alt="logo" class="logo-usd" :src="getWalletByAssetCode('USD')?.icon" style="width: 3.5rem" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, watch, computed, toRef } from 'vue'
import { defineProps } from 'vue'
import Button from 'primevue/button'
import { useSwapStore } from '../../../stores/swap'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import InputNumber from 'primevue/inputnumber'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'

interface Props {
  type: string
}

const toast = useToast()

const { getWalletByAssetCode, getBalanceByCode } = useBalanceWallet()

const {
  amount,
  assetName,
  assetIcon,
  unitCount,
  showModalAssetSelector,
  loading,
  transactionType,
  assetCode,
  assetId,
} = storeToRefs(useSwapStore())

const { createQuote } = useSwapStore()

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<Props>()
const balance = getBalanceByCode('USD')

const openModalSelector = () => {
  showModalAssetSelector.value = true
}

watch(amount, newValue => {
  if (!balance) return

  if (!newValue) {
    amount.value = 0.0
  }
})

const disabledBtnSelectCrypto = computed(() => {
  if (transactionType.value === 'buy') {
    return amount.value === 0.0 || loading.value
  } else if (transactionType.value === 'sell') {
    return loading.value
  }
})

watch(unitCount, async newVal => {
  if (transactionType.value === 'sell' && props.type === 'crypto' && newVal > 0.0 && assetId.value) {
    if (newVal > getBalanceByCode(assetCode.value)) {
      toast.add({
        severity: 'error',
        summary: t('somethingWentWrong'),
        detail: t('insufficientFunds'),
        life: 4000,
      })
      return
    }
    await createQuote()
  }
})
</script>

<style scoped>
.border-round-3xl {
  border-radius: 2.5rem !important;
}

.btn-select-crypto {
  margin-left: -130px;
}

.logo-usd {
  margin-left: -50px;
}

.logo-cripto {
  max-width: 25px;
}
</style>
