<template>
    <div>
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('crypto')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
        <Steps :model="items" :readonly="false" />
        <router-view />
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
    </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ListBeneficiary from '../components/ListBeneficiary.vue';
import InputText from 'primevue/inputtext';
import Steps from 'primevue/steps';
import { useRouter } from "vue-router";
import { Beneficiary } from '../types/beneficiary.interface';
import { BeneficiaryService } from '../services/beneficiary';
import { AccountService } from '../services/account';

const router = useRouter();
const { t } = useI18n({ useScope: 'global' })

const search = ref('')
const beneficiaryService = BeneficiaryService.instance();
const accountService = AccountService.instance()

const toRoute = (item: Beneficiary) => {
    const data = {
        data:1,example:''
    }
    router.push({name: "withdraw-noba-amount", state: data})
    
} 
const beneficiaryAssets = ref<Beneficiary[]>([])

onMounted(async () => {
   beneficiaryService.listBeneficiaryAssets().then(data=>{
        beneficiaryAssets.value = data.results
    })
});

const onSearch = () => {
    console.log(search.value)
    // accountService.getAccountByEmail(search.value)
}


const items = [
    {
        label: 'Accounts',
        to: '/steps'
    },
    {
        label: 'Amount',
        to: '/steps/seat'
    },
    {
        label: 'Confirmation',
        to: '/steps/confirmation'
    }
]

</script>

<style scoped>
.search-btn{
    width: 30% !important;
}
</style>