<template>
<Dialog :visible="visible" @update:visible="emit('update:visible', $event)" :modal="true" closeIcon="pi pi-times-circle" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
    <template #header>
        <h3></h3>
    </template>
    <div class="grid">
        <div class="col-6">
            <img :src="asset?.icon" alt="">
            <p class="text-base">{{asset?.name}}</p>
            <p class="text-base font-bold">{{asset?.code}}</p>
        </div>
        <div class="col-6 justify-content-end flex">
            <img height="150" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="">
        </div>
        <div class="col-12">
            <Message severity="warn"  :closable="false">
                {{t('warningSendAsset', {asset: asset?.name})}}
            </Message>
        </div>
        <div class="col-12 ">
            <div class="p-inputgroup">
                <InputText :placeholder="t('walletAddress')" />
                <span class="p-inputgroup-addon">
                    <i class="pi pi-copy"></i>
                </span>
            </div>
        </div>

    </div>   

    <template #footer>
        <Button :label="t('done')" icon="pi pi-check" autofocus />
    </template>
</Dialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import { Asset } from '../types/asset.interface';

defineProps<{
    visible: boolean,
    walletAddress?: string,
    asset: Asset | null    
}>()
const emit = defineEmits(['update:visible']);
const { t } = useI18n({ useScope: 'global' })
const value = ref('');


</script>

<style lang="css" scoped>
.p-message.p-message-warn{
    background: #FFEE002B;
    border: solid #FFCD00;
    border-top-width: medium;
    border-right-width: medium;
    border-bottom-width: medium;
    border-left-width: medium;
    border-width: 1px 1px 1px 1px;
    color: #000000;
    border-radius: 13px;
}
    
</style>