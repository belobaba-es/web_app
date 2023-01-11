<template>
  <div class="w-75">
    <p class="text-3xl font-medium mb-4">{{ t('withdraw') }} / <span class="text-primary">{{ t('fiat') }} </span></p>
    <div class="flex align-items-center">

      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="back"/>
      <span class="text-xl"> Domestic Wire</span>
    </div>

    <div class="mt-4 col-12">
      <span class="font-medium">{{ t('addBeneficiaries') }}</span>
    </div>

    <div class="col-12 md:col-8">

      <div class="field">
        <label>{{ t('depositNameOnBank') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="form.realName"/>

        </div>
        <small>Make sure it exactly as it appears on your bank account</small>
      </div>

      <div class="field">
        <label>{{ t('bankName') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="form.bankName"/>

        </div>
      </div>

      <div class="field">
        <label>{{ t('accountNumber') }}</label>
        <div class="p-inputgroup">
          <InputText type="text"
                     v-model="form.accountNumber"/>

        </div>
      </div>
      <div class="field">
        <label>{{ t('routingNumber') }}</label>
        <div class="p-inputgroup">
          <InputText type="text"
                     v-model="form.routingNumber"/>
        </div>
      </div>

      <div class="field grid">
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
                @change="onBankChangeCountryHandler"
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
            <InputText
                type="text"
                v-model="form.city"
                class="w-full"
                required
            />
          </div>
        </div>
        <div class="field col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.postalCode"/>
          </div>
        </div>
      </div>

      <div class="field">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="form.streetOne"/>
        </div>
      </div>

      <div class="field">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="form.streetTwo"/>
        </div>
      </div>

      <div class="field flex justify-content-end">
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
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import {useToast} from 'primevue/usetoast';
import {onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import {useWorld} from '../../../composables/useWorld';
import {BeneficiaryService} from '../services/beneficiary';
import {BeneficiaryFiatDomestic} from '../types/beneficiary.interface';
import showMessage from "../../../shared/showMessageArray";

const router = useRouter();
const {t} = useI18n({useScope: 'global'})
const toast = useToast();

const submitting = ref(false);

const {
  countries,
  fetchCountries,
  statesInputIsEmpty,
  loadingStatesField,
  states,
  loadingCountiesField,
  countriesInputIsEmpty,
  onChangeStateHandler,
  onChangeCountryHandler: onBankChangeCountryHandler,
} = useWorld();

onMounted(async () => {
  await fetchCountries();
})

const form = ref<BeneficiaryFiatDomestic>({
  bankName: "",
  realName: "",
  accountNumber: "",
  routingNumber: "",
  streetOne: "",
  streetTwo: "",
  postalCode: "",
  country: "",
  city: "",
  state: "",
  typeBeneficiaryBankWithdrawal: "DOMESTIC",
})


const saveBeneficiary = () => {
  submitting.value = true
  const beneficiaryService = BeneficiaryService.instance();
  beneficiaryService.saveBeneficiaryDomestic(form.value).then(resp => {
    submitting.value = false
    router.push('/withdraw/fiat/domestic')
    toast.add({
      severity: 'success',
      detail: resp.message,
      life: 4000,
    })
  }).catch(e => {

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

const back = () => {

  router.back()
}
</script>

<style scoped>

</style>