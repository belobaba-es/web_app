<template>
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
            <ListBeneficiary :list="beneficiaryAssets" @select="toRoute($event)"></ListBeneficiary>
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
import { BeneficiaryService } from '../services/beneficiary';
import { AccountService } from '../services/account';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['nextPage']);
const search = ref('')

const beneficiaryService = BeneficiaryService.instance();
const accountService = AccountService.instance()
const toRoute = (item: Beneficiary) => {
    const data = {
        data:1,example:''
    }
    router.push({name: "withdraw-crypto-noba-amount"})
    
} 
const beneficiaryAssets = ref<Beneficiary[]>([])

onMounted(async () => {
   beneficiaryService.listBeneficiaryAssets().then(data=>{
        beneficiaryAssets.value = data.results
    })
    beneficiaryService.listBeneficiaryDomestic().then(resp=>{
        beneficiaryAssets.value = resp.results
    })
});

const onSearch = () => {
    console.log(search.value)
    accountService.getAccountByEmail(search.value).then(resp=>{
        console.log(resp)
        beneficiaryAssets.value = [{label: resp.name, accountId: resp.email, assetId: resp.email,  id:'', walletAddress: '', assetTransferMethod:''}]
    }).catch(error=>{
        console.log(error.response)
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: error.response.data.message,
          life: 4000,
        })
    })
}



</script>

<style scoped>
</style>