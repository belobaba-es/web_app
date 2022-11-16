<template>
    <div>
        <NewWallet :assets="assets" v-model:name="name" :display="displayNew" > </NewWallet>
        <ViewAddress v-model:visible="display" :asset="selectViewAsset"> </ViewAddress>
        

        <p class="text-3xl font-medium mb-4">{{t('deposit')}} / <span class="text-primary">Crypto </span></p>
        
        <div class="grid">
            <div class="col-8 ">
                
                <span class="p-input-icon-left flex p-fluid">
                    <i class="pi pi-search" />
                    <InputText type="text" class="b-gray"  :placeholder="t('searchWallet')" />
                    <Button class="p-button search-btn" :label="t('search')"/>
                </span>
            </div>
            <div class="col-4">
                <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
            </div>
            <div class="col-10">
                <div class="container">
                    <div class="flex justify-content-between align-items-center asset-item" v-for="(item) in assets">
                        <div class="asset-icon">
                            <img :src="item.icon" alt="">
                        </div>
                        <span>{{item.name}}</span>
                        <Button icon="pi pi-eye" class="p-button-text" label="ver direccion" @click="viewAddressAsset(item); display = true"/>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { Asset } from './types/asset.interface';
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue';

const { t } = useI18n({ useScope: 'global' })

const value = ref('');
const display = ref(false);
const displayNew = ref(false);
const selectedAsset = ref('')
const name = ref('');
const selectViewAsset= ref<Asset | null> (null);
const viewAddressAsset = (item: Asset) =>{
    display.value = !display.value;
    display.value = true;
    console.log(item, display)
    selectViewAsset.value = item
}

const assets = ref<Asset[]>([
        {
            "id": "5fgD6CM1CA05FrGDDnI0",
            "icon": "https://storage.googleapis.com/noba-dev/LTC.svg",
            "active": true,
            "minimumWithdrawal": 0,
            "fee": 0,
            "updatedAt": "2022-10-11 09:49:23.101628-03",
            "code": "litecoin",
            "name": "Litecoin",
            "assetId": "27552c2e-7ddb-4144-81e3-23f87c94da3f",
            "createdAt": "2022-10-11 09:49:23.101608-03"
        },
        {
            "id": "6WQzAhc6BMJGHhaCQzmI",
            "assetId": "a923fa2a-2b15-4020-a643-8516cbad6129",
            "icon": "https://storage.googleapis.com/noba-dev/ADA.svg",
            "fee": 0,
            "active": true,
            "minimumWithdrawal": 0,
            "createdAt": "2022-10-11 09:49:20.404095-03",
            "code": "ADA",
            "updatedAt": "2022-10-11 09:49:20.404117-03",
            "name": "Cardano"
        },
        {
            "id": "9vfJ2fl27ND0crBQKuDP",
            "updatedAt": "2022-10-11 09:49:24.44852-03",
            "minimumWithdrawal": 0.1,
            "assetId": "5a9bc5d6-ee6d-4436-acc9-91557a058b72",
            "name": "USDC Test on Algorand",
            "createdAt": "2022-10-11 09:49:24.448487-03",
            "code": "USDC (ALGO)",
            "icon": "https://storage.googleapis.com/noba-dev/USDC.svg",
            "fee": 0,
            "active": true
        },
        {
            "id": "El0S9XwLVZzm2DDGyOTO",
            "name": "Bitcoin",
            "updatedAt": "2022-10-11 09:49:26.066857-03",
            "code": "bitcoin",
            "minimumWithdrawal": 2e-8,
            "fee": 0.0000923,
            "assetId": "798debbc-ec84-43ea-8096-13e2ebcf4749",
            "active": true,
            "icon": "https://storage.googleapis.com/noba-dev/BTC.svg",
            "createdAt": "2022-10-11 09:49:26.066835-03"
        },
        {
            "id": "OGYn9vaeqxpe3umyN3u9",
            "fee": 0,
            "updatedAt": "2022-10-11 09:49:20.942635-03",
            "createdAt": "2022-10-11 09:49:20.942606-03",
            "name": "Paxos Standard",
            "active": true,
            "icon": "https://storage.googleapis.com/noba-dev/PAX.svg",
            "code": "DA-PAX",
            "minimumWithdrawal": 0,
            "assetId": "cfde486c-1a46-4f2c-a543-7681fcf13a80"
        },
        {
            "id": "PbQb6fnZsPQ2BEeJ6WWF",
            "fee": 0,
            "active": true,
            "updatedAt": "2022-10-11 09:49:22.553455-03",
            "assetId": "9b964e36-8509-4088-b908-141071087301",
            "createdAt": "2022-10-11 09:49:22.553434-03",
            "name": "Tether USD",
            "icon": "https://storage.googleapis.com/noba-dev/USDT.svg",
            "code": "DA-USDT",
            "minimumWithdrawal": 0
        },
        {
            "id": "Wf9dnKWRpBKfjaPeCpBR",
            "assetId": "e63b0367-c47b-49be-987a-f14036b230cd",
            "code": "Ether",
            "fee": 0,
            "active": true,
            "updatedAt": "2022-10-11 09:49:25.933093-03",
            "name": "Ether (Goerli)",
            "icon": "https://storage.googleapis.com/noba-dev/ETH.svg",
            "createdAt": "2022-10-11 09:49:25.933046-03",
            "minimumWithdrawal": 0
        },
        {
            "id": "gCH8ClxU9Qxch16SwQE7",
            "name": "TrueUSD",
            "active": true,
            "updatedAt": "2022-10-11 09:49:24.177367-03",
            "minimumWithdrawal": 0,
            "icon": "https://storage.googleapis.com/noba-dev/TUSD.svg",
            "code": "DA-TUSD",
            "createdAt": "2022-10-11 09:49:24.177347-03",
            "fee": 0,
            "assetId": "00b89102-1109-4656-ba1f-833898f4fc8a"
        },
        {
            "id": "nfXXi7F3OdJT307fWWxC",
            "createdAt": "2022-10-11 09:49:24.448487-03",
            "minimumWithdrawal": 0.1,
            "assetId": "5c825b29-4d0c-44ae-803e-bdee9c454fae",
            "active": true,
            "icon": "https://storage.googleapis.com/noba-dev/XML.svg",
            "name": "USD Coin Test (Stellar)",
            "updatedAt": "2022-10-11 09:49:24.44852-03",
            "fee": 0,
            "code": "USDC (XLM)"
        },
        {
            "id": "uhij5YHDZ1vA9pYd743t",
            "fee": 0,
            "updatedAt": "2022-10-11 09:49:20.808248-03",
            "minimumWithdrawal": 0,
            "code": "DA-DAI",
            "name": "Dai",
            "createdAt": "2022-10-11 09:49:20.808228-03",
            "active": true,
            "icon": "https://storage.googleapis.com/noba-dev/DAI.svg",
            "assetId": "9aafdd2e-fc3e-43eb-877c-67efbb0a4cec"
        },
        {
            "id": "wKExkfd638DUN1aeUF55",
            "assetId": "a1703b84-bbba-435d-a1d2-f8f73e9d01b6",
            "fee": 0,
            "code": "xrp",
            "minimumWithdrawal": 0,
            "name": "XRP",
            "updatedAt": "2022-10-11 09:49:24.311033-03",
            "createdAt": "2022-10-11 09:49:24.311012-03",
            "icon": "https://storage.googleapis.com/noba-dev/XRP.svg",
            "active": true
        },
        {
            "id": "zlMCXHuRGoOea0vwMnbk",
            "code": "eos",
            "updatedAt": "2022-10-11 09:49:22.967475-03",
            "minimumWithdrawal": 0,
            "icon": "https://storage.googleapis.com/noba-dev/EOS.svg",
            "assetId": "e3d3d300-33be-43b7-96ad-9f5da59d27a6",
            "active": true,
            "fee": 0,
            "createdAt": "2022-10-11 09:49:22.967444-03",
            "name": "EOS"
        }
    ]
)

</script>

<style lang="css">
.b-gray{
    background-color: var(--surface-overlay);
}
.search-btn{
    width: 30% !important;
}
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