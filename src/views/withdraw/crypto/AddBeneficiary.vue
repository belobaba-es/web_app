<template>
  <section class="section-main">
    <div class="col-8">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary">{{ t('crypto') }} </span>
      </p>
      <div class="flex align-items-center">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
        <span class="text-xl"> {{ t('otherPlatformCrypto') }}</span>
      </div>
    </div>

    <h5 class="text-2xl font-medium mt-2 p-3">{{ t('addNewBeneficiary') }}</h5>

    <div class="formgrid grid mt-4 p-3">
      <div class="col-8">
        <div class="field">
          <SelectedAssets @selectedAsset="selectAsset" />
        </div>
        <div class="field">
          <label>{{ t('walletAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.walletAddress" />
          </div>
        </div>

        <div class="field">
          <label>{{ t('label') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="selectedOriginWallet"
                :options="originWalletOptions"
                optionLabel="label"
                option-value="value"
                class="w-full"
                @change="toggleInstitutionFields"
              />
            </div>
          </div>
        
      
        <!--Caso el beneficiario es una institucion-->
        <div v-if="showInstitutionSection">
          <div class="grid mt-5">
            <div class="field col-12">
              <label>{{ t('countryLabel') }}</label>
              <div class="p-inputgroup">
                <Dropdown
                  v-model="form.institutionAddress.country"
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
                  v-model="form.institutionAddress.country"
                  :options="states"
                  optionLabel="name"
                  option-value="state_code"
                  :loading="loadingStatesField"
                  :placeholder="t('statePlaceHolder')"
                  :disabled="statesInputIsEmpty"
                  class="w-full"
                  @change="onChangeStateHandler"
                />
              </div>
            </div>

            <div class="field col-4">
              <label>{{ t('cityLabel') }}</label>
              <div class="p-inputgroup">
                <InputText type="text" v-model="form.institutionAddress.city" class="w-full" required />
              </div>
            </div>

            <div class="field col-4">
              <label>{{ t('postalCodeLabel') }}</label>
              <div class="p-inputgroup">
                <InputText type="text" v-model="form.institutionAddress.postalCode" />
              </div>
            </div>
          </div>

          <div class="field">
            <label>{{ t('streetAddress') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" required v-model="form.institutionAddress.streetOne" />
            </div>
          </div>
        </div>
       <!--###########################################-->
      
        <div class="field flex justify-content-end">
            <Button :label="t('Save new beneficiary')" class="px-5" @click="saveBeneficiary" />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider'
import { useWorld } from '../../../composables/useWorld'
import { useI18n } from 'vue-i18n'
import SelectedAssets from '../../../components/SelectedAssets.vue'
import { useWithdraw } from '../composables/useWithdraw'
import { BeneficiaryService } from '../services/beneficiary'
import { useRouter } from 'vue-router'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const { toBack } = useWithdraw([])

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

const form = ref({
  walletAddress: '',
  label: '',
  assetId: '',
  institutionAddress: {
    streetOne: '',
    postalCode: '',
    city: '',
    region: '',
    country: ''
  },
  OriginWallet: {
    INSTITUTION : 'INSTITUTION',
    OTHER : 'OTHER',
    UNKNOWN : 'UNKNOWN',
  }
})

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })
})

const originWalletOptions = [
  { label: 'OTHER', value: 'OTHER' },
  { label: 'INSTITUTION', value: 'INSTITUTION' },
  { label: 'UNKNOWN', value: 'UNKNOWN' },
];

const selectedOriginWallet = ref('');

const toggleInstitutionFields = () => {
  if (selectedOriginWallet.value === 'INSTITUTION') {
    showInstitutionSection.value = true;
  } else {
    showInstitutionSection.value = false;
  }
}

const selectAsset = (asset: any) => {
  form.value.assetId = asset.assetId
}

const showInstitutionSection = ref(false);

const toggleInstitutionSection = () => {
  showInstitutionSection.value = !showInstitutionSection.value;
}

const saveBeneficiary = () => {
  if (form.value.assetId.length === 0 || form.value.label.length === 0 || form.value.walletAddress.length === 0) {
    toast.add({
      severity: 'info',
      detail: t('pleaseVerifyField'),
      life: 4000,
    })
    return
  }

  const beneficiaryService = BeneficiaryService.instance()
  beneficiaryService.saveBeneficiaryAssets(form.value).then(resp => {
    router.push('/withdraw/crypto/other')
    toast.add({
      severity: 'success',
      detail: resp.message,
      life: 4000,
    })
  }).catch(error => {
      if (error.response.data.message) {
          toast.add({
              severity: 'error',
              summary: t('somethingWentWrong'),
              detail: error.response.data.message,
              life: 4000,
          })
          return
      }
  })
}
</script>
