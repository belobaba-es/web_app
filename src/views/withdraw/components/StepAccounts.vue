<template>
     <div class="col-4 mt-4 mb-4" v-if="toNew != ''">
        <Button class="p-button w-full" :label="t('newBeneficiary')" @click="toNewBeneficiary"/>
    </div>
    <div class="col-10 ">
                
        <span class="p-input-icon-left flex p-fluid">
            <i class="pi pi-search" />
            <InputText type="text" class="b-gray" v-model="search" :placeholder="t('nobaBeneficiaryEmail')" />
            <Button class="p-button search-btn" :label="t('search')" @click="onSearch"/>
        </span>
    </div>
    <div class="grid">
        <span class="mt-4">{{t('youBeneficiaries')}}</span>
        <Divider></Divider>
        <div class="col-10">
            <ListBeneficiary :list="list" @select="onSelect($event)"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ListBeneficiary from './ListBeneficiary.vue';
import InputText from 'primevue/inputtext';
import Steps from 'primevue/steps';
import { useRouter } from "vue-router";
import { Beneficiary } from '../types/beneficiary.interface';

import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();
const { t } = useI18n({ useScope: 'global' })
const props = defineProps<{
	list: Array<any>,
    formData:  any,
    toNew: string
}>()
const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary']);
const search = ref('')




const onSelect = (item: Beneficiary) => {
    const page = 0
    const formData = {
        beneficiary: item
    }
    emit('update:beneficiary', item)
    emit('nextPage', {
        pageIndex: page, 
        formData: formData
    })
} 
// const beneficiaryAssets = ref<BeneficiaryFiat[]>([])

onMounted(async () => {

});

const onSearch = () => {
    console.log(search.value)
    // accountService.getAccountByEmail(search.value).then(resp=>{
    //     console.log(resp)
    //     beneficiaryAssets.value = [{label: resp.name, accountId: resp.email, assetId: resp.email,  id:'', walletAddress: '', assetTransferMethod:''}]
    // }).catch(error=>{
    //     console.log(error.response)
    //     toast.add({
    //       severity: 'error',
    //       summary: t('somethingWentWrong'),
    //       detail: error.response.data.message,
    //       life: 4000,
    //     })
    // })
}

const toNewBeneficiary = ()=> {
    router.push(props.toNew)
}

</script>

<style scoped>
</style>