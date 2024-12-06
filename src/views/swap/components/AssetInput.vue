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
            <Dropdown
              filter
              v-model="assetCode"
              :disabled="disabledBtnSelectCrypto"
              :options="listAssetSupported"
              optionLabel="name"
              :placeholder="t('selectDestinationAsset')"
              class="bg-white btn-select-crypto border-none font-medium w-full asset-base"
              @change="selectedAsset($event.value)"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <img
                    :alt="slotProps.value"
                    :src="getAssetByAssetCode(slotProps.value)?.icon"
                    class="mr-2"
                    style="width: 25px"
                  />
                  <div>{{ slotProps.value }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img :alt="slotProps.option.label" :src="slotProps.option.icon" class="mr-2" style="width: 25px" />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </template>
          <template v-else>
            <Dropdown
              v-model="fiatUsdAssetCode"
              filter
              :options="assetsBase"
              optionLabel="name"
              :disabled="disabledAsset"
              :loading="loadingPairsAssets"
              :placeholder="t('selectOrigenAsset')"
              class="bg-white btn-select-crypto border-none font-medium w-full asset-base"
              @change="selectSupportedAsset($event.value)"
            >
              <template #value="slotProps: any">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <img
                    :alt="slotProps.value"
                    :src="getAssetByAssetCode(slotProps.value)?.icon"
                    class="mr-2"
                    style="width: 25px"
                  />
                  <div>{{ slotProps.value }}</div>
                </div>
                <span v-else> {{ slotProps.placeholder }} </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img :alt="slotProps.option.label" :src="slotProps.option.icon" class="mr-2" style="width: 25px" />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </template>
        </div>

        <div class="input-mount col-5 flex align-items-center">
          <template v-if="type === 'fiat'">
            <InputNumber
              v-model="amountAfterRemovingFee"
              mode="decimal"
              :max-fraction-digits="assetClassificationOrigen !== AssetClassification.CRYPTO ? 2 : 6"
              :min-fraction-digits="assetClassificationOrigen !== AssetClassification.CRYPTO ? 2 : 6"
              @blur="verifyAmountForCreateQoute()"
              :readonly="transactionType === 'sell'"
            />
          </template>
          <template v-else>
            <InputNumber
              v-model="unitCount"
              mode="decimal"
              :max-fraction-digits="assetClassificationDestination !== AssetClassification.CRYPTO ? 2 : 6"
              :min-fraction-digits="assetClassificationDestination !== AssetClassification.CRYPTO ? 2 : 6"
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
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(fiatUsdAssetCode) }}</span>
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
import { computed, defineProps, ref, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useSwapStore } from '../../../stores/swap'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import InputNumber from 'primevue/inputnumber'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useExchangePairs } from '../../../composables/useExchangePairs'
import { useAssets } from '../../../composables/useAssets'
import { AssetClassification } from '../../deposit/types/asset.interface'

const { assetsBase, disabledAsset, listAssetSupported, loadingPairsAssets } = useExchangePairs()
const { getAssetByAssetCode } = useAssets()

interface Props {
  type: string
}

const toast = useToast()

const { getWalletByAssetCode, getBalanceByCode } = useBalanceWallet()

const { amountAfterRemovingFee, unitCount, loading, transactionType, assetCode, assetId, fiatUsdAssetCode } =
  storeToRefs(useSwapStore())

const { createExchange, clearTimer } = useSwapStore()

const { t } = useI18n({ useScope: 'global' })
const assetClassificationOrigen = ref(AssetClassification.FIAT)
const assetClassificationDestination = ref(AssetClassification.FIAT)

const props = defineProps<Props>()
const emit = defineEmits(['selectSupportedAsset', 'selectedAsset'])

const balance = getBalanceByCode('USD')
const selectedAsset = (event: any) => {
  const asset = getAssetByAssetCode(event.code)
  assetClassificationDestination.value = asset?.assetClassification ?? AssetClassification.FIAT
  emit('selectedAsset', asset)
}
const selectSupportedAsset = (event: any) => {
  assetCode.value = ''
  amountAfterRemovingFee.value = 0.0
  unitCount.value = 0.0
  fiatUsdAssetCode.value = event.value
  assetClassificationOrigen.value = getAssetByAssetCode(event.value)?.assetClassification ?? AssetClassification.FIAT
  emit('selectSupportedAsset', event.value)
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
  if (typeCode === 'USD') {
    amountAfterRemovingFee.value = getBalanceByCode('USD', false)
  } else {
    unitCount.value = getBalanceByCode(assetCode.value)
  }
}

const getUsdIcon = () => {
  const defaultUsdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'

  return getWalletByAssetCode('USD')?.icon ?? defaultUsdIcon
}
</script>

<style lang="scss">
.asset-base {
  .pi {
    color: var(--primary-color) !important;
  }
}

.p-inputtext:nth-last-child(-n + 2):hover {
  border: none !important;
}

.logo-usd {
  text-align: center !important;
  vertical-align: middle !important;
}

.border-round-3xl {
  border-radius: 2.5rem !important;
}

.p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  box-sizing: inherit !important;
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
