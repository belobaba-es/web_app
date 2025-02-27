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
        <div v-if="hasCounterParty()" class="col-6">
          <p v-if="isUsdAndOwnerNameExists" class="font-medium text-sm">
            {{ t('bankAccountHolder') }}
          </p>
          <p v-else class="font-medium text-sm">
            {{ t('beneficiaryName') }}
          </p>
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
            {{ props.transaction.amount }}
            {{ props.transaction.assetCode ?? getAsset(props.transaction.assetId, listAssets).code }}
          </p>
          <p v-if="!props.transaction.isInternal && props.transaction.feeWire">{{ props.transaction.feeWire }}</p>
          <p></p>
        </div>
      </div>

      <Divider type="dashed"></Divider>

      <div class="inner-row-flex">
        <div class="col-6">
          <p class="font-medium text-sm">{{ t('transactionNumber') }}</p>
          <p class="font-medium text-sm">{{ t('status') }}</p>
          <p class="font-medium text-sm">{{ t('datePicker') }}</p>
        </div>

        <div class="col-6 pt-1">
          <p>{{ transaction.transactionId }}</p>
          <p class="status" :class="transaction.status !== 'CANCELLED' ? 'green-text' : 'red-text'">
            {{ transaction.status }}
          </p>
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
import logo from '../assets/img/logo-login.png'
import { TransactionHistory } from '../views/transaction-history/types/transaction-history-response.interface'
import { useAuth } from '../composables/useAuth'
import { useTransactionHistoryTable } from '../views/transaction-history/composables/useTransactionHistoryTable'
import { getAsset } from '../shared/getAsset'

const { getUserName, getClientId } = useAuth()

const username = getUserName()
const { listAssets } = useTransactionHistoryTable()
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
const props = defineProps<{
  display: boolean
  transaction: TransactionHistory
}>()
const isGeneratingTransactionPDF = ref(false)
const hasCounterParty = (): boolean => {
  return props.transaction.counterparty ? true : false
}
const ownerName = props.transaction.counterparty?.informationOwner?.name ?? ''
const isUsdAndOwnerNameExists = props.transaction.assetId === 'USD' && ownerName && ownerName.length > 0
const isUsdOrAssetIdIsUsd = props.transaction.assetCode === 'USD' || props.transaction.assetId === 'USD'

const generatePDFTransactionReceipt = () => {
  const transaction: any = props.transaction

  isGeneratingTransactionPDF.value = true
  const userAccountNumber = transformCharactersIntoAsterics(getClientId())

  const transactionPDF: any = {}
  const title = t('transactionReceipt')
  const footerPdf = t('footerPdfFiatData')
  const fileName = `${t('transactionReceipt')}-${transaction.id}`

  const beneficiaryName = `${
    transaction.beneficiary?.name ?? transaction.counterparty?.informationOwner?.name ?? transaction.to?.label ?? ''
  }`

  const maxReferenceLength = 49

  transactionPDF[t('userName')] = `${username}`
  transactionPDF[t('senderAccountId')] = `${userAccountNumber}`
  transactionPDF[t('beneficiaryName')] = beneficiaryName
  transactionPDF[t('assetType')] = transaction.assetCode === 'USD' || transaction.assetId ? 'FIAT' : 'CRYPTO'
  transactionPDF[t('amount')] = `${transaction.amount}`
  transactionPDF[t('status')] = `${transaction.status}`
  transactionPDF[t('transactionNumber')] = transaction.transactionId
  transactionPDF[t('reference')] = `${
    transaction.reference.length > maxReferenceLength
      ? transaction.reference.slice(0, maxReferenceLength)
      : transaction.reference
  }`
  transactionPDF[t('datePicker')] = `${transaction.formatedDate}`

  generateTransactionReceipt(fileName, logo, title, transactionPDF)
  isGeneratingTransactionPDF.value = false
}
</script>

<style lang="css" scoped>
.green-text {
  color: green;
}

.red-text {
  color: red;
}

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
