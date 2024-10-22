<template>
  <h3 class="mt-5 font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
  <div class="card col-12 md:col-12">
    <div class="flex">
      <div class="field col">
        <label>{{ t('bankNameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationBank.bankName" type="text" />
        </div>
      </div>
      <div class="field col">
        <label>{{ t('accountNumber') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationBank.accountNumber" type="text" />
        </div>
      </div>
      <div class="field col">
        <label v-if="$route.path.includes('ACH')">{{ t('abaAch') }}</label>
        <label v-else>{{ t('abaFed') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="(formObjectDomestic.informationBank as BankingDomestic).routingNumber" type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="col">
        <h3 class="font-medium">
          <span style="">
            {{ t('bankAddress') }}
          </span>
        </h3>
      </div>
      <div class="col-10 pl-0">
        <div class="font-line"></div>
      </div>
    </div>

    <div class="flex">
      <div class="field col">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectDomestic.informationBank.address.country"
            :disabled="disableCountry()"
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
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectDomestic.informationBank.address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationBank.address.city" class="w-full" required type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationBank.address.postalCode" type="text" />
        </div>
      </div>
      <div class="field col">
        <label
          >{{ t('address') }} <small class="pl-2">{{ t('smallAddressBeneficiary') }}</small></label
        >
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationBank.address.streetOne" type="text" />
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
      <Button :label="t('next')" class="mb-4 mt-3 mr-2 w-8rem" iconPos="right" @click="handleNextPage()" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../../../../composables/useWorld'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { useNewBeneficiaryDomestic } from '../composable/useNewBeneficiaryDomestic'
import { useValidateFormDomestic } from '../composable/useValidateFromDomestic'
import { useRoute, useRouter } from 'vue-router'
import { NetworkBank } from '../../../../../enums/beneficiary.enum'
import { BankingDomestic } from '../../../../../type/beneficiary.type'

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const showCombo = ref<boolean>(false)

const route = useRoute()
const { formObjectDomestic } = useNewBeneficiaryDomestic()
const { validateDomesticBankForm } = useValidateFormDomestic()

const { countryAllowedForUSA, state_us, loadingCountriesField } = useWorld()

formObjectDomestic.value.informationBank.address.country = 'US'

const handleNextPage = () => {
  formObjectDomestic.value.informationBank.networkBank =
    route.path === '/withdraw/fiat/usa/ACH' ? NetworkBank.ACH : NetworkBank.WIRE

  if (validateDomesticBankForm(formObjectDomestic.value)) {
    emit('nextPage', { pageIndex: 0 })
  }
}

const disableCountry = () => {
  if (formObjectDomestic.value.informationBank.address.country === 'US') {
    showCombo.value = true
    return true
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

.font-line {
  border-bottom: 1px solid var(--primary-color);
  height: 27px;
}
</style>
