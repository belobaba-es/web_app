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

    <InternationalTransferDetail
      v-if="props.formData.typeTransaction === 'international'"
      :realName="props.formData.beneficiary.informationOwner.name"
      :account="props.formData.beneficiary.informationBank.accountNumber"
      :amount="props.formData.amount"
      :amountFee="props.formData.amountFee"
      :fee="props.formData.fee"
      :transactionId="transactionId"
      :assetCode="props.formData.assetCode ?? 'USD'"
    ></InternationalTransferDetail>

    <DomesticTransferDetail
      v-if="props.formData.typeTransaction === 'domestic'"
      :realName="props.formData.beneficiary.informationOwner.name"
      :account="props.formData.beneficiary.informationBank.accountNumber"
      :amount="props.formData.amount"
      :amountFee="props.formData.amountFee"
      :fee="props.formData.fee"
      :transactionId="transactionId"
      :assetCode="props.formData.assetCode ?? 'USD'"
    ></DomesticTransferDetail>

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
import DomesticTransferDetail from '../../../../components/DomesticTransferDetail.vue'
import InternationalTransferDetail from '../../../../components/InternationalTransferDetail.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import transformCharactersIntoAsterics from '../../../../shared/transformCharactersIntoAsterics'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import logo from '../../../../assets/img/logo-login.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../../../composables/useAuth'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

const isGeneratingTransactionPDF = ref(false)

const props = defineProps<{
  formData: any
  transactionId: string
}>()

const { getUserId, getUserName } = useAuth()

const goToWithdrawIndex = () => {
  // TODO refactorizar composable function
  if (props.formData.typeTransaction === 'international') {
    window.location.href = '/withdraw/usa/fiat/international'
  }
  if (props.formData.typeTransaction === 'domestic') {
    window.location.href = '/withdraw/usa/fiat/domestic'
  }
}
const generatePDFTransactionReceipt = async () => {
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
  transactionPDF[t('senderAccountId')] = `${props.formData.beneficiary.accountId}`
  transactionPDF[t('beneficiaryName')] = `${props.formData.beneficiary.informationOwner.name}`
  transactionPDF[t('amount')] = `${props.formData.amount} USD`
  transactionPDF[t('transactionNumber')] = props.transactionId
  transactionPDF[t('reference')] = `${props.formData.reference}`
  transactionPDF[t('datePicker')] = `${formattedDate}`

  generateTransactionReceipt(fileName, logo, title, transactionPDF)
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
