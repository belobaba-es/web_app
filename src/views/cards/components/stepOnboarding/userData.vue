<template>
  <section class="card mt-4 pl-5 pr-5">
    <div class="grid">
      <div class="col-11">
        <h2 class="font-regular">{{ t('dataUser') }}</h2>
      </div>
      <div class="col mt-4">
        <Button icon="pi pi-pencil" label="editar" @click="buttonEdit" />
      </div>

      <div class="card-type-card p-0 m-0 pl-3 pr-3 primary-color">
        <p class="font-regular">{{ t('typeCardRequest') }}: {{ typeCardSelectString }}</p>
      </div>
    </div>

    <div class="grid mt-4">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('dni') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText :model-value="getDNI()" class="w-full" disabled required type="text" />
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('dataExpiredId') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputMask
            id="basic"
            v-model="onboardingCardDataClient.documentExpirationDate"
            :disabled="enableEdit"
            class="w-full"
            mask="9999-99-99"
            required
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('countryLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="onboardingCardDataClient.addressShipping.country"
            :options="countries"
            :placeholder="t('countryPlaceholder')"
            class="dropdown-full"
            disabled
            filter
            option-value="country_code"
            optionLabel="name"
            required
          />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('stateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText
            v-model="onboardingCardDataClient.addressShipping.region"
            :disabled="true"
            class="w-full"
            type="text"
          />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('nationality') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="onboardingCardDataClient.nationality"
            :disabled="enableEdit"
            :loading="loadingCountriesField"
            :options="countries"
            :placeholder="t('selectNationality')"
            class="dropdown-full"
            filter
            option-value="country_code"
            optionLabel="name"
            required
          />
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('dateBirth') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputMask
            id="basic"
            :model-value="getDateBirth()"
            class="w-full"
            disabled
            mask="9999-99-99"
            required
            slotChar="yyyy/mm/dd"
            type="text"
          />
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-5">
        <label>{{ t('divisorLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText
            v-model="onboardingCardDataClient.addressShipping.streetOne"
            :disabled="enableEdit"
            class="w-full"
            required
            type="text"
          />
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('numberDomicile') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="domicileNumber" :disabled="enableEdit" class="w-full" required type="text" />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <label>{{ t('typeDomicile') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="addressShippingDomicileNumber"
            :disabled="disableDomicileType"
            :options="domicileOptions"
            :placeholder="t('selectTypeDomicile')"
            class="dropdown-full"
            option-value="value"
            optionLabel="label"
            required
            @change="onChangeDomicileHandler(addressShippingDomicileNumber)"
          />
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <router-link v-slot="{ navigate }" custom to="/cards/onboarding/step/document-upload">
          <Button :label="t('nextButtonText')" :loading="submitting" class="px-5 mt-2 btn-submit" @click="saveData" />
        </router-link>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'
import { onMounted, ref, watch } from 'vue'
import { useOnboardingCard } from '../../composables/useOnboardingCard'
import InputMask from 'primevue/inputmask'
import { useOnboardingPersonal } from '../../../../composables/useOnboardingPersonal'

const { t } = useI18n({ useScope: 'global' })
const { countries, fetchCountries, loadingCountriesField } = useWorld()

const {
  submitting,
  typeCardSelectString,
  saveData,
  onboardingCardDataClient,
  buttonEdit,
  enableEdit,
  domicileNumber,
  domicileOptions,
  onChangeDomicileHandler,
} = useOnboardingCard()
const { getDNI, getDateBirth } = useOnboardingPersonal()

onMounted(async () => {
  if (countries.value.length === 0) await fetchCountries()
})

const addressShippingDomicileNumber = ref()

const disableDomicileType = ref(true)

watch(domicileNumber, newValue => {
  if (newValue.length > 0) {
    disableDomicileType.value = false
  } else {
    disableDomicileType.value = true
  }
})
</script>
<style lang="scss" scoped>
.card-type-card {
  background-color: #00beb0;
  color: #fff;
  border-radius: 0.3rem;

  p {
    font-size: 14px;
  }
}
</style>