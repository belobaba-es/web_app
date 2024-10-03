<template>
  <BeneficiaryStep1
    :data="{
      formObject: formObjectDomestic,
      domestic: true,
    }"
  />
</template>

<script lang="ts" setup>
import BeneficiaryStep1 from '../../../../components/Beneficiary/BeneficiaryStep1.vue'
import { useNewBeneficiaryDomestic } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryDomestic'
import { useRouter } from 'vue-router'

const { formObjectDomestic, clearFormFiatBeneficiary } = useNewBeneficiaryDomestic()

const router = useRouter()

const isNewBeneficiary = router.currentRoute.value.path.includes('new-beneficiary')

if (isNewBeneficiary) {
  clearFormFiatBeneficiary()
}
</script>
