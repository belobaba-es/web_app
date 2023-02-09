<template>
  <section class="section-main">
    <div class="w-75">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary">{{ t('fiat') }} </span>
      </p>
      <div class="flex align-items-center">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="back" />

        <span class="text-xl">International Wire</span>
      </div>

      <div class="mt-4 col-12">
        <span class="font-medium">{{ t('addBeneficiaries') }}</span>
      </div>

      <div class="col-12 md:col-8">
        <div class="field">
          <label>{{ t('depositNameOnBank') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.realName" />
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
          <label>{{ t(' Intermediary Bank Name') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.intermediaryBank.intermediaryBankName" />
          </div>
        </div>

        <div class="grid mt-4 mb-4">
          <div class="field-radiobutton col-6">
            <RadioButton
              inputId="ROUTING_NUMBER"
              value="ROUTING_NUMBER"
              v-model="form.intermediaryBank.intermediaryNumberType"
            />
            <label for="ROUTING_NUMBER">{{ t('intermediaryRoutingNumber') }}</label>
          </div>

          <div class="field-radiobutton col-6">
            <RadioButton
              inputId="SWIFT_CODE"
              value="SWIFT_CODE"
              v-model="form.intermediaryBank.intermediaryNumberType"
            />
            <label for="SWIFT_CODE">{{ t('intermediarySwiftCode') }}</label>
          </div>
        </div>

        <div class="field">
          <label v-show="form.intermediaryBank.intermediaryNumberType == 'ROUTING_NUMBER'"
            >{{ t(' Intermediary Routing Number') }}
          </label>
          <label v-show="form.intermediaryBank.intermediaryNumberType == 'SWIFT_CODE'"
            >{{ t(' Intermediary Swift Code') }}
          </label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.intermediaryBank.intermediaryNumber" />
          </div>
        </div>

        <div class="field">
          <label>{{ t('IBAN') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.iban" />
          </div>
        </div>

        <p class="mt-5 mb-0 text-uppercase">{{ t('intermediaryBankAddress') }}</p>
        <Divider class="mt-0"></Divider>

        <div class="grid mt-5">
          <div class="field col-12">
            <label>{{ t('countryLabel') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.intermediaryBank.intermediaryBankCountry"
                :options="countries"
                optionLabel="name"
                option-value="country_code"
                :loading="loadingCountiesField"
                :placeholder="t('countryPlaceholder')"
                :disabled="countriesInputIsEmpty"
                class="w-full"
                @change="onBankChangeCountryHandler"
                required
              />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('stateLabel') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.intermediaryBank.intermediaryBankState"
                :options="bankStates"
                optionLabel="name"
                option-value="name"
                :loading="bankLoadingStatesField"
                :placeholder="t('statePlaceHolder')"
                :disabled="bankStatesInputIsEmpty"
                class="w-full"
                @change="onBankChangeStateHandler"
                required
              />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('cityLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.intermediaryBank.intermediaryBankCity" class="w-full" required />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('postalCodeLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.intermediaryBank.intermediaryBankPostalCode" />
            </div>
          </div>
        </div>

        <div class="field">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" required v-model="form.intermediaryBank.intermediaryBankStreetOne" />
          </div>
        </div>

        <div class="field">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.intermediaryBank.intermediaryBankStreetTwo" />
          </div>
        </div>

        <p class="mt-4 mb-0 text-uppercase">{{ t('beneficiaryAddress') }}</p>
        <Divider class="mt-0"></Divider>
        <div class="grid mt-5">
          <div class="field col-12">
            <label>{{ t('countryLabel') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.country"
                :options="countries"
                optionLabel="name"
                option-value="country_code"
                :loading="loadingCountiesField"
                :placeholder="t('countryPlaceholder')"
                :disabled="countriesInputIsEmpty"
                class="w-full"
                @change="onChangeCountryHandler"
                required
              />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('stateLabel') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.state"
                :options="states"
                optionLabel="name"
                option-value="name"
                :loading="loadingStatesField"
                :placeholder="t('statePlaceHolder')"
                :disabled="statesInputIsEmpty"
                class="w-full"
                @change="onChangeStateHandler"
                required
              />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('cityLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.city" class="w-full" required />
            </div>
          </div>
          <div class="field col-4">
            <label>{{ t('postalCodeLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.postalCode" />
            </div>
          </div>
        </div>

        <div class="field">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.streetOne" />
          </div>
        </div>

        <div class="field">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.streetTwo" />
          </div>
        </div>

        <div class="field mt-5 flex justify-content-end">
          <Button
            :label="t('saveNewPayee')"
            class="px-5"
            @click="saveBeneficiary"
            iconPos="right"
            :loading="submitting"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWorld } from '../../../composables/useWorld'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider'
import { BeneficiaryFiatInternacional } from '../types/beneficiary.interface'
import router from '../../../router'
import { BeneficiaryService } from '../services/beneficiary'
import { useToast } from 'primevue/usetoast'
import showMessage from '../../../shared/showMessageArray'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const submitting = ref(false)

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
  realName: '',
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
  fetchCountries().then(() => {
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
      if (e.response.data.message) {
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: e.response.data.message,
          life: 4000,
        })
        return
      }

      showMessage(toast, e.response.data)
    })
}
</script>

<style scoped></style>
