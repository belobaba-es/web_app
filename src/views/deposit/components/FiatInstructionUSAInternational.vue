<template>
  <div class="mt-2">
    <div class="flex justify-content-start align-items-center">
      <i class="pi pi-exclamation-triangle"></i>
      <p class="grayed-text-warning">{{ t('depositAccountOther') }}</p>
    </div>

    <p class="font-medium text-sm mt-4">{{ t('depositBankName') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.bankName }}</p>
      <i
        v-if="bankInternational?.bankName"
        @click="copyToClipboard(toast, bankInternational?.bankName)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('swiftCode') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.swiftCode }}</p>
      <i
        v-if="bankInternational?.swiftCode"
        @click="copyToClipboard(toast, bankInternational?.swiftCode)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('creditTo') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.creditTo }}</p>
      <i
        v-if="bankInternational?.creditTo"
        @click="copyToClipboard(toast, bankInternational?.creditTo)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('reference') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.reference }}</p>
      <i
        v-if="bankInternational?.reference"
        @click="copyToClipboard(toast, bankInternational?.reference)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('address') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.address }}</p>
      <i
        v-if="bankInternational?.address"
        @click="copyToClipboard(toast, bankInternational?.address)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.accountNumber }}</p>
      <i
        v-if="bankInternational?.accountNumber"
        @click="copyToClipboard(toast, bankInternational?.accountNumber)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="">{{ bankInternational?.bankAddress }}</p>
      <i
        v-if="bankInternational?.bankAddress"
        @click="copyToClipboard(toast, bankInternational?.bankAddress)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <Button
          icon="pi pi-angle-right"
          iconPos="right"
          :loading="submitting"
          class="p-button download-btn"
          :label="t('downloadPdf')"
          @click="generatePdfInternationalData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import copyToClipboard from '../../../shared/copyToClipboard'
import { useToast } from 'primevue/usetoast'
import generatePdf from '../../../shared/generatePdf'
import logo from '../../../assets/img/logo.png'
import { ref } from 'vue'
import { useAuth } from '../../../composables/useAuth'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const submitting = ref<boolean>(false)
const { t } = useI18n({ useScope: 'global' })
const { getUserName } = useAuth()
const username = getUserName()
const props = defineProps<{
  bankInternational: any
}>()
const bankInternationalPdf: any = {}

const title = t('titleDespositFiat')
const footerPdf = t('footerPdfNobaData')

bankInternationalPdf[t('depositBankName') + ':'] = props.bankInternational.bankName
bankInternationalPdf[t('swiftCode') + ':'] = props.bankInternational.swiftCode
bankInternationalPdf[t('creditTo') + ':'] = props.bankInternational.creditTo
bankInternationalPdf[t('reference') + ':'] = props.bankInternational.reference
bankInternationalPdf[t('address') + ':'] = props.bankInternational.address
bankInternationalPdf[t('accountNumber') + ':'] = props.bankInternational.accountNumber
bankInternationalPdf[t('bankAddress') + ':'] = props.bankInternational.bankAddress
const generatePdfInternationalData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatInternational')}`
  generatePdf(nameFile, logo, title, bankInternationalPdf, footerPdf)
}
</script>
