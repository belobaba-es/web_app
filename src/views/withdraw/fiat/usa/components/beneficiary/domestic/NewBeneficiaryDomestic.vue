<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="col-8 m-auto">
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
import { useNewBeneficiaryDomestic } from '../composable/useNewBeneficiaryDomestic'
import { useRouter } from 'vue-router'

const { itemStepsDomestic, formObjectDomestic, complete, nextPage, prevPage, clearFormFiatBeneficiary } =
  useNewBeneficiaryDomestic()

const router = useRouter()

const isNewBeneficiary = router.currentRoute.value.path.includes('new-beneficiary')

if (isNewBeneficiary) {
  clearFormFiatBeneficiary()
}
</script>

<style scoped></style>
