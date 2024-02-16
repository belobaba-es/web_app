<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 mb-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('addNewShareHolder') }}</p>
      <p class="font-light mt-2 text-primary">{{ t('shareholderInformationLabel') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('nameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="partner.firstName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('secondNameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="partner.middleName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextMiddleName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('surnameLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="partner.lastName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('birthdateLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <Calendar v-model="partner.dateBirth" placeholder="0000/00/00" dateFormat="yyyy/mm/dd" :manualInput="false" />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="partner.email" class="w-full" required />
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown class="w-full" v-model="partner.phoneCountry" :options="calling_code" />
          </div>
          <div class="col-8">
            <InputText id="phoneNumber" type="text" class="" v-model="partner.phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 col-12 mb-4 mt-4 align-content-center">
        <label>{{ t('validDocument') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>

        <div class="flex justify-content-center">
          <div class="flex gap-3">
            <div v-for="data in typeDocumentPartner" :key="data.name" class="flex align-items-center">
              <RadioButton v-model="isHaveDocumentUS" :inputId="data.name" name="dynamic" :value="data.key" />
              <label :for="data.name" class="ml-2">{{ data.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4" v-if="!isHaveDocumentUS">
          <label>{{ t('docTypeLabelPassport') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-tooltip.top="'not required'" v-model="partner.passport" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextPassport') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('documentLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.dni" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextIdNumber') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-5">
          <label>{{ t('taxIdLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.taxId" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
          </div>
        </div>
      </div>
      <div class="col-12"></div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('divisorLabel') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="partner.country"
              :options="countries"
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

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.region" class="w-full" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.city" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.streetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="partner.postalCode" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }} </span>
          </div>
        </div>
      </div>

      <div class="field col-12 container-flex mt-5">
        <div class="float-left w-25">
          <Button
            v-show="showButtonForCancel()"
            type="button"
            :label="t('cancel')"
            class="font-light w-100 border-300 p-button-outlined"
            @click="redirectToStep2"
          />
        </div>
        <div class="float-right w-25">
          <Button
            :label="t('addShareHolder')"
            class="px-5 mt-2 btn-submit"
            iconPos="right"
            :loading="submitting"
            @click="addNewShareholder()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'
import { useShareholder } from '../../../composables/useShareholder'
import { useRoute } from 'vue-router'
import RadioButton from 'primevue/radiobutton'
import { useDocuments } from '../../../composables/useDocuments'

const { countries, fetchCountries, loadingCountriesField, countriesInputIsEmpty, calling_code } = useWorld()
const {
  partner,
  submitting,
  loadingDataToShareholder,
  addNewShareholder,
  redirectToStep2,
  typeDocumentPartner,
  showButtonForCancel,
  enableDataForCreateNewShareholder,
} = useShareholder()

const { isHaveDocumentUS } = useDocuments()
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })

onMounted(async () => {
  await fetchCountries()
  verifyRoute()
  watch(
    () => route.name,
    () => {
      verifyRoute()
    }
  )
})

const verifyRoute = () => {
  if (route.name === undefined) return
  if (route.name === 'new-shareholder') enableDataForCreateNewShareholder()
  else if (route.name === 'edit-shareholder') loadingDataToShareholder(route.params.dni)
}
</script>
<style lang="scss">
.bg-red {
  color: red;
  font-weight: bold;
}
</style>