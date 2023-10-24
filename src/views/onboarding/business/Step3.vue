<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }} - {{ t('accountPropuseTitle') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
        <label>{{ t('accountPropuseTitle') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="purposeAccount" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('accountPropuseHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('sourceAssetsAndIncomeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="sourceAssetsAndIncome" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('sourceAssetsAndIncomeHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('intendedUseAccountLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="intendedUseAccount" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('intendedUseAccountHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedTypesAssetsLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="anticipatedTypesAssets" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedTypesAssetsHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyCashVolumeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="anticipatedMonthlyCashVolume" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyCashVolumeHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedTradingPatternsLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="anticipatedTradingPatterns" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedTradingPatternsHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyTransactionsIncomingLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="anticipatedMonthlyTransactionsIncoming" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyTransactionsIncomingHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyTransactionsOutgoingLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="anticipatedMonthlyTransactionsOutgoing" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyTransactionsOutgoingHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('natureBusinessCompanyLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="natureBusinessCompany" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('natureBusinessCompanyHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" :loading="submitting" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from 'vue'
import { OnboardingService } from '../services/onboarding'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import showExceptionError from '../../../shared/showExceptionError'
import showMessage from '../../../shared/showMessageArray'

import { useToast } from 'primevue/usetoast'

import { useI18n } from 'vue-i18n'

import router from '../../../router'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)
const formData = ref()

const purposeAccount = ref<string>('')
const sourceAssetsAndIncome = ref<string>('')
const intendedUseAccount = ref<string>('')
const anticipatedTypesAssets = ref<string>('')
const anticipatedMonthlyCashVolume = ref<string>('')
const anticipatedTradingPatterns = ref<string>('')
const anticipatedMonthlyTransactionsIncoming = ref<string>('')
const anticipatedMonthlyTransactionsOutgoing = ref<string>('')
const natureBusinessCompany = ref<string>('')

onMounted(() => {
  const data = localStorage.getItem('companyData') || '{}'

  if (data) {
    formData.value = JSON.parse(data)
  }
})

const validateFields = () => {
  const ispurposeAccountValid = purposeAccount.value.trim() !== ''
  const issourceAssetsAndIncomeValid = sourceAssetsAndIncome.value.trim() !== ''
  const isintendedUseAccountValid = intendedUseAccount.value.trim() !== ''
  const isanticipatedTypesAssetsValid = anticipatedTypesAssets.value.trim() !== ''
  const isanticipatedMonthlyCashVolumeValid = anticipatedMonthlyCashVolume.value.trim() !== ''
  const isanticipatedTradingPatternsValid = anticipatedTradingPatterns.value.trim() !== ''
  const isanticipatedMonthlyTransactionsIncomingValid = anticipatedMonthlyTransactionsIncoming.value.trim() !== ''
  const isanticipatedMonthlyTransactionsOutgoingValid = anticipatedMonthlyTransactionsOutgoing.value.trim() !== ''
  const isnatureBusinessCompanyValid = natureBusinessCompany.value.trim() !== ''

  return (
    ispurposeAccountValid &&
    issourceAssetsAndIncomeValid &&
    isintendedUseAccountValid &&
    isanticipatedTypesAssetsValid &&
    isanticipatedMonthlyCashVolumeValid &&
    isanticipatedTradingPatternsValid &&
    isanticipatedMonthlyTransactionsIncomingValid &&
    isanticipatedMonthlyTransactionsOutgoingValid &&
    isnatureBusinessCompanyValid
  )
}

const saveData = () => {
  submitting.value = true

  if (validateFields()) {
    formData.value = {
      ...formData.value,
      accountQuestionnaire: {
        purposeAccount: purposeAccount.value,
        sourceAssetsAndIncome: sourceAssetsAndIncome.value,
        intendedUseAccount: intendedUseAccount.value,
        anticipatedTypesAssets: anticipatedTypesAssets.value,
        anticipatedMonthlyCashVolume: anticipatedMonthlyCashVolume.value,
        anticipatedTradingPatterns: anticipatedTradingPatterns.value,
        anticipatedMonthlyTransactionsIncoming: anticipatedMonthlyTransactionsIncoming.value,
        anticipatedMonthlyTransactionsOutgoing: anticipatedMonthlyTransactionsOutgoing.value,
        natureBusinessCompany: natureBusinessCompany.value,
      },
    }

    localStorage.setItem('companyData', JSON.stringify(formData.value))
    localStorage.setItem('registerNumber', formData.value.informationCompany.registerNumber)

    new OnboardingService()
      .openingAccountBussiness(formData.value)
      .then(resp => {
        submitting.value = false
        toast.add({
          severity: 'success',
          detail: resp.message,
          life: 4000,
        })

        router.push('/dashboard')
      })
      .catch(e => {
        submitting.value = false

        if (e.response.data.data?.warning) {
          e.response.data.data.warning.forEach((element: any) => {
            showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
          })
          return
        }

        if (e.response.data.message) {
          showExceptionError(toast, 'error', t('somethingWentWrong'), e.response.data.message, 4000)
          return
        }

        showMessage(toast, e.response.data)
      })
  } else {
    submitting.value = false
    toast.add({
      severity: 'error',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
}
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}

#phoneNumber {
  width: 97%;
}
</style>
