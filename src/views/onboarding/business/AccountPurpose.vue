<template>
  <section class="section-main">
    <div class="formgrid grid col-12">
      <div class="col-12">
        <p class="text-3xl mb-0 font-medium">{{ t('investmentProfile') }}</p>
        <Divider class="mt-0"></Divider>
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
                    v-model="onboardingCompany.investmentProfile[key]"
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
      </div>

      <div class="col-12">
        <div>
          <p class="text-3xl mt-0 font-medium">{{ t('profileKyc') }}</p>
          <Divider class="mt-0"></Divider>
        </div>

        <div class="grid col-12 mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
            <div>
              <label
                >{{ t('businessJurisdictions')
                }}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label
              >
              <div class="p-inputgroup">
                <MultiSelect
                  v-model="onboardingCompany.kycProfile.businessJurisdictions"
                  :options="countryAllowedForUSA"
                  optionLabel="name"
                  option-value="countryCode"
                  :loading="loadingCountriesField"
                  :placeholder="t('countryPlaceholder')"
                  class="w-full"
                  required
                />
              </div>
              <div>
                <span class="help-text">{{ t('countryPlaceholder') }}</span>
              </div>
            </div>
          </div>
          <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
            <div>
              <label
                >{{ t('fundsSendReceiveJurisdictions')
                }}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label
              >
              <div class="p-inputgroup">
                <MultiSelect
                  v-model="onboardingCompany.kycProfile.fundsSendReceiveJurisdictions"
                  :options="countryAllowedForUSA"
                  optionLabel="name"
                  option-value="countryCode"
                  :loading="loadingCountriesField"
                  :placeholder="t('countryPlaceholder')"
                  class="w-full"
                  required
                />
              </div>
              <div>
                <span class="help-text">{{ t('countryPlaceholder') }}</span>
              </div>
            </div>
          </div>
          <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
            <div>
              <label>{{ t('engageInActivities') }}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
              <div class="p-inputgroup">
                <MultiSelect
                  v-model="onboardingCompany.kycProfile.engageInActivities"
                  :options="engageInActivities"
                  optionLabel="name"
                  option-value="value"
                  filter
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
          <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4 mt-4">
            <div>
              <label>{{ t('regulatedStatus') }}<span class="bg-red" v-tooltip.top="'Mandatory'">*</span></label>
              <div class="p-inputgroup">
                <Dropdown
                  v-model="onboardingCompany.kycProfile.regulatedStatus"
                  :options="regulatedStatus"
                  optionLabel="name"
                  option-value="value"
                  filter
                  :placeholder="t('selectRegulatedStatus')"
                  class="w-full"
                  required
                />
              </div>
              <div>
                <span class="help-text">{{ t('selectRegulatedStatus') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'
import Dropdown from 'primevue/dropdown'
import { useWorld } from '../../../composables/useWorld';
import MultiSelect from 'primevue/multiselect';
import { useOptionsAccounts } from '../../../composables/useOptionsAccounts';
const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { onboardingCompany, saveData } = useOnboardingCompany()
const { investmentData, engageInActivities, regulatedStatus } = useOptionsAccounts()
const { countryAllowedForUSA, fetchCountryAllowUsa, fetchCountries, loadingCountriesField, countriesInputIsEmpty } =
  useWorld()

onMounted(async () => {
  await fetchCountries()
  await fetchCountryAllowUsa()
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

#phoneNumber {
  width: 97%;
}
</style>
../../../composables/useOptionsAccounts