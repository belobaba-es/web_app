<template>
  <div class="asset-item">
    <div
      class="grid align-items-center flex justify-content-center align-content-center flex-wrap sm:justify-content-center md:justify-content-center lg:justify-content-start xl:justify-content-start"
    >
      <div class="col-4 align-items-start flex align-items-center justify-content-start">
        <div class="asset-icon">
          <img class="icon-cripto" :src="asssetImg(paymentAddress.assetsId)" :alt="'icon-' + assetName(paymentAddress.assetsId)"/>
          <div class="font-semi-bold text-uppercase pl-3 text-center name-cripto-wallet">
            {{ assetName(paymentAddress.assetsId) }}
          </div>
        </div>
      </div>

      <div class="col-3 align-items-start flex align-items-center justify-content-start">
        <div class="">{{ paymentAddress.label }}</div>
      </div>

      <div class="col-5 align-items-center flex align-items-center justify-content-center">
        <Button
          icon="pi pi-eye"
          class="p-button-text btn-view-address"
          :label="t('viewAddress')"
          @click="emit('select', paymentAddress)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { Asset, PaymentAddress } from '../types/asset.interface'
import {useI18n} from "vue-i18n";

const props = defineProps<{
  assets: Array<Asset>
  paymentAddress: PaymentAddress
}>()
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['select'])

const asssetImg = (assetId: string) => {
  return props.assets.find(asset => asset.assetId == assetId)?.icon
}

const assetName = (assetId: string) => {
  return props.assets.find(asset => asset.assetId == assetId)?.code
}
</script>

<style lang="css" scoped>
* {
  --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
}

.asset-item {
  border-top: 1px solid var(--surface-overlay);
  border-bottom: 1px solid var(--surface-overlay);
}

.asset-item:hover {
  background-color: var(--surface-overlay);
}

.asset-icon {
  height: 56px;
  width: 56px;
  margin: 0.5rem;
  display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
  align-content: flex-start;
  flex-direction: row;
}
.name-cripto-wallet {
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
}
.btn-view-address {
  --max-font: 15;
  --min-font: 12;
  font-size: var(--responsive);
}
</style>
