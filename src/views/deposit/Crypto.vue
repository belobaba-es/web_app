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
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { Asset } from './types/asset.interface';
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue';
import { AssetsService } from './services/assets';

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

const assetsService = AssetsService.instance();
const assets = ref<Asset[]>([])

onMounted(async () => {
    assetsService.list().then(data => assets.value = data.data);
});


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