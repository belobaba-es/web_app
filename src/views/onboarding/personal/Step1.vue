<template>
  <section class="section-main pt-6">
    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('nameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
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
        <label>{{ t('secondNameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.middleName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextMiddleName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('surnameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingPersonal.lastName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('birthdateLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputMask id="basic" v-model="onboardingPersonal.dateBirth" mask="9999-99-99" slotChar="yyyy/mm/dd" />
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 phone-input">
        <label>{{ t('phoneLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="field grid">
          <div class="col-2">
            <Dropdown
              class="w-full"
              v-model="onboardingPersonal.phoneCountry"
              filter
              option-value="calling_code"
              optionLabel="calling_code"
              :options="countries"
            />
          </div>
          <div class="col-10">
            <InputText id="phoneNumber" type="number" class="" v-model="onboardingPersonal.phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
        <label>{{ t('emailLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="onboardingPersonal.email" class="w-full" readonly required />
        </div>
      </div>

      <div class="flex flex-wrap gap-3 col-12 mb-5 mt-5 align-content-center">
        <label>{{ t('validDocument') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>

        <div class="flex justify-content-center">
          <div class="flex gap-3">
            <div v-for="category in typeDocument" :key="category.key" class="flex align-items-center">
              <RadioButton
                v-model="onboardingPersonal.documentCountry"
                :inputId="category.key"
                name="dynamic"
                @change="documentCountry(category.key)"
                :value="category.key"
              />
              <label :for="category.key" class="ml-2">{{ category.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex" v-if="submitting">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4" v-if="disabledInput">
          <label>{{ t('docTypeLabelPassport') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.passport" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextPassport') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('documentLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.dni" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextIdNumber') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('taxIdLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.taxId" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
          </div>
        </div>
      </div>

      <br />

      <div class="col-12">
        <p class="mt-4 mb-0 text-uppercase">{{ t('divisorLabel') }}</p>
        <Divider class="mt-0"></Divider>
      </div>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingPersonal.country"
              :options="countries"
              optionLabel="name"
              option-value="country_code"
              filter
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
          <label>{{ t('stateLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.region" class="w-full" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.city" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.streetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingPersonal.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
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
import Divider from 'primevue/divider'
import InputMask from 'primevue/inputmask'
import RadioButton from 'primevue/radiobutton'

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

const { onboardingPersonal, saveData, typeDocument, disabledInput, documentCountry, submitting, saveDataAndNextPag } =
  useOnboardingPersonal()
const { t } = useI18n({ useScope: 'global' })

onMounted(async () => {
  await fetchCountries()
})
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.bg-red {
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