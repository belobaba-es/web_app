<template>
  <section class="section-main pt-6">
    <div class="formgrid grid col-12">
      <div class="grid col-12">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('nameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText
              v-model="onboardingPersonal.firstName"
              :value="onboardingPersonal.firstName"
              class="w-full"
              required
              type="text"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextName') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('secondNameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.middleName" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextMiddleName') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('surnameLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.lastName" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextSurname') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2">
          <label>{{ t('birthdateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputMask id="basic" v-model="onboardingPersonal.dateBirth" mask="9999-99-99" slotChar="yyyy/mm/dd" />
          </div>
        </div>

        <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 phone-input">
          <label>{{ t('phoneLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="field grid">
            <div class="col-2">
              <Dropdown
                v-model="onboardingPersonal.phoneCountry"
                :options="countries"
                class="w-full"
                filter
                option-value="calling_code"
                optionLabel="calling_code"
              />
            </div>
            <div class="col-10">
              <InputText id="phoneNumber" v-model="onboardingPersonal.phoneNumber" class="" required type="number" />
              <div>
                <span class="help-text">{{ t('helpTextPhone') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
          <label>{{ t('emailLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <!-- //FIX readonly -->
            <InputText v-model="onboardingPersonal.email" class="w-full" readonly required type="text" />
          </div>
        </div>

        <div class="flex flex-wrap gap-3 col-12 mb-5 mt-5 align-content-center">
          <label>{{ t('validDocument') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>

          <div class="flex justify-content-center">
            <div class="flex gap-3">
              <div v-for="data in typeDocument" :key="data.name" class="flex align-items-center">
                <RadioButton v-model="isHaveDocumentUS" :inputId="data.name" :value="data.key" name="dynamic" />
                <label :for="data.name" class="ml-2">{{ data.name }}</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isHaveDocumentUS" class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('docTypeLabelPassport') }}</label>
          <div class="p-inputgroup">
            <InputText
              v-model="onboardingPersonal.passport"
              v-tooltip.top="'not required'"
              class="w-full"
              required
              type="text"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextPassport') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('documentLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.dni" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextIdNumber') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('taxIdLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.taxId" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
          </div>
        </div>
      </div>

      <br />

      <div class="grid col-12">
        <p class="mt-4 mb-0 text-uppercase">{{ t('employmentInformation') }}</p>
        <Divider class="mt-0"></Divider>
        <div class="grid col-12 mt-2">
          <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
            <label>{{ t('employmentStatus') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="onboardingPersonal.employmentStatus"
                :options="employmentStatusList"
                :placeholder="t('employmentStatusPlaceholder')"
                class="w-full"
                filter
                option-value="value"
                optionLabel="name"
                required
              />
            </div>
            <div>
              <span class="help-text">{{ t('helpTextEmploymentStatus') }}</span>
            </div>
          </div>

          <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
            <label>{{ t('occupationLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
            <div class="p-inputgroup">
              <InputText v-model="onboardingPersonal.occupation" class="w-full" type="text" />
            </div>
            <div>
              <span class="help-text">{{ t('helpTextOccupation') }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('divisorLabel') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingPersonal.country"
              :loading="loadingCountriesField"
              :options="countries"
              :placeholder="t('countryPlaceholder')"
              class="w-full"
              filter
              option-value="country_code"
              optionLabel="name"
              required
              @change="changeCountryHandler"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div v-if="!showComboState" class="p-inputgroup">
            <InputText v-model="onboardingPersonal.region" class="w-full" type="text" />
          </div>
          <div v-if="showComboState" class="p-inputgroup">
            <div class="p-inputgroup">
              <Dropdown
                v-model="onboardingPersonal.region"
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
            <InputText v-model="onboardingPersonal.city" class="w-full" required type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.streetOne" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.streetTwo" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
          <div class="p-inputgroup">
            <InputText v-model="onboardingPersonal.postalCode" type="text" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <router-link v-slot="{ navigate }" custom to="/onboarding/personal/investment-data">
          <Button
            :label="t('nextButtonText')"
            :loading="submitting"
            class="px-5 mt-2 btn-submit"
            @click="saveData(navigate)"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import InputMask from 'primevue/inputmask'
import RadioButton from 'primevue/radiobutton'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'
import { useOnboardingPersonal } from '../../../composables/useOnboardingPersonal'
import { useEmployment } from '../../../composables/useEmployment'
import Button from 'primevue/button'

const { countries, fetchCountries, loadingCountriesField, onChangeCountryHandler, state_us } = useWorld()

const { employmentStatusList } = useEmployment()

const { onboardingPersonal, submitting, saveData, typeDocument, isHaveDocumentUS } = useOnboardingPersonal()
const { t } = useI18n({ useScope: 'global' })

const showComboState = ref<boolean>(false)

const changeCountryHandler = async (event: DropdownChangeEvent) => {
  onChangeCountryHandler(event, showComboState)
}

watch(
  () => onboardingPersonal.value.country,
  newValue => {
    showComboState.value = newValue === 'US'
  }
)

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
