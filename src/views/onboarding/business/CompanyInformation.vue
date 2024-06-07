<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('businessNameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="onboardingCompany.informationCompany.name" class="w-full" required type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="onboardingCompany.email" class="w-full" readonly required type="text" />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelDocumentCompany') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText
            v-model="onboardingCompany.informationCompany.registerNumber"
            class="w-full"
            required
            type="text"
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyTax') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('companyType') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="onboardingCompany.informationCompany.companyType"
            :options="companyType"
            :placeholder="t('helpTextSelectAOption')"
            class="w-full"
            filter
            option-value="value"
            optionLabel="name"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyType') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelNaics') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="onboardingCompany.informationCompany.naics" class="w-full" required type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaics') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelnaicsDescription') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText
            v-model="onboardingCompany.informationCompany.naicsDescription"
            class="w-full"
            required
            type="text"
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaicsDescription') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelEstablishedDate') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputMask
            v-model="onboardingCompany.informationCompany.establishedDate"
            mask="9999-99-99"
            slotChar="yyyy/mm/dd"
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextEstablishedDate') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('labelWebsite') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <InputText v-model="onboardingCompany.informationCompany.webSite" class="w-full" type="text" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextWebsite') }}</span>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown
              v-model="onboardingCompany.informationCompany.phoneCountry"
              :options="countries"
              class="w-full"
              filter
              option-value="calling_code"
              optionLabel="calling_code"
            />
          </div>
          <div class="col-8">
            <InputText
              id="phoneNumber"
              v-model="onboardingCompany.informationCompany.phoneNumber"
              class=""
              required
              type="text"
            />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 mt-3">
        <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressRegistration') }}</p>
      </div>

      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.registeredAddress.country"
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
          <div v-if="!showCombo" class="p-inputgroup">
            <InputText
              v-model="onboardingCompany.informationCompany.registeredAddress.region"
              class="w-full"
              required
              type="text"
            />
          </div>
          <div v-if="showCombo" class="p-inputgroup">
            <div class="p-inputgroup">
              <Dropdown
                v-model="onboardingCompany.informationCompany.registeredAddress.region"
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
            <InputText
              v-model="onboardingCompany.informationCompany.registeredAddress.city"
              class="w-full"
              required
              type="text"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText
              v-model="onboardingCompany.informationCompany.registeredAddress.streetOne"
              required
              type="text"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingCompany.informationCompany.registeredAddress.streetTwo" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText
              v-model="onboardingCompany.informationCompany.registeredAddress.postalCode"
              required
              type="text"
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
          <Checkbox v-model="isFisicalAdress" :binary="true" inputId="patriot" @change="copyPhysicalAddress" />
          <label for="patriot">{{ t('duplicateCompanyPhysicalAddress') }}</label>
        </div>
      </div>

      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.physicalAddress.country"
              :loading="loadingCountriesField"
              :options="countries"
              :placeholder="t('countryPlaceholder')"
              class="w-full"
              option-value="country_code"
              optionLabel="name"
              required
              @change="onChangeCountryHandlerPhysicalAddress"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div v-if="!showComboPhysicalAddress" class="p-inputgroup">
            <InputText
              v-model="onboardingCompany.informationCompany.physicalAddress.region"
              class="w-full"
              type="text"
            />
          </div>
          <div v-if="showComboPhysicalAddress" class="p-inputgroup">
            <div class="p-inputgroup">
              <Dropdown
                v-model="onboardingCompany.informationCompany.physicalAddress.region"
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
            <InputText
              v-model="onboardingCompany.informationCompany.physicalAddress.city"
              class="w-full"
              required
              type="text"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingCompany.informationCompany.physicalAddress.streetOne" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingCompany.informationCompany.physicalAddress.streetTwo" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingCompany.informationCompany.physicalAddress.postalCode" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="field mt-4 col-12 flex align-items-center justify-content-end">
        <Button
          :label="t('continue')"
          class="px-5 mt-2 btn-submit"
          icon="pi pi-angle-right"
          iconPos="right"
          @click="nextStep2()"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../composables/useWorld'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'
import InputMask from 'primevue/inputmask'
import { useOptionsAccounts } from '../../../composables/useOptionsAccounts'

const { countries, fetchCountries, loadingCountriesField } = useWorld()
const { onboardingCompany, physicalAddressIsSameRegisteredAddress, nextStep2 } = useOnboardingCompany()
const { companyType } = useOptionsAccounts()

const { t } = useI18n({ useScope: 'global' })

const { state_us, showCombo, onChangeCountryHandler } = useWorld()

const isFisicalAdress = ref<boolean>(false)

const showComboPhysicalAddress = ref<boolean>(false)

const onChangeCountryHandlerPhysicalAddress = (event: DropdownChangeEvent) => {
  showComboPhysicalAddress.value =
    event.value == 'US' || onboardingCompany.value.informationCompany.physicalAddress.country == 'US'
}

const copyPhysicalAddress = () => {
  physicalAddressIsSameRegisteredAddress(isFisicalAdress.value)

  showComboPhysicalAddress.value = onboardingCompany.value.informationCompany.physicalAddress.country == 'US'
}

// const showComboState = computed(() => {
//   return onboardingCompany.value.informationCompany.registeredAddress.country === 'US'
// })

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

.bg-red {
  color: red;
  font-weight: bold;
}

#phoneNumber {
  width: 97%;
}
</style>
../../../composables/useOptionsAccounts
