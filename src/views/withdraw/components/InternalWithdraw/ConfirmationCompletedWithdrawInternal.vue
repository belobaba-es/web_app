<template>
  <div class="formgrid grid mt-5 mb-5">
    <p class="text-3xl font-medium mb-4">
      <span class="text-primary">Your transfer has been successful</span>
    </p>

    <!--      transaction summary-->
    <div class="col-12">
      <span class="mt-4">transaction summary</span>
      <Divider></Divider>
    </div>

    <InternalFiatDetails
      :realName="props.formData.beneficiary.name"
      :realEmail="props.formData.beneficiary.email || 'N/A'"
      :account="props.formData.beneficiary.accountNumber"
      :amountFee="props.formData.amountFee || props.formData.amount"
      :fee="props.formData.fee"
      :amount="props.formData.amount"
      :assetCode="props.formData.assetCode ?? 'USD'"
      :transactionId="transactionId"
    ></InternalFiatDetails>

    <div class="col-12 btn-container">
      <Button class="w-50 p-button mt-5 btn-routing" :label="t('newTransfer')" @click="goToWithdrawIndex()" />

      <Button
        class="w-50 p-button mt-5"
        :label="t('downloadPdf')"
        @click="generatePDFTransactionReceipt()"
        :loading="isGeneratingTransactionPDF"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Divider from 'primevue/divider'
import InternalFiatDetails from '../../../../components/InternalFiatDetails.vue'
import Button from 'primevue/button'
import transformCharactersIntoAsterics from '../../../../shared/transformCharactersIntoAsterics'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import logo from '../../../../assets/img/logo.png'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { UserAccount } from '../../types/account'
import { useAuth } from '../../../../composables/useAuth'

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<{
  formData: any
  transactionId: string
  beneficiary: UserAccount
}>()

const router = useRouter()
const route = useRoute()

const isGeneratingTransactionPDF = ref(false)

const { getUserName, getUserId } = useAuth()

const goToWithdrawIndex = async () => {
  // TODO composable function
  window.location.href = '/withdraw/'
}

const generatePDFTransactionReceipt = () => {
  isGeneratingTransactionPDF.value = true
  const userAccountNumber = transformCharactersIntoAsterics(getUserId())

  const transactionPDF: any = {}
  const title = t('transactionReceipt')
  const footerPdf = t('footerPdfFiatData')
  const fileName = `${t('transactionReceipt')}-${props.transactionId}`

  const date = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedDate = formatter.format(date)

  transactionPDF[t('userName')] = `${getUserName()}`
  transactionPDF[t('senderAccountId')] = `${userAccountNumber}`
  transactionPDF[t('beneficiaryName')] = `${props.formData.beneficiary.name}`
  transactionPDF[t('assetType')] = props.formData.assetCode
  transactionPDF[t('amount')] = `${props.formData.total}`
  transactionPDF[t('transactionNumber')] = props.transactionId
  transactionPDF[t('reference')] = `${props.formData.reference}`
  transactionPDF[t('datePicker')] = `${formattedDate}`

  generateTransactionReceipt(fileName, logo, title, transactionPDF, footerPdf)
  isGeneratingTransactionPDF.value = false
}
</script>

<style scoped>
.btn-container {
  display: flex;
  flex-direction: column;
}

.btn-routing {
  background-color: white;
  color: black;
  border: 1px solid #e7e6e7;
  border-radius: 5px;
  opacity: 1;
}
</style>