<template>
  <div class="flex-row mb-3">
    <div class="flex justify-content-between align-items-center">
      <template v-if="type === 'fiat'">
        <span v-if="transactionType === 'buy'">
          <span>{{ t('from') }}</span>
        </span>
        <span v-else>
          <span>{{ t('to') }}</span>
        </span>
      </template>

      <template v-else>
        <span v-if="transactionType === 'buy'">
          <span>{{ t('to') }}</span>
        </span>
        <span v-else>
          <span>{{ t('from') }}</span>
        </span>
      </template>
    </div>

    <div class="p-3 mt-2 border-1 border-primary-100 border-solid border-round-lg bg-gray-100">
      <div class="grid">
        <div class="col-5 flex align-items-center">
          <template v-if="type === 'crypto'">
            <Button
              type="button"
              class="bg-white btn-select-crypto border-none border-round-3xl"
              @click="openModalSelector"
              :disabled="disabledBtnSelectCrypto"
            >
              <img v-if="assetIcon" class="logo-cripto" alt="logo" :src="assetIcon" />
              <span class="ml-2 font-medium text-black-alpha-70 mx-3 text-span">{{
                assetName ? assetName : t('selectCrypto')
              }}</span>
              <i class="pi pi-caret-down text-primary icon-down-cripto"></i>
            </Button>
          </template>
          <template v-else>
            <img alt="logo" class="logo-usd" :src="getWalletByAssetCode('USD')?.icon" style="width: 3.5rem" />
          </template>
        </div>

        <div class="input-mount col-5 flex align-items-center">
          <template v-if="type === 'fiat'">
            <InputNumber
              v-model="amount"
              mode="decimal"
              :max-fraction-digits="2"
              :min-fraction-digits="2"
              @blur="verifyAmountForCreateQoute()"
              :readonly="transactionType === 'sell'"
            />
          </template>
          <template v-else>
            <InputNumber
              v-model="unitCount"
              mode="decimal"
              :max-fraction-digits="6"
              :min-fraction-digits="6"
              :readonly="transactionType === 'buy'"
            />
          </template>
        </div>

        <div class="col-2 flex align-items-center">
          <template v-if="type === 'fiat'">
            <div v-if="transactionType === 'buy'">
              <Button type="button" class="bg-white border-none border-round-3xl max-btn" @click="maxCountInput('USD')">
                <span class="ml-2 font-medium text-black-alpha-70 mx-3 text-span-max">MÁX</span>
              </Button>
            </div>
          </template>

          <template v-else>
            <div v-if="transactionType === 'sell'">
              <Button
                type="button"
                class="bg-white border-none border-round-3xl max-btn"
                @click="maxCountInput('Cripto')"
              >
                <span class="ml-2 font-medium text-black-alpha-70 mx-3 text-span-max">MÁX</span>
              </Button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <template v-if="type === 'fiat'">
      <span v-if="transactionType === 'buy'">
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode('USD') }}</span>
      </span>
    </template>

    <template v-else>
      <span v-if="assetCode">
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(assetCode) }}</span>
      </span>
    </template>
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

const { createExchange, clearTimer } = useSwapStore()

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<Props>()
const balance = getBalanceByCode('USD')

const openModalSelector = () => {
  showModalAssetSelector.value = true
}

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
      // todo uncoment
      // return
    }
    await createExchange()
  }
})

const verifyAmountForCreateQoute = () => {
  //TODO el setTimeout es porque primevue tarda alguno milisegundo en actualizar la variable reactiva.
  setTimeout(async () => {
    if (transactionType.value === 'buy' && assetCode.value && amount.value > 0 && assetId.value && !loading.value) {
      await clearTimer()
      await createExchange()
    }
  }, 1000)
}

const maxCountInput = (typeCode: string) => {
  if (typeCode === 'USD') {
    amount.value = getBalanceByCode('USD')
  } else {
    unitCount.value = getBalanceByCode(assetCode.value)
  }
}
</script>

<style lang="scss">
.logo-usd {
  text-align: center !important;
  vertical-align: middle !important;
}

.border-round-3xl {
  border-radius: 2.5rem !important;
}

.input-mount .p-inputtext {
  @media only screen and (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media only screen and (min-width: 480px) {
    font-size: 1.5rem;
  }
}

.logo-cripto {
  max-width: 25px;
}

.text-span-max {
  margin: 0 !important;
}

.text-span {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 3px !important;
  margin-right: 5px !important;
}

.btn-select-crypto {
  @media only screen and (max-width: 480px) {
    padding: 7px;
  }
}

.text-max {
  font-family: KanitMedium !important;
  color: #000;
}

.max-btn {
  margin-left: -10px;
}

.icon-down-cripto {
  margin-top: 4px;
}
</style>
