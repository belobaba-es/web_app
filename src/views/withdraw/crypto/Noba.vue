<template>
    <div>
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
        <Steps :model="items" :readonly="false" />
        <router-view />
        <div class="col-10 ">
                
            <span class="p-input-icon-left flex p-fluid">
                <i class="pi pi-search" />
                <InputText type="text" class="b-gray"  :placeholder="t('nobaBeneficiaryEmail')" />
                <Button class="p-button search-btn" :label="t('search')"/>
            </span>
        </div>
        <div class="grid">
            <span class="mt-4">{{t('youBeneficiaries')}}</span>
            <Divider></Divider>
            <div class="col-10">
                <ListBeneficiary :list="list" @select="toRoute($event)"></ListBeneficiary>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ListBeneficiary from '../components/ListBeneficiary.vue';
import InputText from 'primevue/inputtext';
import Steps from 'primevue/steps';
import { useRouter } from "vue-router";
import { Beneficiary } from '../types/beneficiaries.interface';

const router = useRouter();

const toRoute = (item: Beneficiary) => {
    const data = {
        data:1,example:''
    }
    router.push({name: "withdraw-noba-amount", state: data})
    
} 

const { t } = useI18n({ useScope: 'global' })

const list = [
    {name: 'example', email: 'example@email'},
    {name: 'example2', email: 'example@email'},
    {name: 'example3', email: 'example@email'},
    {name: 'example4', email: 'example@email'},
    {name: 'example5', email: 'example@email'}
]

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