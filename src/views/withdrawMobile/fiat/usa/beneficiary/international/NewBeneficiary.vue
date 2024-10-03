<template>
  <section class="section-main">
    <BackButtonMobile
      v-if="!isShowRestFormBankData || !isShowRestFormIntermediary || showsStepTwoFirstPart"
      :subtitle="t('typeWithdrawText')"
      :title="t('bankAccountHolder')"
    />
    <BackButtonStep v-else :subtitle="t('typeWithdrawText')" :title="t('bankAccountHolder')" @goBack="handleGoBack" />
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="col-12 m-auto">
        <Steps :key="itemStepsInternational.length" :model="itemStepsInternational" :readonly="false" />
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @complete="complete"
        @nextPage="nextPage($event)"
        @prevPage="prevPage($event)"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Steps from 'primevue/steps'
import { onMounted } from 'vue'
import { useWorld } from '../../../../../../composables/useWorld'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'
import { useItemSteps } from '../composables/useitemSteps'
import BackButtonStep from '../../../../components/BackButtonStep.vue'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'
import { useBeneficiary } from '../../../../composables/useBeneficiary'
import { useI18n } from 'vue-i18n'

const { formObject, complete, nextPage, prevPage } = useNewBeneficiaryInternational()
const { fetchCountries, fetchCountryAllowUsa } = useWorld()
const { itemStepsInternational } = useItemSteps()
const { t } = useI18n({ useScope: 'global' })
const { isShowRestFormIntermediary, isShowRestFormBankData, showsStepTwoFirstPart } = useBeneficiary()

onMounted(() => {
  fetchCountries()
  fetchCountryAllowUsa()
})

const handleGoBack = () => {
  isShowRestFormBankData.value = false
  showsStepTwoFirstPart.value = true
  isShowRestFormIntermediary.value = false
}
</script>

<style scoped></style>
