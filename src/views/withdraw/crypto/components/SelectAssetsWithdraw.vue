<template>
  <div :class="['col-12 md:col-12 lg:col-12', dynamicClass, 'float-left']">
    <label class="black-bold-text">{{ t('selectCrypto') }}</label>
    <div class="grid selectCypto mt-3" @click="modal(true)">
      <div class="col-2 mt-2 p-0 pl-2">
        <img :src="assetSelected.iconAsset" alt="" width="26" />
      </div>
      <div class="col-8 p-0" style="font-size: 1.2rem">
        {{ assetSelected.nameAsset }}
      </div>
      <div class="col-2 text-right">
        <i class="pi pi-chevron-down mt-2"></i>
      </div>
    </div>
  </div>

  <div
    v-if="assetSelected.nameAsset && !isWithdrawal"
    v-show="!isFiat"
    class="col-12 md:col-12 lg:col-12 xl:col-6 float-left"
  >
    <Message :closable="false" class="my-0" severity="warn">
      {{ t('warningSendAsset', { asset: assetSelected.networkAddress }) }}
    </Message>
  </div>

  <ModalAssetSelector
    :asset-classification-filter="AssetClassificationFilter.CRYPTO_STABLE_COIN"
    :show-modal="showModal"
    closeIcon="pi pi-times-circle"
    @update:visible="modal($event)"
    @selected-asset="selectedAsset"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Asset, AssetClassification, AssetClassificationFilter } from '../../../deposit/types/asset.interface'
import { useI18n } from 'vue-i18n'
import ModalAssetSelector from '../../../../components/ModalAssetSelector.vue'
import Message from 'primevue/message'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useWithdrawalCrypto } from '../composable/useWithdrawalCrypto'
import { useAssets } from '../../../../composables/useAssets'
import { useToast } from 'primevue/usetoast'
import showExceptionError from '../../../../shared/showExceptionError'

const showModal = ref(false)
const isFiat = ref(false)
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['selectedAsset'])
const { balance, form, isWithdrawal, assetSelected, transactionData } = useWithdrawalCrypto()
const toast = useToast()
const { getAssetByAssetId } = useAssets()
const { getBalanceByCode } = useBalanceWallet()
const modal = (b: boolean) => {
  if (isWithdrawal.value && form.value.informationWallet.assetId && form.value.isInternal === 'N') return
  showModal.value = b
}

const selectedAsset = (asset: Asset | undefined) => {
  emit('selectedAsset', asset)
  if (asset) {
    isFiat.value = asset.assetClassification === AssetClassification.FIAT
    assetSelected.value.nameAsset = asset.name
    assetSelected.value.iconAsset = asset.icon
    assetSelected.value.assetName = asset.name
    assetSelected.value.networkAddress = asset.networkName + ' ' + asset.network
  }

  showModal.value = false
}
onMounted(() => {
  console.log('assetId', form.value.assetId)
  if (form.value.assetId && isWithdrawal.value) {
    const assetFound = getAssetByAssetId(form.value.assetId)
    if (!assetFound) {
      showExceptionError(toast, 'error', t('assets'), t('messageErrorAsset'), 8000)
      return
    }
    if (assetFound) {
      selectedAsset(assetFound)
      transactionData.value = {
        ...transactionData.value,
        assetCode: assetFound.code,
      }
      balance.value = getBalanceByCode(assetFound.code)
    }
  }
})

const dynamicClass = computed(() => {
  return isWithdrawal.value ? 'xl:col-12' : 'xl:col-6'
})
</script>

<style lang="scss" scoped>
.selectCypto {
  cursor: pointer;
  margin-left: 0.1rem;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
}

label {
  font-size: 1.15rem;
}

.float-left {
  float: left;
}

.black-bold-text {
  font-weight: 800;
  color: black;
}

.p-message.p-message-warn {
  background: #f7dfb6;
  border: medium solid #d3f3e5;
  color: #000000;
  border-radius: 13px;
}
</style>
