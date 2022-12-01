<template>
  <div class="col-8">
    <p class="text-3xl font-medium mb-4">{{t('withdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
    <div class="flex align-items-center">
      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack"/>
      <span class="text-xl"> Domestic Wire</span>
    </div>
    <Steps :model="items" :readonly="false" />
    <!-- <div class="mt-4 mb-4">
        <Button class="p-button search-btn" :label="t('newBeneficiary')" @click="newBeneficiary"/>
    </div> -->
    <router-view v-slot="{Component}"
                 :list="listBeneficiary"
                 toNew="/withdraw/fiat/domestic/new"
                 :formData="formObject"
                 @prevPage="prevStepPage($event)"
                 @nextPage="nextStepPage($event)"
                 @complete="stepComplete"
    >

      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>


  </div>
</template>

<script setup lang="ts">

import {useI18n} from 'vue-i18n'
import {onMounted, ref} from 'vue';
import Button from 'primevue/button';


import Steps from 'primevue/steps';
import {useRouter} from "vue-router";
import {BeneficiaryAssets} from '../types/beneficiary.interface';
import {AccountService} from '../services/account';
import {useToast} from 'primevue/usetoast';

import {useWithdraw} from '../composables/useWithdraw';

const router = useRouter();
const toast = useToast();
const { t } = useI18n({ useScope: 'global' })

const search = ref('')

const accountService = AccountService.instance()


const newBeneficiary = ()=> {
  router.push('/withdraw/fiat/domestic/new')
}
const beneficiaryAssets = ref<BeneficiaryAssets[]>([])

onMounted(async () => {
  await fetchBeneficiariesDomestic()
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
const {
  formObject,
  fetchBeneficiariesDomestic,
  listBeneficiary,
  nextStepPage,
  prevStepPage,
  stepComplete,
  toBack,
} = useWithdraw(items)



</script>

<style scoped>
.search-btn{
  width: 30% !important;
}
</style>