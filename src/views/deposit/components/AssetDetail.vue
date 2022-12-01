<template>
  <div class="flex align-items-center asset-item">
    <div class="col-2 align-items-center grid">
      <div class="col-8 asset-icon">
        <img :src=" asssetImg(paymentAddress.assetsId)">
      </div>
      <div class="col-4 font-semi-bold text-uppercase pl-3">{{ assetName(paymentAddress.assetsId) }}</div>
    </div>
    <div class="col-7 text-left">{{ paymentAddress.label }}</div>
    <Button icon="pi pi-eye" class="p-button-text" label="ver direccion" @click="emit('select',paymentAddress);"/>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import {Asset, PaymentAddress} from '../types/asset.interface';

const props = defineProps<{
  assets: Array<Asset>,
  paymentAddress: PaymentAddress
}>()

const emit = defineEmits(['select']);


const asssetImg = (assetId: string) => {
  return props.assets.find(asset => asset.assetId == assetId)?.icon
}

const assetName = (assetId: string) => {
  return props.assets.find(asset => asset.assetId == assetId)?.code
}
</script>

<style lang="css" scoped>

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
  justify-content: center;
  position: relative;
}

</style>