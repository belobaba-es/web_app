<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="col-8 m-auto">
        <Steps :key="itemSteps.length" :model="itemSteps" :readonly="false" />
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
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'
import { useWorld } from '../../../../../../../composables/useWorld'
import { useRouter } from 'vue-router'

const { itemSteps, formObject, complete, nextPage, prevPage } = useNewBeneficiaryInternational()
const { fetchCountries } = useWorld()
const { clearFormFiatBeneficiary: clearFormFiatBeneficiaryInternational } = useNewBeneficiaryInternational()

onMounted(() => {
  fetchCountries()
})

const router = useRouter()

const isNewBeneficiary = router.currentRoute.value.path.includes('new-beneficiary')

if (isNewBeneficiary) {
  clearFormFiatBeneficiaryInternational()
}
</script>

<style scoped></style>
