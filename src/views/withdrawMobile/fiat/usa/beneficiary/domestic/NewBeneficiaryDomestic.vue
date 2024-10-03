<template>
  <section class="section-main">
    <BackButtonMobile
      v-if="!isShowRestFormBankData"
      :subtitle="t('typeWithdrawText')"
      :title="t('bankAccountHolder')"
    />
    <BackButtonStep v-else :subtitle="t('typeWithdrawText')" :title="t('bankAccountHolder')" @goBack="handleGoBack" />
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="col-8 mx-auto mb-4">
        <Steps :key="itemStepsDomestic.length" :model="itemStepsDomestic" :readonly="false" />
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObjectDomestic"
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
import { useNewBeneficiaryDomestic } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryDomestic'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'
import BackButtonStep from '../../../../components/BackButtonStep.vue'
import { useI18n } from 'vue-i18n'
import { useBeneficiary } from '../../../../composables/useBeneficiary'

const { itemStepsDomestic, formObjectDomestic, complete, nextPage, prevPage } = useNewBeneficiaryDomestic()
const { fetchCountries, fetchCountryAllowUsa } = useWorld()
const { isShowRestFormBankData, showsStepTwoFirstPart } = useBeneficiary()
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  fetchCountries()
  fetchCountryAllowUsa()
})

const handleGoBack = () => {
  isShowRestFormBankData.value = false
  showsStepTwoFirstPart.value = true
}
</script>

<style scoped></style>
