<template>
  <div class="mt-2">
    <div class="flex justify-content-start align-items-center">
      <i class="pi pi-exclamation-triangle"></i>
      <p class="grayed-text-warning">{{ t('depositAccountPanama') }}</p>
    </div>

    <p class="mt-4 font-medium text-sm">{{ t('fullName') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankPanama?.holderName }}</p>
      <i v-if="bankPanama?.holderName" @click="copyToClipboard(toast, bankPanama?.holderName)" class="pi pi-clone"></i>
    </div>

    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankNameLabel') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankPanama?.bankName }}</p>
      <i v-if="bankPanama?.bankName" @click="copyToClipboard(toast, bankPanama?.bankName)" class="pi pi-clone"></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankPanama?.accountDestinationNumber }}</p>
      <i
        v-if="bankPanama?.accountDestinationNumber"
        @click="copyToClipboard(toast, bankPanama?.accountDestinationNumber)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('typeProduct') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankPanama?.productType }}</p>
      <i
        v-if="bankPanama?.productType"
        @click="copyToClipboard(toast, bankPanama?.productType)"
        class="pi pi-clone"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('conceptLabel') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankPanama?.concept }}</p>
      <i v-if="bankPanama?.concept" @click="copyToClipboard(toast, bankPanama?.concept)" class="pi pi-clone"></i>
    </div>
    <Divider type="solid" />

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <Button
          icon="pi pi-angle-right"
          iconPos="right"
          :loading="submitting"
          class="p-button download-btn"
          :label="t('downloadPdf')"
          @click="generatePdfACHlData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import generatePdf from '../../../shared/generatePdf'
import logo from '../../../assets/img/logo.png'
import { useAuth } from '../../../composables/useAuth'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import copyToClipboard from '../../../shared/copyToClipboard'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const { getUserName } = useAuth()
const submitting = ref<boolean>(false)
const username = getUserName()
const { t } = useI18n({ useScope: 'global' })
const title = t('titleDespositFiat')

const props = defineProps<{
  bankPanama: any
}>()

const bankACHPdf: any = {}
if (props.bankPanama) {
  bankACHPdf[t('fullName') + ':'] = props.bankPanama.holderName
  bankACHPdf[t('bankNameLabel') + ':'] = props.bankPanama.bankName
  bankACHPdf[t('accountNumber') + ':'] = props.bankPanama.accountDestinationNumber
  bankACHPdf[t('typeProduct') + ':'] = props.bankPanama.productType
  bankACHPdf[t('conceptLabel') + ':'] = props.bankPanama.concept
}

const generatePdfACHlData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatPanamaACH')}`
  generatePdf(nameFile, logo, title, bankACHPdf)
}
</script>
