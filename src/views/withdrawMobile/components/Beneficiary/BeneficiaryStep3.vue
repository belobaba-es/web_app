<template>
  <div class="card col-12 md:col-12 p-0">
    <h1 class="pr-4 font-semi-bold m-0 mt-5" style="font-size: 17px">{{ t('internationalBank') }}</h1>
    <h3 class="font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
    <div class="flex flex-column">
      <div v-if="!isShowRestFormIntermediary">
        <div class="field col">
          <label>{{ t('bankName') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationIntermediaryBank!.bankName" type="text" />
          </div>
        </div>
        <div class="field col">
          <label>{{ t('swiftCode') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationIntermediaryBank.swiftCode" type="text" />
          </div>
        </div>
        <div class="field col">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="props.data.formObject.informationIntermediaryBank.address.country"
              :loading="loadingCountriesField"
              :options="countryAllowedForUSA"
              :placeholder="t('countryPlaceholder')"
              class="w-full"
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
            <InputText v-model="props.data.formObject.informationIntermediaryBank.address.city" type="text" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="field col">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-if="props.data.formObject.informationIntermediaryBank.address.country === 'US'"
              v-model="props.data.formObject.informationIntermediaryBank.address.region"
              :options="state_us"
              :placeholder="t('stateLabel')"
              class="custom-dropdown w-full"
              option-value="state_code"
              optionLabel="name"
              required
            />
            <InputText v-model="props.data.formObject.informationIntermediaryBank!.address.region" type="text" />
          </div>
        </div>
        <div class="field col">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationIntermediaryBank.address.postalCode" type="text" />
          </div>
        </div>
        <div class="field col">
          <label>{{ t('address') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="props.data.formObject.informationIntermediaryBank.address.streetOne" type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="field mt-3 flex flex-column">
    <div class="col mx-3">
      <h3 class="font-normal m-0" style="color: #979797">
        {{ t('textAddBeneficiaryUsaStepNote1') }}
        <span class="font-medium" style="color: #1b1b19"> {{ t('textAddBeneficiaryUsaStepNote2') }}</span>
        {{ t('textAddBeneficiaryUsaStepNote3') }}
      </h3>
    </div>

    <div class="flex justify-content-center">
      <Button
        v-if="!isShowRestFormIntermediary"
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
        v-if="isShowRestFormIntermediary"
        :label="t('send')"
        :loading="submitting"
        class="mb-4 mt-3 ml-2 w-8rem"
        iconPos="right"
        @click="sendData()"
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
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useWorld } from '../../../../composables/useWorld'
import { useNewBeneficiaryInternational } from '../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'
import Dropdown from 'primevue/dropdown'
import { useValidateFormInternational } from '../../../withdraw/fiat/usa/components/beneficiary/composable/useValidateFormInternational'
import { useBeneficiary } from '../../composables/useBeneficiary'
import { NewBeneficiary } from '../../../withdraw/type/beneficiary.type'
import { useRouter } from 'vue-router'

const { countryAllowedForUSA, loadingCountriesField, state_us } = useWorld()

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const { formObject, saveBeneficiary, submitting } = useNewBeneficiaryInternational()
const { validateIntermediaryBankForm } = useValidateFormInternational()
const { isShowRestFormIntermediary } = useBeneficiary()
const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    required: true,
    formObject: {
      type: Object as () => NewBeneficiary,
      required: true,
    },
  },
})

const sendData = () => {
  if (validateIntermediaryBankForm(formObject)) {
    saveBeneficiary()
  }
}

const handleIsShowRestForm = () => {
  isShowRestFormIntermediary.value = !props.data.isShowRestFormIntermediary
}

const hideRestForm = () => {
  isShowRestFormIntermediary.value = false
}

const goBack = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.card {
  margin: 0 auto;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}

.p-dropdown {
  border-radius: 5px !important;
  padding: 1px !important;
}

.font-line span {
  position: relative;
  background: white;
  padding-right: 8px;
}

.font-line::before {
  content: '';
  display: block;
  width: 55%;
  height: 1px;
  background-color: var(--primary-color);
  position: absolute;
  top: 650px;
}
</style>
