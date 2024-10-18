<template>
  <h3 class="mt-5 font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
  <div class="card col-12 md:col-12">
    <div class="flex">
      <div class="field col">
        <label>{{ t('bankName') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="(formObject.informationIntermediaryBank as BankingInternational).bankName" type="text" />
        </div>
      </div>
      <div class="field col">
        <label>{{ t('swiftCode') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="(formObject.informationIntermediaryBank as BankingInternational).swiftCode" type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.country"
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
          <InputText
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.city"
            type="text"
          />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-if="(formObject.informationIntermediaryBank as BankingInternational).address.country === 'US'"
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="custom-dropdown w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
          <InputText
            v-else
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.region"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.postalCode"
            type="text"
          />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('address') }}</label>
        <div class="p-inputgroup">
          <InputText
            v-model="(formObject.informationIntermediaryBank as BankingInternational).address.streetOne"
            type="text"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field mt-5 flex">
    <div class="col">
      <h3 class="font-normal m-0" style="color: #979797">
        {{ t('textAddBeneficiaryUsaStepNote1') }}
        <span class="font-medium" style="color: #1b1b19"> {{ t('textAddBeneficiaryUsaStepNote2') }}</span>
        {{ t('textAddBeneficiaryUsaStepNote3') }}
      </h3>
    </div>
    <div class="justify-content-end flex">
      <Button
        class="mb-4 mt-3 mr-2 w-8rem"
        outlined
        severity="secondary"
        style="color: #242731; display: flex; justify-content: center"
        @click="goBack"
        >{{ t('back') }}
      </Button>
      <Button
        :label="t('send')"
        :loading="submitting"
        class="mb-4 mt-3 mr-2 w-8rem"
        iconPos="right"
        @click="sendData()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useWorld } from '../../../../../../../composables/useWorld'
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'
import Dropdown from 'primevue/dropdown'
import { useValidateFormInternational } from '../composable/useValidateFormInternational'
import { useRouter } from 'vue-router'
import { BankingInternational } from '../../../../../type/beneficiary.type'

const { countryAllowedForUSA, loadingCountriesField, state_us } = useWorld()

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const { formObject, saveBeneficiary, submitting } = useNewBeneficiaryInternational()
const { validateIntermediaryBankForm } = useValidateFormInternational()
const router = useRouter()

const sendData = () => {
  if (validateIntermediaryBankForm(formObject)) {
    saveBeneficiary()
  }
}

const goBack = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
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
