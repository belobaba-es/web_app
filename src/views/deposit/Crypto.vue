<template>
    <div>
        <Dialog v-model:visible="displayNew" :modal="true" closeIcon="pi pi-times-circle">
            <template #header>
                <img src="/src/assets/icons/ewallet.svg" alt="" height="50">
            </template>
            <div class="grid">
                <div class="col-12">
                    <span class="text-xl txt-border-bottom mb-2">Nueva dirección de billetera</span>

                </div>
                <div class="field col-12" style="display: grid;">
                    <label for="select-crypto">Select crypto</label>
                    <Dropdown id="select-crypto" v-model="selectedAsset" :options="assets" optionLabel="name" placeholder="" />
                  
              
                </div>
                <div class="field col-12" style="display: grid;">
                    <label for="name">Nombre de la Billetera</label>
                    <InputText id="name" type="text" v-model="value" />
                  
              
                </div>

            </div>

            <template #footer>
                <Button :label="t('createWallet')" icon="" autofocus />
            </template>
        </Dialog>

        <Dialog v-model:visible="display">
            <template #header>
                <h3>Header</h3>
            </template>

            <div class="col-12 ">
                <div class="p-inputgroup">
                    <InputText :placeholder="t('walletAddress')" />
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-copy"></i>
                    </span>
                </div>
            </div>

            <template #footer>
                <Button :label="t('done')" icon="pi pi-check" autofocus />
            </template>
        </Dialog>

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
                        <div class="asset-icon asset-ltc">
                            <img src="/src/assets/icons/deposit-assets/litecoin.svg" alt="">
                        </div>
                        <span>{{item.name}}</span>
                        <Button icon="pi pi-eye" class="p-button-text" label="ver direccion" @click="display = !display"/>
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

const { t } = useI18n({ useScope: 'global' })

const value = ref('');
const display = ref(false);
const displayNew = ref(false);
const selectedAsset = ref('')

const assets = ref<Asset[]>([
        {
            "id": "5fgD6CM1CA05FrGDDnI0",
            "assetId": "27552c2e-7ddb-4144-81e3-23f87c94da3f",
            "active": true,
            "updatedAt": "2022-10-11 09:49:23.101628-03",
            "code": "litecoin",
            "name": "Litecoin",
            "createdAt": "2022-10-11 09:49:23.101608-03",
            "minimumWithdrawal": 0,
            "fee": 0
        },
        {
            "id": "6WQzAhc6BMJGHhaCQzmI",
            "active": true,
            "updatedAt": "2022-10-11 09:49:20.404117-03",
            "createdAt": "2022-10-11 09:49:20.404095-03",
            "assetId": "a923fa2a-2b15-4020-a643-8516cbad6129",
            "minimumWithdrawal": 0,
            "name": "Cardano",
            "fee": 0,
            "code": "ADA"
        },
        {
            "id": "9vfJ2fl27ND0crBQKuDP",
            "name": "USDC Test on Algorand",
            "updatedAt": "2022-10-11 09:49:24.44852-03",
            "code": "USDC (ALGO)",
            "minimumWithdrawal": 0.1,
            "fee": 0,
            "createdAt": "2022-10-11 09:49:24.448487-03",
            "active": true,
            "assetId": "5a9bc5d6-ee6d-4436-acc9-91557a058b72"
        },
        {
            "id": "El0S9XwLVZzm2DDGyOTO",
            "active": true,
            "minimumWithdrawal": 2e-8,
            "name": "Bitcoin",
            "fee": 0.0000923,
            "updatedAt": "2022-10-11 09:49:26.066857-03",
            "code": "bitcoin",
            "assetId": "798debbc-ec84-43ea-8096-13e2ebcf4749",
            "createdAt": "2022-10-11 09:49:26.066835-03"
        },
        {
            "id": "LbklkNahkIRyqivsQOtJ",
            "createdAt": "2022-10-11 09:49:24.448487-03",
            "fee": 0,
            "minimumWithdrawal": 10,
            "assetId": "ecca8bab-dcb2-419a-973e-aebc39ff4f03",
            "name": "AVAX",
            "active": true,
            "updatedAt": "2022-10-11 09:49:24.44852-03",
            "code": "Avalanche Testnet (TESTAVAX)"
        },
        {
            "id": "OGYn9vaeqxpe3umyN3u9",
            "active": true,
            "name": "Paxos Standard",
            "updatedAt": "2022-10-11 09:49:20.942635-03",
            "code": "DA-PAX",
            "createdAt": "2022-10-11 09:49:20.942606-03",
            "minimumWithdrawal": 0,
            "fee": 0,
            "assetId": "cfde486c-1a46-4f2c-a543-7681fcf13a80"
        },
        {
            "id": "PbQb6fnZsPQ2BEeJ6WWF",
            "code": "DA-USDT",
            "minimumWithdrawal": 0,
            "active": true,
            "name": "Tether USD",
            "updatedAt": "2022-10-11 09:49:22.553455-03",
            "createdAt": "2022-10-11 09:49:22.553434-03",
            "fee": 0,
            "assetId": "9b964e36-8509-4088-b908-141071087301"
        },
        {
            "id": "Wf9dnKWRpBKfjaPeCpBR",
            "minimumWithdrawal": 0,
            "assetId": "e63b0367-c47b-49be-987a-f14036b230cd",
            "name": "Ether (Goerli)",
            "fee": 0,
            "updatedAt": "2022-10-11 09:49:25.933093-03",
            "active": true,
            "code": "Ether",
            "createdAt": "2022-10-11 09:49:25.933046-03"
        },
        {
            "id": "gCH8ClxU9Qxch16SwQE7",
            "updatedAt": "2022-10-11 09:49:24.177367-03",
            "assetId": "00b89102-1109-4656-ba1f-833898f4fc8a",
            "createdAt": "2022-10-11 09:49:24.177347-03",
            "name": "TrueUSD",
            "fee": 0,
            "active": true,
            "code": "DA-TUSD",
            "minimumWithdrawal": 0
        },
        {
            "id": "nfXXi7F3OdJT307fWWxC",
            "createdAt": "2022-10-11 09:49:24.448487-03",
            "fee": 0,
            "active": true,
            "code": "USDC (XLM)",
            "updatedAt": "2022-10-11 09:49:24.44852-03",
            "minimumWithdrawal": 0.1,
            "assetId": "5c825b29-4d0c-44ae-803e-bdee9c454fae",
            "name": "USD Coin Test (Stellar)"
        },
        {
            "id": "uhij5YHDZ1vA9pYd743t",
            "minimumWithdrawal": 0,
            "updatedAt": "2022-10-11 09:49:20.808248-03",
            "createdAt": "2022-10-11 09:49:20.808228-03",
            "code": "DA-DAI",
            "name": "Dai",
            "assetId": "9aafdd2e-fc3e-43eb-877c-67efbb0a4cec",
            "active": true,
            "fee": 0
        },
        {
            "id": "wKExkfd638DUN1aeUF55",
            "code": "xrp",
            "minimumWithdrawal": 0,
            "assetId": "a1703b84-bbba-435d-a1d2-f8f73e9d01b6",
            "fee": 0,
            "name": "XRP",
            "updatedAt": "2022-10-11 09:49:24.311033-03",
            "active": true,
            "createdAt": "2022-10-11 09:49:24.311012-03"
        },
        {
            "id": "zlMCXHuRGoOea0vwMnbk",
            "active": true,
            "assetId": "e3d3d300-33be-43b7-96ad-9f5da59d27a6",
            "fee": 0,
            "code": "eos",
            "updatedAt": "2022-10-11 09:49:22.967475-03",
            "name": "EOS",
            "createdAt": "2022-10-11 09:49:22.967444-03",
            "minimumWithdrawal": 0
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
    border-radius: 5%;
}
.asset-ltc::after{
    content: "";
    background-color: #43D5AE;
    opacity: 0.2;
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
}
.asset-icon{
    height: 56px;
    width: 56px;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    position: relative;
}
.asset-icon > img {
    margin: auto 0;
}
</style>