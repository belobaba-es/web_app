<template>
  <p class="text-3xl font-medium mb-4">
    {{ t('deposit') }} / <span class="text-primary">{{ t('fiat') }} </span>
  </p>
  <TabMenu :model="menuItems" v-model:activeIndex="active" />

  <div v-if="active == 0" class="mt-2">
    <p class="">{{ t('depositAccountUSD') }}</p>

    <p class="font-medium text-sm">{{ t('depositBankName') }}</p>
    <p class="">{{ bankNational?.bankName }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('routingNumber') }}</p>
    <p class="">{{ bankNational?.routingNumber }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('creditTo') }}</p>
    <p class="">{{ bankNational?.creditTo }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('reference') }}</p>
    <p class="">{{ bankNational?.reference }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('address') }}</p>
    <p class="">{{ bankNational?.address }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <p class="">{{ bankNational?.accountNumber }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
    <p class="">{{ bankNational?.bankAddress }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankPhone') }}</p>
    <p class="">{{ bankNational?.bankPhone }}</p>

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <Button class="p-button download-btn" :label="t('downloadPdf')" @click="generatePdfNationalData" />
      </div>
    </div>
    <Divider type="solid" />
  </div>

  <div v-if="active == 1" class="mt-2">
    <p>{{ t('depositAccountOther') }}</p>

    <p class="font-medium text-sm">{{ t('depositBankName') }}</p>
    <p class="">{{ bankInternational?.bankName }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('routingNumber') }}</p>
    <p class="">{{ bankInternational?.routingNumber }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('swiftCode') }}</p>
    <p class="">{{ bankInternational?.swiftCode }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('creditTo') }}</p>
    <p class="">{{ bankInternational?.creditTo }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('reference') }}</p>
    <p class="">{{ bankInternational?.reference }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('address') }}</p>
    <p class="">{{ bankInternational?.address }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
    <p class="">{{ bankInternational?.accountNumber }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankAddress') }}</p>
    <p class="">{{ bankInternational?.bankAddress }}</p>
    <Divider type="solid" />

    <p class="font-medium text-sm">{{ t('bankPhone') }}</p>
    <p class="">{{ bankInternational?.bankPhone }}</p>

    <div class="grid mt-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <Button class="p-button download-btn" :label="t('downloadPdf')" @click="generatePdfInternationalData" />
      </div>
    </div>
    <Divider type="solid" />
  </div>
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

interface tabItem {
  label: string
  icon?: string
  to?: string
}

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
const footerPdf = t('footerPdfFiatData')


onMounted(async () => {
  fiatService.bankData(userStore.getUser.accountId).then(data => {
    dataBank.value = data
    bankNational.value = dataBank.value.find(bank => bank.typeBankingData == 'DOMESTIC')
    if (!bankNational.value) {
      bankNational.value = dataBank.value.find(bank => bank.typeBankingData == 'NATIONAL')

      bankNationalPdf[t('depositBankName') + ':'] = bankNational.value.bankName
      bankNationalPdf[t('routingNumber') + ':'] = bankNational.value.routingNumber
      bankNationalPdf[t('creditTo') + ':'] = bankNational.value.creditTo
      bankNationalPdf[t('reference') + ':'] = bankNational.value.reference
      bankNationalPdf[t('address') + ':'] = bankNational.value.address
      bankNationalPdf[t('accountNumber') + ':'] = bankNational.value.accountNumber
      bankNationalPdf[t('bankAddress') + ':'] = bankNational.value.bankAddress
      bankNationalPdf[t('bankPhone') + ':'] = bankNational.value.bankPhone
    }
    bankInternational.value = dataBank.value.find(bank => bank.typeBankingData == 'INTERNATIONAL')

    bankInternationalPdf[t('depositBankName') + ':'] = bankInternational.value.bankName
    bankInternationalPdf[t('routingNumber') + ':'] = bankInternational.value.routingNumber
    bankInternationalPdf[t('swiftCode') + ':'] = bankInternational.value.swiftCode
    bankInternationalPdf[t('creditTo') + ':'] = bankInternational.value.creditTo
    bankInternationalPdf[t('reference') + ':'] = bankInternational.value.reference
    bankInternationalPdf[t('address') + ':'] = bankInternational.value.address
    bankInternationalPdf[t('accountNumber') + ':'] = bankInternational.value.accountNumber
    bankInternationalPdf[t('bankAddress') + ':'] = bankInternational.value.bankAddress
    bankInternationalPdf[t('bankPhone') + ':'] = bankInternational.value.bankPhone
  })
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

</style>
