<template>
    <div>
        <NewWallet :assets="assets"  v-model:display="displayNew" v-model:asset-select="assetSelect" @create="onCreateAddress"> </NewWallet>
        <ViewAddress v-model:visible="display" :asset="selectViewAsset" :payment-address="selectPaymentAddress"> </ViewAddress>
        
        <p class="text-3xl font-medium mb-4">{{t('deposit')}} / <span class="text-primary">{{t('crypto')}} </span></p>
        
        <div class="grid">
            <div class="col-10 ">
                
                <span class="p-input-icon-left flex p-fluid">
                    <i class="pi pi-search" />
                    <InputText type="text" class="b-gray"  :placeholder="t('searchWallet')" />
                    <Button class="p-button search-btn" :label="t('search')"/>
                </span>
            </div>
            <div class="col-4">
                <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
            </div>
            <div class="col-10">.
                <ListAssets :assets="assets" :payment-address="paymentAddress" v-on:select="viewAddressAsset($event)"></ListAssets>
                
            </div>
            <div class="col-4">
                <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { Asset, CreatePaymentAddress, EventCreatePaymentAddress, PaymentAddress } from './types/asset.interface';
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue';
import { AssetsService } from './services/assets';
import ListAssets from './components/ListAssets.vue';
import { datetime } from '@intlify/core-base';

const { t } = useI18n({ useScope: 'global' })

const display = ref(false);
const displayNew = ref(false);
const assetSelect = ref(null)
const selectViewAsset= ref<Asset | null > (null);
const selectPaymentAddress = ref<PaymentAddress | null> (null);

const findAsset = (assetId: string) => {
    const assetSelect = assets.value.find(asset=>asset.assetId == assetId)
    if(assetSelect){
        return assetSelect 
    }
    return null 
}

const viewAddressAsset = (item: PaymentAddress) =>{
    display.value = !display.value;
    display.value = true;
   
    selectPaymentAddress.value = item
    selectViewAsset.value = findAsset(item.assetsId)
}

const assetsService = AssetsService.instance();
const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddress[]>([])

onMounted(async () => {
    assetsService.list().then(data => assets.value = data);
    assetsService.listPaymentAddress().then(data=>paymentAddress.value = data.results)
});

const onCreateAddress = (event: EventCreatePaymentAddress) =>{
    console.log(assetSelect, 'asset')
    const data = {label: event.label, assetCode: event.assetCode}
    
    assetsService.paymentAddress(data).then(resp=>{
        console.log('response',data)
        
        const payment = {
            label:     data.label,
            accountId: "",
            address:   resp.paymentAddress,
            assetsId:  event.asset.assetId,
            qr:       resp.qr,
        }
        selectPaymentAddress.value = payment
        displayNew.value = true;
        display.value = true;
    })
    // selectViewAsset.value = data
}
</script>

<style lang="css" scoped>
.b-gray{
    background-color: var(--surface-overlay);
}
.search-btn{
    width: 30% !important;
}
</style>