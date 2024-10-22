<template>
  <BeneficiaryStep1
    :data="{
      formObject: formObject,
      isShowRestFormBankData: ref(false),
      domestic: false,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BeneficiaryStep1 from '../../../../components/Beneficiary/BeneficiaryStep1.vue'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'
import { useRouter } from 'vue-router'

const { formObject } = useNewBeneficiaryInternational()

const { clearFormFiatBeneficiary } = useNewBeneficiaryInternational()
const router = useRouter()

const isNewBeneficiary = router.currentRoute.value.path.includes('new-beneficiary')

if (isNewBeneficiary) {
  clearFormFiatBeneficiary()
}
</script>
