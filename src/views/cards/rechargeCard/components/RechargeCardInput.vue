<template>
  <div class="flex-row mb-3">
    <div class="flex justify-content-between align-items-center">
      <template>
        <span v-if="type === 'fiat'">
          <span>{{ t('from') }}</span>
        </span>
        <span v-else>
          <span>{{ t('to') }}</span>
        </span>
      </template>
    </div>

    <div class="p-3 mt-2 border-1 border-gray-500 border-solid border-round-lg bg-gray-100 input">
      <div class="grid">
        <div class="col-5 flex align-items-center">
          <template v-if="type === 'crypto'">
            <Button
              class="bg-white btn-select-crypto border-none border-round-3xl"
              type="button"
              @click="openModalSelector"
            >
              <img v-if="rechargeState.assetIcon" :src="rechargeState.assetIcon" alt="logo" class="logo-cripto" />
              <span class="ml-2 font-medium text-black-alpha-70 mx-3 text-span">
                {{ rechargeState.assetName ? rechargeState.assetName : 'Select Asset' }}
              </span>
              <i class="pi pi-caret-down text-primary icon-down-cripto"></i>
            </Button>
          </template>
          <template v-else>
            <img :src="card" alt="logo" class="logo-usd" style="width: 3.5rem" />
          </template>
        </div>

        <div class="input-mount col-5 flex align-items-center">
          <template v-if="type === 'crypto'">
            <InputNumber
              v-model="rechargeState.amount"
              :max-fraction-digits="6"
              :min-fraction-digits="6"
              mode="decimal"
            />
          </template>
          <template v-else>
            <InputNumber
              v-model="rechargeState.unitCount"
              :max-fraction-digits="2"
              :min-fraction-digits="2"
              disabled
              mode="decimal"
            />
          </template>
        </div>
        <div class="col-2 flex align-items-center">
          <template v-if="type === 'crypto'">
            <div>
              <Button
                class="bg-white border-none border-round-3xl max-btn"
                type="button"
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
      <span>
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode('USD') }}</span>
      </span>
    </template>

    <template v-else>
      <span v-if="rechargeState.assetCode">
        {{ t('iHave') }}: <span class="font-medium">{{ getBalanceByCode(rechargeState.assetCode) }}</span>
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { Asset } from '../../../deposit/types/asset.interface'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useRechargeCard } from '../composables/useRechargeCard'
import card from '../../../../assets/img/card.png'

interface Props {
  type: string
}

const { openModalSelector, rechargeState } = useRechargeCard()
const { getBalanceByCode } = useBalanceWallet()

const { t } = useI18n({ useScope: 'global' })
const props = defineProps<Props>()

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

const maxCountInput = (typeCode: string) => {
  console.log(rechargeState)
  if (typeCode === 'USD') {
    rechargeState.value.unitCount = getBalanceByCode('USD', false)
  } else {
    rechargeState.value.amount = getBalanceByCode(rechargeState.value.assetCode)
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

.input {
  @media only screen and (max-width: 480px) {
    width: 350px;
  }

  @media only screen and (min-width: 620px) {
    width: 450px;
  }
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
../composables/useSwap
