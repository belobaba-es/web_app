<template>
  <section class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8 mb-4 p-0">
    <label class="black-bold-text">{{ t('selectCrypto') }}</label>
    <div class="grid selectCypto mt-3" @click="modal(true)">
      <div class="col-2">
        <img width="26" :src="iconAsset" />
      </div>
      <div class="col-8 pt-2">
        {{ nameAsset }}
      </div>
      <div class="col-2 text-right">
        <i class="pi pi-chevron-down mt-2"></i>
      </div>
    </div>

    <div v-show="!isFiat" class="col-12" v-if="networkAddress">
      <Message severity="warn" :closable="false">
        {{ t('warningSendAsset', { asset: nameAsset }) }}
      </Message>

      <p class="text-base font-bold text-uppercase">
        {{ t('warningAssetNetwork', { networkName: networkAddress }) }}
      </p>
    </div>
  </section>

  <ModalAssetSelector
    :show-modal="showModal"
    @update:visible="modal($event)"
    closeIcon="pi pi-times-circle"
    @selected-asset="selectedAsset"
    :asset-classification-filter="assetClassificationFilter"
  />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Asset, AssetClassification, AssetClassificationFilter } from '../views/deposit/types/asset.interface'
import { useI18n } from 'vue-i18n'
import ModalAssetSelector from './ModalAssetSelector.vue'
import Message from 'primevue/message'

const showModal = ref(false)
const nameAsset = ref('')
const iconAsset = ref('')
const networkAddress = ref('')
const isFiat = ref(false)
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['selectedAsset'])

const props = defineProps<{
  assetClassificationFilter: AssetClassificationFilter
}>()

const modal = (b: boolean) => {
  showModal.value = b
}

const selectedAsset = (asset: Asset) => {
  emit('selectedAsset', asset)

  isFiat.value = asset.assetClassification === AssetClassification.FIAT

  nameAsset.value = asset.name
  iconAsset.value = asset.icon
  networkAddress.value = asset.networkName + ' ' + asset.network

  showModal.value = false
}
</script>

<style scoped>
.selectCypto {
  cursor: pointer;
  border: 1px solid #ccc;
  margin-left: 0.1rem;
  padding: 6px;
  background: #f9f9f9 0% 0% no-repeat padding-box;
  border: 1px solid #ececec;
}

.black-bold-text {
  font-weight: 800;
  color: black;
}

.p-message.p-message-warn {
  background: #ffee002b;
  border: solid #ffcd00;
  border-top-width: medium;
  border-right-width: medium;
  border-bottom-width: medium;
  border-left-width: medium;
  border-width: 1px 1px 1px 1px;
  color: #000000;
  border-radius: 13px;
}
</style>
