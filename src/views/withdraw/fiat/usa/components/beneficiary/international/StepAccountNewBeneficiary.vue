<template>
  <h3 class="mt-5 font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
  <div class="card col-12 md:col-12">
    <div class="flex">
      <div class="field col">
        <label>{{ t('bankName') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.bankName" type="text" />
        </div>
      </div>

      <div v-if="!showInputIban" class="field col">
        <label v-if="formObject.informationBank.address.country === 'MX'">{{ t('Clabe') }}</label>
        <label v-else>{{ t('accountNumber') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.accountNumber" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('swiftCode') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="(formObject.informationBank as BankingInternational).swiftCode" type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div v-if="showInputIban" class="field col">
        <label>{{ t('iban') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="(formObject.informationBank as BankingInternational).iban" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.city" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-if="formObject.informationBank.address.country === 'US'"
            v-model="formObject.informationBank.address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="custom-dropdown w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
          <InputText v-else v-model="formObject.informationBank.address.region" type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.postalCode" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('address') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.streetOne" type="text" />
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
      <Button :label="t('next')" class="mb-4 mt-3 mr-2 w-8rem" iconPos="right" @click="nextStep()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useWorld } from '../../../../../../../composables/useWorld'
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'
import { useValidateFormInternational } from '../composable/useValidateFormInternational'
import { BankingInternational } from '../../../../../type/beneficiary.type'
import Dropdown from 'primevue/dropdown'
import { useRouter } from 'vue-router'
import { useListBeneficiaryUsa } from '../../../composable/useListBeneficiaryUsa'

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const { state_us } = useWorld()
const { formObject } = useNewBeneficiaryInternational()
const { validateAccountBeneficiaryForm } = useValidateFormInternational()
const router = useRouter()

const { showInputIban } = useListBeneficiaryUsa()

const nextStep = () => {
  if (validateAccountBeneficiaryForm(formObject.value)) {
    const page = 0
    emit('nextPage', {
      pageIndex: page,
    })
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
  border: 1px solid var(--primary-color);
  margin: 0 auto;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}
</style>
