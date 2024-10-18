<template>
  <div class="card col-12 p-0">
    <h1 class="pr-4 font-semi-bold mt-5" style="font-size: 17px">{{ t('bankAccount') }}</h1>
    <h3 class="font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
    <div class="flex flex-column">
      <div v-if="!isShowRestFormBankData">
        <div class="field col">
          <label>{{ t('bankName') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationBank.bankName" type="text" />
          </div>
        </div>

        <div class="field col" v-if="!showInputIban">
          <label v-if="props.data.formObject.informationBank.address.country === 'MX'">{{ t('Clabe') }}</label>
          <label v-else>{{ t('accountNumber') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationBank.accountNumber" type="text" />
          </div>
        </div>
        <div>
          <div v-if="props.data.domestic" class="field col">
            <label v-if="$route.path.includes('ACH')">{{ t('abaAch') }}</label>
            <label v-else>{{ t('abaFed') }}</label>
            <div class="p-inputgroup">
              <InputText
                v-model="(props.data.formObject.informationBank as BankingDomestic).routingNumber"
                type="text"
              />
            </div>
          </div>
          <div v-else class="field col">
            <label>{{ t('swiftCode') }}</label>
            <div class="p-inputgroup">
              <InputText
                v-model="(props.data.formObject.informationBank as BankingInternational).swiftCode"
                type="text"
              />
            </div>
          </div>
        </div>

        <div v-if="showInputIban" class="field col">
          <label>{{ t('iban') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="(props.data.formObject.informationBank as BankingInternational).iban" type="text" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="field col">
          <label>{{ t('countryLabel') }} {{ props.data.formObject.informationBank.address.country }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="props.data.formObject.informationBank.address.country"
              :disabled="true"
              :loading="loadingCountriesField"
              :options="countryAllowedForUSA"
              :placeholder="t('countryPlaceholder')"
              class="custom-dropdown w-full"
              filter
              option-value="countryCode"
              optionLabel="name"
              required
            />
          </div>
        </div>
        <div class="field col">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationBank.address.city" type="text" />
          </div>
        </div>

        <div class="field col">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-if="props.data.formObject.informationBank.address.country === 'US' || props.data.domestic"
              v-model="props.data.formObject.informationBank.address.region"
              :options="state_us"
              :placeholder="t('stateLabel')"
              class="custom-dropdown w-full"
              option-value="state_code"
              optionLabel="name"
              required
            />
            <InputText v-else v-model="props.data.formObject.informationBank.address.region" type="text" />
          </div>
        </div>

        <div class="field col">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationBank.address.postalCode" type="text" />
          </div>
        </div>

        <div class="field col">
          <label>{{ t('address') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationBank.address.streetOne" type="text" />
          </div>
        </div>
      </div>
    </div>
    <div class="field mt-5 flex flex-column">
      <div class="col">
        <h3 class="font-normal m-0" style="color: #979797">
          {{ t('textAddBeneficiaryUsaStepNote1') }}
          <span class="font-medium" style="color: #1b1b19"> {{ t('textAddBeneficiaryUsaStepNote2') }}</span>
          {{ t('textAddBeneficiaryUsaStepNote3') }}
        </h3>
      </div>

      <div class="flex justify-content-center">
        <Button
          v-if="!isShowRestFormBankData"
          class="mb-4 mt-3 mr-2 w-8rem"
          outlined
          severity="secondary"
          style="color: #242731; display: flex; justify-content: center"
          @click="goBack"
          >{{ t('back') }}
        </Button>
        <Button
          v-else
          class="mb-4 mt-3 mr-2 w-8rem"
          outlined
          severity="secondary"
          style="color: #242731; display: flex; justify-content: center"
          @click="hideRestForm"
          >{{ t('back') }}
        </Button>
        <Button
          v-if="isShowRestFormBankData"
          :label="t('next')"
          class="mb-4 mt-3 ml-2 w-8rem"
          iconPos="right"
          @click="nextStep()"
        />
        <Button
          v-else
          class="mb-4 mt-3 ml-2 w-8rem"
          style="display: flex; justify-content: center"
          @click="handleIsShowRestForm"
          >{{ t('next') }} <i class="pi pi-arrow-right pl-3"></i>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useWorld } from '../../../../composables/useWorld'
import { BankingDomestic, BankingInternational, NewBeneficiary } from '../../../withdraw/type/beneficiary.type'
import { useBeneficiary } from '../../composables/useBeneficiary'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { useValidateFormDomestic } from '../../../withdraw/fiat/usa/components/beneficiary/composable/useValidateFromDomestic'
import { useValidateFormInternational } from '../../../withdraw/fiat/usa/components/beneficiary/composable/useValidateFormInternational'
import { useRouter } from 'vue-router'
import { useListBeneficiaryUsa } from '../../../withdraw/fiat/usa/composable/useListBeneficiaryUsa'

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const { isShowRestFormBankData } = useBeneficiary()
const { countryAllowedForUSA, loadingCountriesField, state_us } = useWorld()
const { validateDomesticBankForm } = useValidateFormDomestic()
const { validateAccountBeneficiaryForm, validateDataInformationBankForm } = useValidateFormInternational()
const { showInputIban } = useListBeneficiaryUsa()
const showCombo = ref<boolean>(false)
const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    required: true,
    formObject: {
      type: Object as () => NewBeneficiary,
      required: true,
    },
    domestic: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})

const nextStep = () => {
  if (props.data.domestic) {
    if (validateDomesticBankForm(props.data.formObject)) {
      const page = 0
      emit('nextPage', {
        pageIndex: page,
      })
    }
  } else if (validateAccountBeneficiaryForm(props.data.formObject)) {
    const page = 0
    emit('nextPage', {
      pageIndex: page,
    })
  }
}

const handleIsShowRestForm = () => {
  if (validateDataInformationBankForm(props.data.formObject)) {
    isShowRestFormBankData.value = !isShowRestFormBankData.value
  }
}

const hideRestForm = () => {
  isShowRestFormBankData.value = false
}

const disableCountry = () => {
  if (props.data.formObject.informationBank.address.country === 'US') {
    showCombo.value = true
    return true
  }
}
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.custom-dropdown {
  border-radius: 4px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.card {
  margin: 0 auto;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}
</style>
