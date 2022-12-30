<template>
  <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">

    <p class="text-3xl font-medium mb-4">
      {{ t('withdraw') }} / <span class="text-primary"> {{ t('crypto') }} </span>
    </p>

    <div class="flex align-items-center">
      <router-link to="/withdraw">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
      </router-link>
      <span class="text-xl">{{ t('otherPlatformCrypto') }}</span>
    </div>

    
    <Steps class="mt-2" :model="items" :readonly="false" />
    <router-view
      v-slot="{ Component }"
      :list="listBeneficiary"
      :toNew="newBeneficiary"
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
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'

import Steps from 'primevue/steps'
import { useRoute, useRouter } from 'vue-router'
import { BeneficiaryAssets } from '../types/beneficiary.interface'
import { AccountService } from '../services/account'
import { useToast } from 'primevue/usetoast'

import { useWithdraw } from '../composables/useWithdraw'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const search = ref('')

const accountService = AccountService.instance()

const items = ref([
  {
    label: t('wallets'),
    to: '/withdraw/crypto/other',
  },
  {
    label: t('amount'),
    to: '/withdraw/crypto/other/amount',
  },
  {
    label: ref('confirmation'),
    to: '/withdraw/crypto/other/confirmation',
  },
])

const { formObject, listBeneficiary, nextStepPage, prevStepPage, stepComplete, toBack, fetchBeneficiariesAssets } =
  useWithdraw(items)

const newBeneficiary = () => {
  return router.push(`/`)
}
const beneficiaryAssets = ref<BeneficiaryAssets[]>([])

onMounted(async () => {
  await fetchBeneficiariesAssets()
})

const onSearch = () => {
  console.log(search.value)
  accountService
    .getAccountByEmail(search.value)
    .then(resp => {
      console.log(resp)
      beneficiaryAssets.value = [
        {
          label: resp.name,
          accountId: resp.email,
          assetId: resp.email,
          id: '',
          walletAddress: '',
          assetTransferMethod: '',
        },
      ]
    })
    .catch(error => {
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
.search-btn {
  width: 30% !important;
}
</style>
