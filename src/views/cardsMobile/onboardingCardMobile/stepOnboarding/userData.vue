<template>
  <section class="card mt-4 pl-md-5 pr-md-5 pl-4 pr-4">
    <div class="grid">
      <div class="col-11">
        <h2 class="font-regular">{{ t('dataUser') }}</h2>
      </div>
   
      <div class="col-12 flex justify-content-between flex-wrap px-0">
        <div class="card-type-card p-0 m-0 pl-3 pr-3 primary-color">
          <p class="font-regular my-2 mt-md-3 mb-md-3">{{ t('typeCardRequest') }}: {{ typeCardSelectString }}</p>
        </div>
      </div>
    </div>

    <div v-if="!isShowRestOfForm" class="mt-3">
      <div class="grid mt-4">
        <div class="field col-6">
          <label>{{ t('dni') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText :model-value="getDNI()" class="w-full" disabled required type="text" />
          </div>
        </div>
        <div class="field col-6">
          <label>{{ t('dataExpiredId') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputMask
              id="basic"
              v-model="onboardingCardDataClient.documentExpirationDate"
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
    </div>

    <div class="mt-3">
      <div v-if="isShowRestOfForm">
        <div class="field col-8 sm:col-8 md:col-12 lg:col-2 xl:col-2 p-0">
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
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-5 p-0">
          <label>{{ t('divisorLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText
              v-model="onboardingCardDataClient.addressShipping.streetOne"
              class="w-full"
              required
              type="text"
            />
          </div>
        </div>

        <div class="grid">
          <div class="field col-12">
            <label>{{ t('numberDomicile') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
            <div class="p-inputgroup">
              <InputText v-model="domicileNumber" required type="text" />
            </div>
          </div>
          <div class="field col-8">
            <label>{{ t('typeDomicile') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
            <div class="p-inputgroup">
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="item in domicileOptions"
                  :class="{ 'hover-domicile': !disableDomicileType }"
                  class="flex items-center border-1"
                  style="border-color: #ececec; padding: 0.5rem"
                  @click="() => onChangeDomicileHandler(addressShippingDomicileNumber)"
                >
                  <label :for="item.label" class="mr-2">{{ item.label }}</label>
                  <RadioButton
                    v-model="addressShippingDomicileNumber"
                    :disabled="disableDomicileType"
                    :inputId="item.label"
                    :name="item.label"
                    :value="item.value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-center">
        <Button
          :label="t('cancel')"
          class="px-5 mt-2 btn-submit mr-2"
          outlined
          severity="secondary"
          @click="() => router.push('/cards/onboarding')"
        />
        <div v-if="isShowRestOfForm" class="ml-2">
          <router-link v-slot="{ navigate }" custom to="/cards/onboarding/step/document-upload">
            <Button
              :label="t('nextButtonText')"
              :loading="submitting"
              class="px-5 mt-2 btn-submit ml-2"
              @click="saveData"
            />
          </router-link>
        </div>
        <div v-else>
          <Button
            :label="t('next')"
            :loading="submitting"
            class="px-5 mt-2 btn-submit ml-2"
            icon="pi pi-angle-right"
            icon-pos="right"
            @click="handleShowRestOfForm"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'
import { onMounted, ref, watch } from 'vue'
import InputMask from 'primevue/inputmask'
import { useOnboardingPersonal } from '../../../../composables/useOnboardingPersonal'
import { useOnboardingCard } from '../../../cards/composables/useOnboardingCard'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })
const { countries, fetchCountries, loadingCountriesField } = useWorld()
const isShowRestOfForm = ref(false)
const router = useRouter()

const {
  submitting,
  typeCardSelectString,
  saveData,
  onboardingCardDataClient,
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

const handleShowRestOfForm = () => {
  if (
    onboardingCardDataClient.value.addressShipping.country !== '' &&
    onboardingCardDataClient.value.addressShipping.region !== '' &&
    onboardingCardDataClient.value.nationality !== ''
  ) {
    isShowRestOfForm.value = true
  }
}
</script>
<style lang="scss">
.card-type-card {
  background-color: var(--primary-color);
  color: #000;
  border-radius: 0.3rem;

  p {
    font-size: 14px;
  }
}

.p-radiobutton .p-radiobutton-box:hover {
  border-color: #00beb0 !important;
}

.hover-domicile:hover {
  border-color: #00beb0 !important;
}
</style>
