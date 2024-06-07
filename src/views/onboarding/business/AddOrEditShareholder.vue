<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 mb-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('addNewShareHolder') }}</p>
      <p class="font-light mt-2 text-primary">{{ t('shareholderInformationLabel') }}</p>
    </div>

    <div class="formgrid grid col-12">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('nameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="partner.firstName" class="w-full" required type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('secondNameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="partner.middleName" class="w-full" required type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextMiddleName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('surnameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="partner.lastName" class="w-full" required type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
        <label>{{ t('birthdateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <div class="p-inputgroup">
            <InputMask v-model="dateBirth" mask="9999-99-99" slotChar="yyyy/mm/dd" />
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText v-model="partner.email" class="w-full" required type="text" />
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown v-model="partner.phoneCountry" :options="calling_code" class="w-full" />
          </div>
          <div class="col-8">
            <InputText id="phoneNumber" v-model="partner.phoneNumber" class="" required type="text" />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 col-12 mb-4 mt-4 align-content-center">
        <label>{{ t('validDocument') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>

        <div class="flex justify-content-center">
          <div class="flex gap-3">
            <div v-for="data in typeDocumentPartner" :key="data.name" class="flex align-items-center">
              <RadioButton v-model="isHaveDocumentUS" :inputId="data.name" :value="data.key" name="dynamic" />
              <label :for="data.name" class="ml-2">{{ data.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <div v-if="!isHaveDocumentUS" class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('docTypeLabelPassport') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.passport" v-tooltip.top="'not required'" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextPassport') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('documentLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.dni" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextIdNumber') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-5">
          <label>{{ t('taxIdLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.taxId" class="w-full" required type="text" />
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
          <label>{{ t('countryLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="partner.country"
              :loading="loadingCountriesField"
              :options="countries"
              :placeholder="t('countryPlaceholder')"
              class="w-full"
              filter
              option-value="country_code"
              optionLabel="name"
              required
              @change="onChangeCountryHandler"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div v-if="!showComboState" class="p-inputgroup">
            <InputText v-model="partner.region" class="w-full" type="text" />
          </div>
          <div v-if="showComboState" class="p-inputgroup">
            <div class="p-inputgroup">
              <Dropdown
                v-model="partner.region"
                :options="state_us"
                :placeholder="t('stateLabel')"
                class="w-full"
                filter
                option-value="state_code"
                optionLabel="name"
                required
              />
            </div>
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.city" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.streetOne" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="partner.streetTwo" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="partner.postalCode" type="text" />
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
            :label="t('cancel')"
            class="font-light w-100 border-300 p-button-outlined"
            type="button"
            @click="redirectToStep2"
          />
        </div>
        <div class="float-right w-25">
          <Button
            :label="t('addShareHolder')"
            :loading="submitting"
            class="px-5 mt-2 btn-submit"
            iconPos="right"
            @click="addNewShareholder()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'
import { useShareholder } from '../../../composables/useShareholder'
import { useRoute } from 'vue-router'
import RadioButton from 'primevue/radiobutton'
import InputMask from 'primevue/inputmask'

const { countries, fetchCountries, loadingCountriesField, calling_code } = useWorld()
const {
  partner,
  dateBirth,
  submitting,
  loadingDataToShareholder,
  addNewShareholder,
  redirectToStep2,
  typeDocumentPartner,
  showButtonForCancel,
  enableDataForCreateNewShareholder,
  isHaveDocumentUS,
} = useShareholder()

const { state_us, onChangeCountryHandler } = useWorld()

const route = useRoute()
const { t } = useI18n({ useScope: 'global' })

onMounted(async () => {
  dateBirth.value = partner.value.dateBirth
  console.log(partner.value)
  await fetchCountries()
  verifyRoute()
  watch(
    () => route.name,
    () => {
      verifyRoute()
    }
  )

  /////////////////// PALIATIVO PARA EL INPUTMASK
  watch(dateBirth, value => {
    console.log(value)
    partner.value.dateBirth = value
    console.log('partner.value.dateBirth', partner.value.dateBirth)
  })
  ///////////////////////////////////////////////
})

const showComboState = computed(() => {
  return partner.value.country === 'US'
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
