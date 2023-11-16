<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-6">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary"> {{ t('fiat') }} </span>
      </p>

      <div class="flex align-items-center">
        <router-link to="/withdraw">
          <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
        </router-link>
        <span class="text-xl" v-if="typeBeneficiary === 'DOMESTIC'">
          {{ t('domesticWire') }}
        </span>
        <span class="text-xl" v-else>
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
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="complete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Steps from 'primevue/steps'
import { useNewOrEditBeneficiary } from './composable/useNewOrEditBeneficiary'
import { useWorld } from '../../../composables/useWorld'

const { t } = useI18n({ useScope: 'global' })

const { itemSteps, typeBeneficiary, formObject, complete, nextPage, prevPage } = useNewOrEditBeneficiary()
const { fetchCountries } = useWorld()

fetchCountries()
</script>

<style scoped></style>
