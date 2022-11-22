<template>

    <Dialog :visible="display" @update:visible="emit('update:display', $event)" :modal="true" closeIcon="pi pi-times-circle" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
        <template #header>
            <img src="../../../assets/icons/ewallet.svg" alt="" height="50">
        </template>
        <div class="grid">
            <div class="col-12">
                <span class="text-xl txt-border-bottom mb-2">{{t('newWallet')}}</span>

            </div>
            <div class="field col-12" style="display: grid;">
                <label for="select-crypto">{{t('selectCrypto')}}</label>
                <Dropdown id="select-crypto" v-model="assetSelect"  :options="assets" optionLabel="name"  placeholder="" />
            </div>
            <div class="field col-12" style="display: grid;">
                <label for="name">{{t('nameWallet')}}</label>
                <InputText id="name" type="text" v-model="label" />
                <!-- @update:model-value="emit('update:name', $event)" -->
            </div>
        </div>

        <template #footer>
            <Button :label="t('createWallet')" icon="" autofocus @click="onCreate"/>
        </template>
    </Dialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { Asset, CreatePaymentAddress } from '../types/asset.interface';
import { defineProps } from 'vue';

defineProps<{
	assets: Array<Asset>,
    display: boolean,
    assetSelect: Asset | null
}>()

const assetSelect = ref<Asset|null>(null)  
const label = ref('')

const emit = defineEmits(['update:asset-select', 'update:display', 'create']);
const { t } = useI18n({ useScope: 'global' })

const onCreate= () => {
    emit('create', {
        assetCode: assetSelect.value?.code, 
        label: label,
        asset: assetSelect.value
    })
}

const selectedAsset = ref('')


</script>

<style lang="css">

</style>