<template>
  <BeneficiaryStep2
    :data="{
      formObject: formObjectDomestic,
      selectedCountry: formObjectDomestic.informationBank.address.country,
      isShowRestFormBankData: ref(false),
      domestic: true,
      accountType: accountType,
      loading: submitting,
    }"
    @saveBeneficiary="sendData"
  />
  <Dialog
    v-model:visible="visibleModal"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :header="t('withdraw') + ' ' + t('fiat')"
    :show-header="false"
    :style="{ width: '25rem' }"
    modal
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
    <div class="text-center">
      <h1 class="font-medium" style="line-height: 1; color: var(--primary-color)">{{ t('modalCreateBeneficiary') }}</h1>
      <p>{{ t('modalCreateBeneficiary2') }}</p>
      <Button :loading="submitting" class="col-12 p-3" label="OK" @click="redirectButton()" />
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import BeneficiaryStep2 from '../../../../components/Beneficiary/BeneficiaryStep2.vue'
import { useNewBeneficiaryDomestic } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryDomestic'
import { useValidateFormDomestic } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useValidateFromDomestic'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import router from '../../../../../../router/router'
import { NetworkBank, TypeBankDetails } from '../../../../../withdraw/enums/beneficiary.enum'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const { formObjectDomestic, saveBeneficiaryDomestic, visibleModal, submitting, accountType } =
  useNewBeneficiaryDomestic()
const { validateDomesticBeneficiaryForm } = useValidateFormDomestic()

const Route = useRoute()

const sendData = () => {
  if (validateDomesticBeneficiaryForm(formObjectDomestic.value)) {
    formObjectDomestic.value.informationBank.typeBeneficiaryBankWithdrawal = TypeBankDetails.NATIONAL
    console.log(Route.path.includes('ACH'))
    formObjectDomestic.value.informationBank.networkBank = Route.path.includes('ACH')
      ? NetworkBank.ACH
      : NetworkBank.WIRE
    saveBeneficiaryDomestic()
  }
}

const close = () => {
  visibleModal.value = false
}

const redirectButton = () => {
  visibleModal.value = false
  router.push('/withdraw/fiat/usa')
}
</script>
