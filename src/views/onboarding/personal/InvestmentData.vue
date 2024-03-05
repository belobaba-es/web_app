<template>
  <section class="section-main pt-6">
    <div class="formgrid grid col-12">
      <div class="grid col-12 mt-2">
        <div
          v-for="(item, key) in investmentData"
          :key="item.label"
          class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4"
        >
          <div>
            <label>{{ item.label }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="onboardingPersonal[key]"
                :options="item.values"
                optionLabel="name"
                option-value="value"
                filter
                :placeholder="t('helpTextSelectAOption')"
                class="w-full"
                required
              />
            </div>
            <div>
              <span class="help-text">{{ t('helpTextSelectAOption') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p class="mt-4 mb-0 text-uppercase">{{ t('profileKyc') }}</p>
      <Divider class="mt-0"></Divider>
    </div>

    <div class="grid col-12 mt-2">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
        <div>
          <label>{{t('fundsSendReceiveJurisdictions')}}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <MultiSelect
              v-model="onboardingPersonal.fundsSendReceiveJurisdictions"
              :options="allowed_countries"
              optionLabel="name"
              option-value="country_code"
              :loading="loadingCountriesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="countriesInputIsEmpty"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
        <div>
          <label>{{t('engageInActivities')}}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <MultiSelect
              v-model="onboardingPersonal.engageInActivities"
              :options="engageInActivities"
              optionLabel="name"
              option-value="value"
              filter
              :loading="loadingCountriesField"
              :placeholder="t('engageInActivities')"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextEngageInActivities') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="field col-12 flex align-items-center justify-content-end">
      <Button
        :label="t('save')"
        class="px-5 mt-2 btn-submit"
        @click="saveDataAndNextUploadFIle()"
        :loading="submitting"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import InputMask from 'primevue/inputmask'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'
import { useOnboardingPersonal } from '../../../composables/useOnboardingPersonal'
import { useInvestment } from '../../../composables/useInvestment'

const { t } = useI18n({ useScope: 'global' })

const {
  allowed_countries,
  fetchCountries,
  loadingCountriesField,
  countriesInputIsEmpty,
  onChangeCountryHandler,
  calling_code,
} = useWorld()
const { investmentData, engageInActivities } = useInvestment()
const { onboardingPersonal, saveDataAndNextUploadFIle, submitting } = useOnboardingPersonal()

onMounted(async () => {
  await fetchCountries()
})
</script>

<style scoped></style>
