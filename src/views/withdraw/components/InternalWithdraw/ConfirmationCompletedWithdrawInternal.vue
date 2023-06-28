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
      v-if="route.params.type === 'fiat'"
      :realName="beneficiary.name"
      :email="beneficiary.email"
      :account="props.formData.beneficiary.accountNumber"
      :amount="props.formData.amount"
      :amountFee="props.formData.amountFee"
      :fee="props.formData.fee"
      :transactionId="transactionId"
      :assetCode="props.formData.assetCode ?? 'USD'"
    ></InternalFiatDetails>

    <CryptoTransferDetail
      v-if="route.params.type === 'crypto'"
      :realName="props.formData.beneficiary.name"
      :email="props.formData.beneficiary.email"
      :wallet="props.formData.symbol"
      :amount="props.formData.amount"
      :amountFee="props.formData.amountFee"
      :fee="props.formData.fee"
      :transactionId="transactionId"
      :assetCode="props.formData.assetCode"
    ></CryptoTransferDetail>

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
import CryptoTransferDetail from '../../../../components/CryptoTransferDetail.vue'
import InternalFiatDetails from '../../../../components/InternalFiatDetails.vue'
import Button from 'primevue/button'
import transformCharactersIntoAsterics from '../../../../shared/transformCharactersIntoAsterics'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import logo from '../../../../assets/img/logo.png'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../../../stores/user'
import { useI18n } from 'vue-i18n'
import { BeneficiaryInternal } from '../../types/beneficiary.interface'

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<{
  formData: any
  transactionId: string
  beneficiary: BeneficiaryInternal
}>()

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isGeneratingTransactionPDF = ref(false)

const username = userStore.getUser.firstName
  ? userStore.getUser.firstName + ' ' + userStore.getUser.lastName
  : userStore.getUser.name

const goToWithdrawIndex = () => {
  router.push(`/withdraw`)
}

const generatePDFTransactionReceipt = () => {
  isGeneratingTransactionPDF.value = true
  const user = userStore.getUser
  const userAccountNumber = transformCharactersIntoAsterics(user.accountId)

  const transactionPDF: any = {}
  const title = t('transactionReceipt')
  const footerPdf = t('footerPdfFiatData')
  const fileName = `${t('transactionReceipt')}-${props.transactionId}`

  const date = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedDate = formatter.format(date)

  transactionPDF[t('userName')] = `${username}`
  transactionPDF[t('senderAccountId')] = `${userAccountNumber}`
  transactionPDF[t('beneficiaryName')] = `${props.formData.beneficiary.name}`
  transactionPDF[t('assetType')] = props.formData.symbol
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