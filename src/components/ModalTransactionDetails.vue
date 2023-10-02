<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
    header=" "
  >
    <template #header>
      <div class="white-div"></div>
    </template>

    <div class="col-12 content">
      <div class="inner-row-flex mt-20">
        <div v-if="ownerName.length > 0" class="col-6">
          <!--          <p-->
          <!--            v-if="-->
          <!--              props.transaction.assetId === 'USD' && props.transaction.counterparty?.informationOwner?.name.length > 0-->
          <!--            "-->
          <!--            class="font-medium text-sm"-->
          <!--          >-->
          <!--            {{ t('bankAccountHolder') }}-->
          <!--          </p>-->
          <p v-if="isUsdAndOwnerNameExists" class="font-medium text-sm">
            {{ t('bankAccountHolder') }}
          </p>
          <p v-else class="font-medium text-sm">
            {{ t('beneficiaryName') }}
          </p>

          <!--          <p-->
          <!--            v-if="-->
          <!--              props.transaction.assetCode !== 'USD' ||-->
          <!--              props.transaction.counterparty?.informationOwner?.name?.length > 0-->
          <!--            "-->
          <!--            class="font-medium text-sm"-->
          <!--          >-->
          <!--            {{ t('beneficiaryName') }}-->
          <!--          </p>-->
          <p>{{ ownerName }}</p>
        </div>

        <div class="col-6 pt-1">
          <p>{{ props.transaction.counterparty?.informationOwner?.name }}</p>
          <p v-if="props.transaction.assetCode === 'USD' || props.transaction.assetId === 'USD'"></p>
        </div>
      </div>

      <Divider type="dashed"></Divider>

      <div class="inner-row-flex">
        <div class="col-6">
          <p class="font-medium text-sm">{{ t('amount') }}</p>
          <p v-if="!props.transaction.isInternal" class="font-medium text-sm">{{ t('ourFee') }}</p>
          <p class="font-medium text-sm"></p>
        </div>

        <div class="col-6 pt-1">
          <p>
            {{ props.transaction.amount }} {{ props.transaction.assetCode ?? props.transaction.assetId?.slice(-3) }}
          </p>
          <!--          todo-->
          <!--          <p v-if="!props.transaction.isInternal">{{ props.transaction.feeWire }}</p>-->
          <p v-if="!props.transaction.isInternal && props.transaction.feeWire">{{ props.transaction.feeWire }}</p>
          <p></p>
        </div>
      </div>

      <Divider type="dashed"></Divider>

      <div class="inner-row-flex">
        <div class="col-6">
          <p class="font-medium text-sm">{{ t('transactionNumber') }}</p>
          <p class="font-medium text-sm">{{ t('datePicker') }}</p>
        </div>

        <div class="col-6 pt-1">
          <p>{{ transaction.transactionId }}</p>
          <p>{{ transaction.formatedDate }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="col-12 btn-container">
        <Button
          class="w-50 p-button mt-5"
          :label="'PDF'"
          @click="generatePDFTransactionReceipt()"
          :loading="isGeneratingTransactionPDF"
          icon="pi pi-file-pdf"
          iconPos="right"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import transformCharactersIntoAsterics from '../shared/transformCharactersIntoAsterics'
import { generateTransactionReceipt } from '../shared/generatePdf'
import logo from '../assets/img/logo.png'
import { useUserStore } from '../stores/user'
import { TransactionHistory } from '../views/transaction-history/types/transaction-history-response.interface'

export interface TransactionModalPayload {
  id?: any
  formatedDate?: any
  feeWire?: any
  isInternal?: boolean
  amount?: any
  assetCode?: string
  nameTo?: any
  assetId?: string
  counterparty?: CounterpartyInfo
  reference?: any
  beneficiary?: any
}
export interface CounterpartyInfo {
  informationOwner: {
    name: string
    country: string
  }
}
const userStore = useUserStore()
// todo set company name when ready
const username =
  userStore.getUser.client.type === 'NATURAL_PERSON' ? userStore.getUser.client.name : userStore.getUser.client.name

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
const props = defineProps<{
  display: boolean
  transaction: TransactionHistory
}>()
const isGeneratingTransactionPDF = ref(false)
const ownerName = props.transaction.counterparty?.informationOwner?.name ?? ''
const isUsdAndOwnerNameExists = props.transaction.assetId === 'USD' && ownerName && ownerName.length > 0
const isUsdOrAssetIdIsUsd = props.transaction.assetCode === 'USD' || props.transaction.assetId === 'USD'
const generatePDFTransactionReceipt = () => {
  const transaction: any = props.transaction

  isGeneratingTransactionPDF.value = true
  const user = userStore.getUser
  const userAccountNumber = transformCharactersIntoAsterics(user.clientId)

  const transactionPDF: any = {}
  const title = t('transactionReceipt')
  const footerPdf = t('footerPdfFiatData')
  const fileName = `${t('transactionReceipt')}-${transaction.id}`

  const beneficiaryName = `${
    transaction.beneficiary?.name ?? transaction.counterparty.informationOwner.name ?? transaction.to.label
  }`

  transactionPDF[t('userName')] = `${username}`
  transactionPDF[t('senderAccountId')] = `${userAccountNumber}`
  transactionPDF[t('beneficiaryName')] = beneficiaryName
  transactionPDF[t('assetType')] = transaction.assetCode === 'USD' || transaction.assetId ? 'FIAT' : 'CRYPTO'
  transactionPDF[t('amount')] = `${transaction.amount}`
  transactionPDF[t('transactionNumber')] = transaction.transactionId
  transactionPDF[t('reference')] = `${transaction.reference}`
  transactionPDF[t('datePicker')] = `${transaction.formatedDate}`

  generateTransactionReceipt(fileName, logo, title, transactionPDF, footerPdf)
  isGeneratingTransactionPDF.value = false
}
</script>

<style lang="css" scoped>
.content {
  display: contents;
}
.inner-row-flex {
  display: flex;
  padding: 0;
}
.green-color {
  color: var(--primary-color);
}
.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.content {
  display: contents;
}

.green-color {
  color: var(--primary-color);
}

.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.pt-1 {
  padding-top: 1%;
}

.white-div {
  width: 40px;
  background: #fff;
}

.mt-20 {
  margin-top: 20px;
}
</style>
