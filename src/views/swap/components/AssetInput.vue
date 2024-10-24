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

    <div class="p-3 mt-2 border border-yellow-100 border-solid border-round-lg" style="background: #e4cea13b">
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
              <span class="ml-2 font-medium text-black-alpha-70 mx-3 text-span">
                {{ assetName ? assetName : t('selectCrypto') }}
              </span>
              <i class="pi pi-caret-down text-primary icon-down-cripto"></i>
            </Button>
          </template>
          <template v-else>
            <img alt="logo" class="logo-usd" :src="getUsdIcon()" style="width: 3.5rem" />
          </template>
        </div>

        <div class="input-mount col-5 flex align-items-center">
          <template v-if="type === 'fiat'">
            <InputNumber
              v-model="amountAfterRemovingFee"
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
              <Button type="button" class="bg-white border-none border-round-3xl max-btn" @click="maxCountInput(fiatUsdAssetCode)">
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
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(fiatUsdAssetCode) }}</span>
      </span>
    </template>

    <article v-else class="flex flex-row justify-content-between">
      <span v-if="assetCode">
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(assetCode) }}</span>
      </span>
      <span v-if="assetCode && transactionType === 'sell'">
        {{ t('networkFee') }}:
        <span class="font-medium">{{
            networkFee ? `${networkFee} ${assetCode}` : '--'
          }}</span>
      </span>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, defineProps, watch } from 'vue'
import Button from 'primevue/button'
import { useSwapStore } from '../../../stores/swap'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import InputNumber from 'primevue/inputnumber'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { FiatAssetCodes } from '../../wallet/types/assetCodes.interface'
import { useAuth } from '../../../composables/useAuth'
import { WalletProvider } from '../../login/types/login.interface'

interface Props {
  type: string
}

const toast = useToast()

const { getWalletByAssetCode, getBalanceByCode } = useBalanceWallet()
const { getWalletProvider } = useAuth()

const {
  amountAfterRemovingFee,
  amount,
  assetName,
  assetIcon,
  unitCount,
  showModalAssetSelector,
  loading,
  transactionType,
  assetCode,
  assetId,
  networkFee
} = storeToRefs(useSwapStore())

const { createExchange, clearTimer } = useSwapStore()

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<Props>()
const fiatUsdAssetCode =
  getWalletProvider() === WalletProvider.PINTTOSOFT ? FiatAssetCodes.USD_PANAMA : FiatAssetCodes.USD

const openModalSelector = () => {
  showModalAssetSelector.value = true
}

const disabledBtnSelectCrypto = computed(() => {
  if (transactionType.value === 'buy') {
    return amountAfterRemovingFee.value === 0.0 || loading.value
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
    await createExchange()
  }
})

const verifyAmountForCreateQoute = () => {
  //TODO el setTimeout es porque primevue tarda alguno milisegundo en actualizar la variable reactiva.
  setTimeout(async () => {
    if (
      transactionType.value === 'buy' &&
      assetCode.value &&
      amountAfterRemovingFee.value > 0 &&
      assetId.value &&
      !loading.value
    ) {
      console.log('entro')
      await clearTimer()
      await createExchange()
    }
  }, 1000)
}

const maxCountInput = (typeCode: string) => {
  if (typeCode === fiatUsdAssetCode) {
    amountAfterRemovingFee.value = getBalanceByCode(fiatUsdAssetCode, false)
  } else {
    unitCount.value = getBalanceByCode(assetCode.value)
  }
}

const getUsdIcon = () => {
  const defaultUsdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'
  const defaultUsdPanamaIcon = 'https://storage.googleapis.com/noba-dev/USD_PANAMA.svg'
  const defaultUSDIcon = {
    [FiatAssetCodes.USD]: defaultUsdIcon,
    [FiatAssetCodes.USD_PANAMA]: defaultUsdPanamaIcon,
  }

  return getWalletByAssetCode(fiatUsdAssetCode)?.icon ?? defaultUSDIcon[fiatUsdAssetCode]
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
  font-family: RedHatDisplayMedium !important;
  color: #000;
}

.max-btn {
  margin-left: -10px;
}

.icon-down-cripto {
  margin-top: 4px;
}
</style>
