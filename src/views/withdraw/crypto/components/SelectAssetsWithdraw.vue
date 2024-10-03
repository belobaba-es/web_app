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
import { computed, ref, watch } from 'vue'
import { Asset, AssetClassification, AssetClassificationFilter } from '../../../deposit/types/asset.interface'
import { useI18n } from 'vue-i18n'
import ModalAssetSelector from '../../../../components/ModalAssetSelector.vue'
import Message from 'primevue/message'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useWithdrawalCrypto } from '../composable/useWithdrawalCrypto'
import { useBeneficiaryCrypto } from '../composable/useBeneficiaryCrypto'
import { useAssets } from '../../../../composables/useAssets'

const showModal = ref(false)
const isFiat = ref(false)
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['selectedAsset'])
const { isAssetEdit, form } = useBeneficiaryCrypto()
const { isWithdrawal, assetSelected } = useWithdrawalCrypto()

const assetFilter = ref()
const { getAssetByAssetId } = useAssets()
const { balance } = useWithdrawalCrypto()
const { getBalanceByCode } = useBalanceWallet()
const modal = (b: boolean) => {
  if (isWithdrawal.value && form.value.informationWallet.assetId) return
  showModal.value = b
}
const fillAsset = (asset: Asset | undefined) => {
  if (asset) {
    emit('selectedAsset', asset)
    assetSelected.value.nameAsset = asset.name
    assetSelected.value.iconAsset = asset.icon
    assetSelected.value.assetName = asset.name
    assetSelected.value.networkAddress = asset.networkName + ' ' + asset.network
  }
}

watch(
  assetFilter,
  newVal => {
    assetSelected.value.nameAsset = newVal.name
    assetSelected.value.iconAsset = newVal.icon
    assetSelected.value.assetName = newVal.name
    assetSelected.value.networkAddress = newVal.networkName + ' ' + newVal.network
  },
  { deep: true }
)

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
if (isAssetEdit.value) {
  const assetFound = getAssetByAssetId(form.value.informationWallet.assetId)
  assetFilter.value = assetFound
  fillAsset(assetFound)
}
if (isWithdrawal.value) {
  if (form.value.informationWallet.assetId) {
    const assetFound = getAssetByAssetId(form.value.informationWallet.assetId)
    assetFilter.value = assetFound
    fillAsset(assetFound)
    if (assetFound) {
      balance.value = getBalanceByCode(assetFound.code)
    }
  }
}
const clearAsset = () => {
  assetSelected.value.nameAsset = ''
  assetSelected.value.iconAsset = ''
  assetSelected.value.assetName = ''
  assetSelected.value.networkAddress = ''
}

if (!isAssetEdit.value) {
  clearAsset()
}
if (isWithdrawal.value) {
  const assetFound = getAssetByAssetId(form.value.informationWallet.assetId)

  fillAsset(assetFound)
}

if (!isWithdrawal.value) {
  clearAsset()
}

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
