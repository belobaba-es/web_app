<template>
  <BeneficiaryStep2
    :data="{
      formObject: formObject,
      isShowRestFormBankData: ref(false),
      domestic: true,
      accountType: accountType,
      loading: submitting,
    }"
    @saveBeneficiary="activateModal"
  />

  <ModalStep />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BeneficiaryStep2 from '../../../../components/Beneficiary/BeneficiaryStep2.vue'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'
import { useValidateFormInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useValidateFormInternational'
import ModalStep from '../../../../../withdraw/fiat/usa/components/beneficiary/components/modalStep.vue'

const { accountType, formObject, submitting } = useNewBeneficiaryInternational()
const { modalStepActivation } = useNewBeneficiaryInternational()
const { validateDataBeneficiaryForm } = useValidateFormInternational()

const activateModal = () => {
  if (validateDataBeneficiaryForm(formObject.value)) {
    modalStepActivation.value = true
  }
}
</script>
