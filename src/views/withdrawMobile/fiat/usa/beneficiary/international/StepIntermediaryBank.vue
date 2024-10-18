<template>
  <BeneficiaryStep3
    :data="{
      formObject: formObject,
      isShowRestFormBankData: ref(false),
      domestic: true,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BeneficiaryStep3 from '../../../../components/Beneficiary/BeneficiaryStep3.vue'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'

const { formObject } = useNewBeneficiaryInternational()
</script>
