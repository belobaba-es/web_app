<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('depositNameOnBank') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.realName" readonly />
      </div>
      <small>Make sure it exactly as it appears on your bank account</small>
    </div>

    <div class="field">
      <label>{{ t('bankName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.bankName" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('accountNumber') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.accountNumber" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('swiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.swiftCode" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('IBAN') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.iban" />
      </div>
    </div>

    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="nextStep" iconPos="right" :loading="submitting" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWorld } from '../../../../composables/useWorld'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { BeneficiaryFiatInternacional } from '../../types/beneficiary.interface'
import router from '../../../../router'
import { BeneficiaryService } from '../../services/beneficiary'
import { useToast } from 'primevue/usetoast'
import showMessage from '../../../../shared/showMessageArray'
import showExceptionError from '../../../../shared/showExceptionError'
import { useUserStore } from '../../../../stores/user'

const emit = defineEmits(['nextPage', 'prevPage'])

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const submitting = ref(false)

const { getUserName } = useUserStore()
const {
  countries,
  fetchCountries,
  loadingCountiesField,
  countriesInputIsEmpty,
  statesInputIsEmpty,
  loadingStatesField,
  states,
  onChangeCountryHandler,
  onChangeStateHandler,
} = useWorld()

const {
  countries: bankCountries,
  statesInputIsEmpty: bankStatesInputIsEmpty,
  loadingStatesField: bankLoadingStatesField,
  states: bankStates,
  onChangeCountryHandler: onBankChangeCountryHandler,
  onChangeStateHandler: onBankChangeStateHandler,
} = useWorld()

const form = ref<BeneficiaryFiatInternacional>({
  realName: getUserName(),
  accountNumber: '',
  routingNumber: '',
  streetOne: '',
  streetTwo: '',
  postalCode: '',
  country: '',
  city: '',
  state: '',
  iban: '',
  bankName: '',
  swiftCode: '',
  intermediaryBank: {
    bankCity: '',
    intermediaryBankCountry: '',
    intermediaryBankCity: '',
    bankPostalCode: '',
    intermediaryBankPostalCode: '',
    intermediaryBankState: '',
    intermediaryBankName: '',
    intermediaryBankStreetTwo: '',
    intermediaryBankAccountNumber: '',
    intermediaryBankStreetOne: '',
    bankCountry: '',
    intermediaryNumber: '',
    bankState: '',
    bankStreetTwo: '',
    bankStreetOne: '',
    intermediaryNumberType: 'ROUTING_NUMBER',
  },
  typeBeneficiaryBankWithdrawal: 'INTERNATIONAL',
})

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })
})

const back = () => {
  router.push('/withdraw/fiat/international')
}

const saveBeneficiary = () => {
  submitting.value = true
  const beneficiaryService = BeneficiaryService.instance()
  beneficiaryService
    .saveBeneficiaryInternational(form.value)
    .then(resp => {
      submitting.value = false
      router.push('/withdraw/fiat/international')
      toast.add({
        severity: 'success',
        detail: resp.message,
        life: 4000,
      })
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
}

const nextStep = () => {
  const page = 0
  const formData = {}

  console.log(formData)

  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
</script>
