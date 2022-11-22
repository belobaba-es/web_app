<template>
    <div class="container">
        <div class="flex justify-content-between align-items-center asset-item" v-for="(item) in paymentAddress">
            <div class="flex align-items-center">
                <div class="asset-icon">
                    <img :src=" asssetImg(item.assetsId)">
                </div>
                <span class="font-semi-bold">{{assetName(item.assetsId)}}</span>
            </div>
            <span>{{item.label}}</span>
            <Button icon="pi pi-eye" class="p-button-text" label="ver direccion" @click="emit('select',item);"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Button from 'primevue/button';
import { Asset, PaymentAddress } from '../types/asset.interface';

const props = defineProps<{
	assets: Array<Asset>,
    paymentAddress: Array<PaymentAddress>
}>()

const emit = defineEmits(['select']);


const asssetImg = (assetId: string) => {
      return props.assets.find(asset=>asset.assetId == assetId)?.icon
}

const assetName = (assetId: string) => {
    return props.assets.find(asset=>asset.assetId == assetId)?.code
}
</script>

<style lang="css" scoped>

.asset-item{
    border-top: 1px solid var(--surface-overlay);
    border-bottom: 1px solid var(--surface-overlay);
}
.asset-item:hover{
    background-color: var(--surface-overlay);
    
}

.asset-icon{
    height: 56px;
    width: 56px;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    position: relative;
}

</style>