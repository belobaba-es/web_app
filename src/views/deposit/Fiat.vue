<template>
  <section class="section-main max-width">
    <p class="text-3xl font-medium mb-4">
      {{ t('deposit') }} / <span class="text-primary">{{ t('fiat') }} </span>
    </p>
    <TabMenu :model="menuItems" v-model:activeIndex="active" />

    <div v-if="active == 0" class="mt-2">
      <div class="flex justify-content-start align-items-center">
        <i class="pi pi-exclamation-triangle"></i>
        <p class="grayed-text-warning">{{ t('depositAccountUSD') }}</p>
      </div>

      <p class="font-medium text-sm mt-4">{{ t('depositBankName') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.bankName }}</p>
        <i v-if="bankNational?.bankName" @click="copyToClipboard(bankNational?.bankName)" class="pi pi-clone"></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('routingNumber') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.routingNumber }}</p>
        <i
          v-if="bankNational?.routingNumber"
          @click="copyToClipboard(bankNational?.routingNumber)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('creditTo') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.creditTo }}</p>
        <i v-if="bankNational?.creditTo" @click="copyToClipboard(bankNational?.creditTo)" class="pi pi-clone"></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('reference') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.reference }}</p>
        <i v-if="bankNational?.reference" @click="copyToClipboard(bankNational?.reference)" class="pi pi-clone"></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('address') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.address }}</p>
        <i v-if="bankNational?.address" @click="copyToClipboard(bankNational?.address)" class="pi pi-clone"></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.accountNumber }}</p>
        <i
          v-if="bankNational?.accountNumber"
          @click="copyToClipboard(bankNational?.accountNumber)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.bankAddress }}</p>
        <i v-if="bankNational?.bankAddress" @click="copyToClipboard(bankNational?.bankAddress)" class="pi pi-clone"></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('bankPhone') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="mb-0">{{ bankNational?.bankPhone }}</p>
        <i v-if="bankNational?.bankPhone" @click="copyToClipboard(bankNational?.bankPhone)" class="pi pi-clone"></i>
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

    <div v-if="active == 1" class="mt-2">
      <div class="flex justify-content-start align-items-center">
        <i class="pi pi-exclamation-triangle"></i>
        <p class="grayed-text-warning">{{ t('depositAccountOther') }}</p>
      </div>

      <p class="font-medium text-sm mt-4">{{ t('depositBankName') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.bankName }}</p>
        <i
          v-if="bankInternational?.bankName"
          @click="copyToClipboard(bankInternational?.bankName)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('routingNumber') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.routingNumber }}</p>
        <i
          v-if="bankInternational?.routingNumber"
          @click="copyToClipboard(bankInternational?.routingNumber)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('swiftCode') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.swiftCode }}</p>
        <i
          v-if="bankInternational?.swiftCode"
          @click="copyToClipboard(bankInternational?.swiftCode)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('creditTo') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.creditTo }}</p>
        <i
          v-if="bankInternational?.creditTo"
          @click="copyToClipboard(bankInternational?.creditTo)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('reference') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.reference }}</p>
        <i
          v-if="bankInternational?.reference"
          @click="copyToClipboard(bankInternational?.reference)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('address') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.address }}</p>
        <i
          v-if="bankInternational?.address"
          @click="copyToClipboard(bankInternational?.address)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.accountNumber }}</p>
        <i
          v-if="bankInternational?.accountNumber"
          @click="copyToClipboard(bankInternational?.accountNumber)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.bankAddress }}</p>
        <i
          v-if="bankInternational?.bankAddress"
          @click="copyToClipboard(bankInternational?.bankAddress)"
          class="pi pi-clone"
        ></i>
      </div>
      <Divider type="solid" />

      <p class="font-medium text-sm">{{ t('bankPhone') }}</p>
      <div class="flex justify-content-between align-items-center">
        <p class="">{{ bankInternational?.bankPhone }}</p>
        <i
          v-if="bankInternational?.bankPhone"
          @click="copyToClipboard(bankInternational?.bankPhone)"
          class="pi pi-clone"
        ></i>
      </div>

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
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Divider from 'primevue/divider'
import TabMenu from 'primevue/tabmenu'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { FiatService } from './services/fiat'
import { BankData } from './types/fiat.interface'
import { useUserStore } from '../../stores/user'

import logo from '../../assets/img/logo.png'

import generatePdf from '../../shared/generatePdf'
import { useToast } from 'primevue/usetoast'

interface tabItem {
  label: string
  icon?: string
  to?: string
}
const toast = useToast()

const submitting = ref(false)

const { t } = useI18n({ useScope: 'global' })
const fiatService = FiatService.instance()
const userStore = useUserStore()

const username = userStore.getUser.firstName
  ? userStore.getUser.firstName + ' ' + userStore.getUser.lastName
  : userStore.getUser.name

const dataBank = ref<BankData[]>([])
const bankNational = ref()
const bankInternational = ref()

const bankNationalPdf: any = {}
const bankInternationalPdf: any = {}
const title = t('titleDespositFiat')
const footerPdf = t('footerPdfNobaData')

onMounted(async () => {
  submitting.value = true
  fiatService
    .bankData(userStore.getUser.accountId)
    .then(data => {
      submitting.value = false
      dataBank.value = data
      bankNational.value = dataBank.value.find(bank => bank.typeBankingData == 'DOMESTIC')
      if (!bankNational.value) {
        bankNational.value = dataBank.value.find(bank => bank.typeBankingData == 'NATIONAL')
      }

      bankNationalPdf[t('depositBankName') + ':'] = bankNational.value.bankName
      bankNationalPdf[t('routingNumber') + ':'] = bankNational.value.routingNumber
      bankNationalPdf[t('creditTo') + ':'] = bankNational.value.creditTo
      bankNationalPdf[t('reference') + ':'] = bankNational.value.reference
      bankNationalPdf[t('address') + ':'] = bankNational.value.address
      bankNationalPdf[t('accountNumber') + ':'] = bankNational.value.accountNumber
      bankNationalPdf[t('bankAddress') + ':'] = bankNational.value.bankAddress
      bankNationalPdf[t('bankPhone') + ':'] = bankNational.value.bankPhone

      bankInternational.value = dataBank.value.find(bank => bank.typeBankingData == 'INTERNATIONAL')

      bankInternationalPdf[t('depositBankName') + ':'] = bankInternational.value.bankName
      bankInternationalPdf[t('swiftCode') + ':'] = bankInternational.value.swiftCode
      bankInternationalPdf[t('creditTo') + ':'] = bankInternational.value.creditTo
      bankInternationalPdf[t('reference') + ':'] = bankInternational.value.reference
      bankInternationalPdf[t('address') + ':'] = bankInternational.value.address
      bankInternationalPdf[t('accountNumber') + ':'] = bankInternational.value.accountNumber
      bankInternationalPdf[t('bankAddress') + ':'] = bankInternational.value.bankAddress
      bankInternationalPdf[t('bankPhone') + ':'] = bankInternational.value.bankPhone
    })
    .catch(() => (submitting.value = false))
})
const active = ref<number>(0)

const menuItems = ref<tabItem[]>([
  {
    label: 'Local',
  },
  {
    label: 'Internacional',
  },
])

const generatePdfNationalData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatDomestic')}`
  generatePdf(nameFile, logo, title, bankNationalPdf, footerPdf)
}

const generatePdfInternationalData = () => {
  const nameFile = `${username} ${t('namePdfDepositFiatInternational')}`
  generatePdf(nameFile, logo, title, bankInternationalPdf, footerPdf)
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      severity: 'info',
      detail: t('textCopySuccessful'),
      life: 4000,
    })
  })
}
</script>

<style lang="css">
.p-tabmenu .p-tabmenu-nav {
  background: transparent !important;
  border: 1px solid #dee2e6;
  border-width: 0 0 2px 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: transparent !important;
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border: solid #dee2e6;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #dee2e6 transparent;
  background: transparent !important;
  color: #6c757d;
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}
p {
  margin: 0 0 6px 0;
}

.download-btn {
  width: 100% !important;
}
.grayed-text-warning {
  color: #6c757d !important;
  margin: 0 0 0 4px;
}

@media only screen and (min-width: 1000px) {
  .max-width {
    max-width: 500px;
  }
}
</style>
