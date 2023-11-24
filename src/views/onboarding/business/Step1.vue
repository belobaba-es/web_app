<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('businessNameLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.name" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.email" class="w-full" readonly required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelDocumentCompany') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.informationCompany.registerNumber"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyTax') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelNaics') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.naics" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaics') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelnaicsDescription') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.informationCompany.naicsDescription"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaicsDescription') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelEstablishedDate') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <Calendar
            v-model="onboardingCompany.informationCompany.establishedDate"
            placeholder="0000/00/00"
            dateFormat="yy-mm-dd"
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextEstablishedDate') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('labelWebsite') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.webSite" class="w-full" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextWebsite') }}</span>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown
              class="w-full"
              v-model="onboardingCompany.informationCompany.phoneCountry"
              :options="calling_code"
            />
          </div>
          <div class="col-8">
            <InputText
              id="phoneNumber"
              type="text"
              class=""
              v-model="onboardingCompany.informationCompany.phoneNumber"
              required
            />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressRegistration') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.registeredAddress.country"
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
          <label>{{ t('stateLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.region"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.city"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.streetOne"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.registeredAddress.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.postalCode"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="flex w-100 justify-content-between align-items-center mt-2">
        <div>
          <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressFisical') }}</p>
        </div>
        <div class="field-checkbox mt-2">
          <Checkbox
            inputId="patriot"
            v-model="isFisicalAdress"
            @change="physicalAddressIsSameRegisteredAddress(isFisicalAdress)"
            :binary="true"
          />
          <label for="patriot">{{ t('duplicateCompanyPhysicalAddress') }}</label>
        </div>
      </div>

      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.physicalAddress.country"
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
          <label>{{ t('stateLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.physicalAddress.region"
              class="w-full"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.physicalAddress.city"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.streetOne" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span class="bg-red" v-tooltip.top="'Required information'">*</span></label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.postalCode" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="field mt-4 col-12 flex align-items-center justify-content-end">
        <Button
          :label="t('continue')"
          icon="pi pi-angle-right"
          iconPos="right"
          class="px-5 mt-2 btn-submit"
          @click="nextStep2()"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../composables/useWorld'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'

const { countries, fetchCountries, loadingCountriesField, countriesInputIsEmpty, calling_code } = useWorld()
const { onboardingCompany, physicalAddressIsSameRegisteredAddress, nextStep2 } = useOnboardingCompany()

const { t } = useI18n({ useScope: 'global' })

const isFisicalAdress = ref<boolean>(false)

onMounted(async () => {
  await fetchCountries()
})
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}
.bg-red{
  color: red;
  font-weight: bold;
}
#phoneNumber {
  width: 97%;
}
</style>
