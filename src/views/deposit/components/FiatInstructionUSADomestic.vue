<template>
  <div class="mt-2">
    <div class="flex justify-content-start align-items-center">
      <i class="pi pi-exclamation-triangle"></i>
      <p class="grayed-text-warning">{{ t('depositAccountUSD') }}</p>
    </div>

    <p class="font-medium text-sm mt-4">{{ t('depositBankName') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.bankName }}</p>
      <i v-if="bankNational?.bankName" @click="copyToClipboard(toast, bankNational?.bankName)" class="pi pi-clone"></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">ABA Fedwire</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.routingNumber }}</p>
      <i
        v-if="bankNational?.routingNumber"
        @click="copyToClipboard(toast, bankNational?.routingNumber)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('creditTo') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.creditTo }}</p>
      <i v-if="bankNational?.creditTo" @click="copyToClipboard(toast, bankNational?.creditTo)" class="pi pi-clone"></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('reference') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.reference }}</p>
      <i
        v-if="bankNational?.reference"
        @click="copyToClipboard(toast, bankNational?.reference)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('addressBeneficiary') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.address }}</p>
      <i v-if="bankNational?.address" @click="copyToClipboard(toast, bankNational?.address)" class="pi pi-clone"></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.accountNumber }}</p>
      <i
        v-if="bankNational?.accountNumber"
        @click="copyToClipboard(toast, bankNational?.accountNumber)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.bankAddress }}</p>
      <i
        v-if="bankNational?.bankAddress"
        @click="copyToClipboard(toast, bankNational?.bankAddress)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankPhone') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankNational?.bankPhone }}</p>
      <i
        v-if="bankNational?.bankPhone"
        @click="copyToClipboard(toast, bankNational?.bankPhone)"
        class="pi pi-clone"
      ></i>
    </div>

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <Button
          icon="pi pi-angle-right"
          iconPos="right"
          :loading="submitting"
          class="p-button download-btn"
          :label="t('downloadPdf')"
          @click="generatePdfNationalData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../../composables/useAuth'
import generatePdf from '../../../shared/generatePdf'
import logo from '../../../assets/img/logo.png'
import copyToClipboard from '../../../shared/copyToClipboard'

const toast = useToast()
const submitting = ref<boolean>(false)
const { t } = useI18n({ useScope: 'global' })
const { getUserName } = useAuth()
const username = getUserName()
const props = defineProps<{
  bankNational: any
}>()
const bankNationalPdf: any = {}

const title = t('titleDespositFiat')


bankNationalPdf[t('depositBankName') + ':'] = props.bankNational?.bankName
bankNationalPdf['ABA Fedwire:'] = props.bankNational?.routingNumber
bankNationalPdf[t('creditTo') + ':'] = props.bankNational?.creditTo
bankNationalPdf[t('reference') + ':'] = props.bankNational?.reference
bankNationalPdf[t('address') + ':'] = props.bankNational?.address
bankNationalPdf[t('accountNumber') + ':'] = props.bankNational?.accountNumber
bankNationalPdf[t('bankAddress') + ':'] = props.bankNational?.bankAddress
bankNationalPdf[t('bankPhone') + ':'] = props.bankNational?.bankPhone


const generatePdfNationalData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatDomestic')}`
  generatePdf(nameFile, logo, title, bankNationalPdf)
}
</script>
