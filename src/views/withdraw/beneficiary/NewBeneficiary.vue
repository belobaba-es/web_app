<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-6">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary"> {{ t('fiat') }} </span>
      </p>

      <div class="flex align-items-center">
        <router-link to="/withdraw">
          <Button class="p-button-text" icon="pi pi-angle-left" iconPos="left" label="" />
        </router-link>
        <span v-if="typeBeneficiary.toUpperCase() === 'DOMESTIC'" class="text-xl">
          {{ t('domesticWire') }}
        </span>
        <span v-else-if="typeBeneficiary.toUpperCase() === 'INTERNATIONAL'" class="text-xl">
          {{ t('internationalWire') }}
        </span>
      </div>

      <div class="flex align-items-center">
        <div class="mt-1 col-12">
          <h3 class="font-medium">{{ t('addBeneficiaries') }}</h3>
        </div>
      </div>

      <Steps :model="itemSteps" :readonly="false" />
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
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Steps from 'primevue/steps'
import { useNewOrEditBeneficiary } from './composable/useNewOrEditBeneficiary'
import { useWorld } from '../../../composables/useWorld'
import { onMounted } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const { itemSteps, typeBeneficiary, formObject, complete, nextPage, prevPage } = useNewOrEditBeneficiary()
const { fetchCountries, fetchCountryAllowUsa } = useWorld()

onMounted(() => {
  fetchCountries()
  fetchCountryAllowUsa()
})
</script>

<style scoped></style>
