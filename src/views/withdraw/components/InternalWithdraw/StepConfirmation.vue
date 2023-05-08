<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ beneficiary.name }}</p>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">
      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amount }} {{ formData.symbol }}</p>
      </div>
      <div class="field col-12">
        <small>{{ t('fee') }}</small>

        <p class="green-color mt-0">
          <small>{{ formData.fee }} {{ formData.symbol }}</small>
        </p>
      </div>
    </div>

    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ beneficiary.name }}</p>
    </div>

    <div class="col-12">
      <p class="font-medium green-color">{{ formData.total }} {{ assetSymbol }}</p>
    </div>

    <Button
      class="w-50 p-button search-btn"
      iconPos="right"
      :label="t('confirmWithdraw')"
      @click="makeTransaction()"
      :loading="submitting"
    />
  </div>

  <!-- Completed transfer resume and download PDF Receipt -->
  <div v-if="isCompleted" class="formgrid grid mt-5 mb-5">
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
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { BeneficiaryInternal } from '../../types/beneficiary.interface'
import { WithdrawService } from '../../services/withdraw'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import CryptoTransferDetail from '../../../../components/CryptoTransferDetail.vue'
import InternalFiatDetails from '../../../../components/InternalFiatDetails.vue'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import logo from '../../../../assets/img/logo.png'
import { useUserStore } from '../../../../stores/user'
import transformCharactersIntoAsterics from '../../../../shared/transformCharactersIntoAsterics'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const { updateBlockedBalanceWalletByCode } = useBalanceWallet()
const transactionId = ref('')
const submitting = ref(false)
const isCompleted = ref(false)
const isGeneratingTransactionPDF = ref(false)
const props = defineProps<{
  formData: any
}>()
const assetSymbol = props.formData.symbol
const beneficiary = props.formData.beneficiary as BeneficiaryInternal
const emit = defineEmits(['complete'])
const router = useRouter()
const userStore = useUserStore()
const username = userStore.getUser.firstName
  ? userStore.getUser.firstName + ' ' + userStore.getUser.lastName
  : userStore.getUser.name

const goToWithdrawIndex = () => {
  router.push(`/withdraw`)
}
function makeTransaction() {
  const withDrawService = WithdrawService.instance()

  submitting.value = true

  switch (route.params.type) {
    case 'fiat':
      withDrawService
        .makeFiatInternalTransfer({
          amount: props.formData.amount,
          accountDestination: props.formData.beneficiary.accountId,
          reference: props.formData.reference,
        })
        .then((res: any) => {
          transactionId.value = res.data.transactionId
          submitting.value = false
          isCompleted.value = true
          updateBlockedBalanceWalletByCode(props.formData.symbol, props.formData.amount)
          showSuccessMessage()
          // emit('complete')
        })
        .catch(e => {
          submitting.value = false

          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: e.response.data.message,
            life: 4000,
          })
        })
      break
    case 'crypto':
      withDrawService
        .makeAssetInternalTransfer({
          amount: props.formData.amount,
          accountDestination: props.formData.beneficiary.accountId,
          reference: props.formData.reference,
          assetId: props.formData.assetId,
        })
        .then((res: any) => {
          transactionId.value = res.data.transactionId
          submitting.value = false
          isCompleted.value = true
          updateBlockedBalanceWalletByCode(props.formData.symbol, props.formData.amount)
          showSuccessMessage()
          // emit('complete')
        })
        .catch(e => {
          submitting.value = false

          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: e.response.data.message,
            life: 4000,
          })
        })
      break
    default:
      submitting.value = false
  }
}

const generatePDFTransactionReceipt = () => {
  isGeneratingTransactionPDF.value = true
  const user = userStore.getUser
  const userAccountNumber = transformCharactersIntoAsterics(user.accountId)

  const transactionPDF: any = {}
  const title = t('transactionReceipt')
  const footerPdf = t('footerPdfFiatData')
  const fileName = `${t('transactionReceipt')}-${transactionId.value}`

  const date = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedDate = formatter.format(date)

  transactionPDF[t('userName')] = `${username}`
  transactionPDF[t('senderAccountId')] = `${userAccountNumber}`
  transactionPDF[t('beneficiaryName')] = `${props.formData.beneficiary.name}`
  transactionPDF[t('assetType')] = props.formData.symbol
  transactionPDF[t('amount')] = `${props.formData.total}`
  transactionPDF[t('transactionNumber')] = transactionId.value
  transactionPDF[t('reference')] = `${props.formData.reference}`
  transactionPDF[t('datePicker')] = `${formattedDate}`

  generateTransactionReceipt(fileName, logo, title, transactionPDF, footerPdf)
  isGeneratingTransactionPDF.value = false
}

const showSuccessMessage = () => {
  toast.add({
    severity: 'success',
    summary: 'Order submitted',
    detail: t('orderCompleted'),
    life: 4000,
  })
}
</script>

<style scoped>
.title-beneficiary {
  color: #14443f;
}

.green-color {
  color: var(--primary-color);
}

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
