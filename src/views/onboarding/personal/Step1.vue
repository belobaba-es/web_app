<template>
  <section class="section-main pt-6">
    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('nameLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingPersonal.firstName"
            :value="onboardingPersonal.firstName"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('secondNameLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.middleName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextMiddleName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('surnameLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.lastName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('birthdateLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <Calendar v-model="onboardingPersonal.dateBirth" placeholder="0000/00/00" dateFormat="yy-mm-dd" />
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 phone-input">
        <label>{{ t('phoneLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="field grid">
          <div class="col-2">
            <Dropdown class="w-full" v-model="onboardingPersonal.phoneCountry" :options="calling_code" />
          </div>
          <div class="col-10">
            <InputText id="phoneNumber" type="text" class="" v-model="onboardingPersonal.phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
        <label>{{ t('emailLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="onboardingPersonal.email" class="w-full" readonly required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('docTypeLabelPassport') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-tooltip.top="'not required'" v-model="onboardingPersonal.passport" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextPassport') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('documentLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.dni" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextIdNumber') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('taxIdLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.taxId" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
        </div>
      </div>

      <br />

      <p class="mt-4 mb-0 text-uppercase">{{ t('divisorLabel') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingPersonal.country"
              :options="countries"
              optionLabel="name"
              option-value="country_code"
              :loading="loadingCountriesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="countriesInputIsEmpty"
              class="w-full"
              @change="onChangeCountryHandler"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.region" class="w-full" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.city" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.streetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.postalCode" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveDataAndNextPag()" :loading="submitting" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'
import { useOnboardingPersonal } from '../../../composables/useOnboardingPersonal'

const {
  countries,
  fetchCountries,
  loadingCountriesField,
  countriesInputIsEmpty,
  onChangeCountryHandler,
  calling_code,
} = useWorld()

const { onboardingPersonal, saveData, submitting, saveDataAndNextPag } = useOnboardingPersonal()
const { t } = useI18n({ useScope: 'global' })

onMounted(async () => {
  await fetchCountries()
})
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}
.bg-red{
  color: red;
  font-weight: bold;
}
.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}

#phoneNumber {
  width: 97%;
}
</style>