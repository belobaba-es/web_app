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
      
      <div class="field col-8">
        <label>{{ t('beneficiaryName') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="form.informationOwner.name" />
        </div>
      </div>
     
      <div class="col-8">
        <div class="field">
          <label>{{ t('typeBeneficiary') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.relationshipConsumer"
                :options="relationshipOptions"
                optionLabel="label"
                option-value="value"
                class="w-full"
              />
            </div>
        </div>
      </div>
      
      <div class="col-8">
        <div class="field">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="form.informationOwner.country"
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
      </div>

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
          <label>{{ t('typeBeneficiary') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="form.label"
                :options="originWalletOptions"
                optionLabel="label"
                option-value="value"
                class="w-full"
                @change="toggleInstitutionSection"
              />
            </div>
          </div>
        
        <!--#######################################-->  
        <!--Caso el beneficiario es una institucion-->
        <div v-if="showInstitutionSection">
          <p class="mt-4 mb-0 text-uppercase">{{ t('beneficiaryAddress') }}</p>
          <Divider class="mt-0"></Divider>
          <div class="grid mt-3">
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
                  v-model="form.institutionAddress.region"
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
  relationshipConsumer: '',
  informationOwner: {
    name: '',
    country: '',
  },
  institutionAddress: {
    streetOne: '',
    postalCode: '',
    city: '',
    region: '',
    country: ''
  },
})

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })
})
const OTHER = t('other');
const INSTITUTION = t('institution');
const UNKNOWN = t('unknown');

const originWalletOptions = [
  { label: OTHER, value: 'OTHER' },
  { label: INSTITUTION, value: 'INSTITUTION' },
  { label: UNKNOWN, value: 'UNKNOWN' },
];


const EX_SPOUSE = t('ex_spouse');
const CHILDREN = t('children');
const PARENT = t('parent');
const SIBLING = t('sibling');
const RELATIVE = t('relative');
const SELF = t('self');
const FRIEND = t('friend');
const BUSINESS_PARTNER = t('business_partner');
const CUSTOMER = t('customer');
const EMPLOYEE = t('employee');
const BRANCH_OFFICE = t('branch_office');
const SUBSIDIARY_COMPANY = t('subsidiary_company');
const HOLDING_COMPANY = t('holding_company');
const SUPPLIER = t('supplier');
const CREDITOR = t('creditor');
const DEBTOR = t('debtor');
const FRANCHISEE = t('franchisee');
const NOT_RELATED = t('not_related');

const relationshipOptions = [
  { label: EX_SPOUSE, value: 'EX_SPOUSE' },
  { label: CHILDREN, value: 'CHILDREN' },
  { label: PARENT, value: 'PARENT' },
  { label: SIBLING, value: 'SIBLING' },
  { label: RELATIVE, value: 'RELATIVE' },
  { label: SELF, value: 'SELF' },
  { label: FRIEND, value: 'FRIEND' },
  { label: BUSINESS_PARTNER, value: 'BUSINESS_PARTNER' },
  { label: CUSTOMER, value: 'CUSTOMER' },
  { label: EMPLOYEE, value: 'EMPLOYEE' },
  { label: BRANCH_OFFICE, value: 'BRANCH_OFFICE' },
  { label: SUBSIDIARY_COMPANY, value: 'SUBSIDIARY_COMPANY' },
  { label: HOLDING_COMPANY, value: 'HOLDING_COMPANY' },
  { label: SUPPLIER, value: 'SUPPLIER' },
  { label: CREDITOR, value: 'CREDITOR' },
  { label: DEBTOR, value: 'DEBTOR' },
  { label: FRANCHISEE, value: 'FRANCHISEE' },
  { label: NOT_RELATED, value: 'DEBTOR' }
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
