<template>
    <div>
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
    <div class="flex align-items-center">

        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
        <span class="text-xl"> Domestic Wire</span> 
    </div>
    <Steps :model="items" :readonly="false" />
    <div class="mt-4 mb-4">
        <Button class="p-button search-btn" :label="t('newBeneficiary')" @click="newBeneficiary"/>
    </div>
    <router-view v-slot="{Component}"   
        :list="list"
        :formData="formObject" 
        @prevPage="prevPage($event)" 
        @nextPage="nextPage($event)" 
        @complete="complete"
        @selectBeneficiary="onSelectBeneficiary"
        >

        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>

    <!-- <div class="col-10 ">
            
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
    </div> -->
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
import { useToast } from 'primevue/usetoast';
import { WithdrawForm } from '../types/withdraw';

const router = useRouter();
const toast = useToast();
const { t } = useI18n({ useScope: 'global' })

const search = ref('')
const beneficiarySelect = ref({})
const beneficiaryService = BeneficiaryService.instance();
const accountService = AccountService.instance()
const toRoute = (item: Beneficiary) => {
   
    router.push({name: "withdraw-crypto-noba-amount"})
    
} 


const onSelectBeneficiary = (item: any) => {
    console.log(beneficiarySelect, 'select')
    console.log(item)
    router.push('/withdraw/fiat/domestic/new')
}
const newBeneficiary = ()=> {
    router.push('/withdraw/fiat/domestic/new')
}
const beneficiaryAssets = ref<Beneficiary[]>([])
const list = ref<any[]>([])
onMounted(async () => {
   beneficiaryService.listBeneficiaryAssets().then(data=>{
        beneficiaryAssets.value = data.results
    })
    beneficiaryService.listBeneficiaryDomestic().then(resp=>{
        list.value = resp.results
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


const items = ref([
    {
        label: 'Accounts',
        to: '/withdraw/fiat/domestic'
    },
    {
        label: 'Amount',
        to: '/withdraw/fiat/domestic/amount'
    },
    {
        label: 'Confirmation',
        to: '/withdraw/fiat/domestic/confirmation'
    }
])


const formObject = ref<WithdrawForm | any>({});

const nextPage = (event: any)  => {
    for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
    }
    console.log(formObject, 'nextpage')
    router.push(items.value[event.pageIndex + 1].to);
};
const prevPage = (event:any) => {
    router.push(items.value[event.pageIndex - 1].to);
};

const complete = () => {
    toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + formObject.value.firstname + ' ' + formObject.value.lastname + ' your order completed.'});
};

</script>

<style scoped>
.search-btn{
    width: 30% !important;
}
</style>