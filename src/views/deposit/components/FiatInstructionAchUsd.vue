<template>
  <div class="mt-2">
    <div class="flex justify-content-start align-items-center">
      <i class="pi pi-exclamation-triangle"></i>
      <p class="grayed-text-warning">{{ t('depositAccountUSD') }}</p>
    </div>

    <p class="mt-4 font-medium text-sm">{{ t('fullName') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankAchUsd?.holderName }}</p>
      <i
        v-if="bankAchUsd?.holderName"
        class="pi pi-clone cursor-pointer"
        @click="copyToClipboard(toast, bankAchUsd?.holderName)"
      ></i>
    </div>

    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankAchUsd?.accountNumber }}</p>
      <i
        v-if="bankAchUsd?.accountNumber"
        class="pi pi-clone cursor-pointer"
        @click="copyToClipboard(toast, bankAchUsd?.accountNumber)"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('routingNumber') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankAchUsd?.accountRoutingNumber }}</p>
      <i
        v-if="bankAchUsd?.accountRoutingNumber"
        class="pi pi-clone cursor-pointer"
        @click="copyToClipboard(toast, bankAchUsd?.accountRoutingNumber)"
      ></i>
    </div>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('reference') }}</p>
    <div class="flex justify-content-between align-items-center">
      <p class="mb-0">{{ bankAchUsd?.memo }}</p>
      <i
        v-if="bankAchUsd?.memo"
        class="pi pi-clone cursor-pointer"
        @click="copyToClipboard(toast, bankAchUsd?.memo)"
      ></i>
    </div>
    <Divider type="solid" />

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <Button
          :label="t('downloadPdf')"
          :loading="submitting"
          class="p-button download-btn"
          icon="pi pi-angle-right"
          iconPos="right"
          @click="generatePdfACHlData"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import generatePdf from '../../../shared/generatePdf'
import logo from '../../../assets/img/logo.png'
import { useAuth } from '../../../composables/useAuth'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import copyToClipboard from '../../../shared/copyToClipboard'
import { useToast } from 'primevue/usetoast'
import { AchUsdBankInstructionDetail } from '../types/fiat.interface'

const toast = useToast()
const { getUserName } = useAuth()
const submitting = ref<boolean>(false)
const username = getUserName()
const { t } = useI18n({ useScope: 'global' })
const title = t('titleDespositFiat')
const footerPdf = t('footerPdfNobaData')

const props = defineProps<{
  bankAchUsd: AchUsdBankInstructionDetail
}>()

const bankAchUsdPdf: any = {}
bankAchUsdPdf[t('fullName') + ':'] = props.bankAchUsd?.holderName
bankAchUsdPdf[t('accountNumber') + ':'] = props.bankAchUsd?.accountNumber
bankAchUsdPdf[t('routingNumber') + ':'] = props.bankAchUsd?.accountRoutingNumber
bankAchUsdPdf[t('reference') + ':'] = props.bankAchUsd?.memo

onMounted(() => {
  console.log('-- mounted', { ...props.bankAchUsd })
})

const generatePdfACHlData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatAchUsd')}`
  generatePdf(nameFile, logo, title, bankAchUsdPdf)
}
</script>
<style lang="css">
.cursor-pointer {
  cursor: pointer;
}
</style>
