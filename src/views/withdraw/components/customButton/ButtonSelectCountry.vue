<template>
  <div class="card col p-2 dropDownCountry border" style="margin: 0 auto" @click="toggleDropdown">
    <div class="flex justify-content-between align-items-center">
      <div class="flex col-10">
        <div class="mr-2">
          <img alt="" src="../../../../assets/icons/bank_wire.svg" />
        </div>

        <div>
          <h3 class="font-medium m-1">{{ t('withdrawalSWIFT') }}</h3>
          <div class="flex">
            <div
              class="card pl-3 pr-3 m-0 mr-3"
              style="
                background: var(--primary-color);
                color: #1b1b19 !important;
                padding: 0.25rem 1rem !important;
                line-height: 14px;
                height: 1.8rem;
              "
            >
              {{ t('available') }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-2 md:col-2">
        <i class="pi pi-angle-down text-2xl" />
      </div>
    </div>
    <ul v-if="dropdownVisible" class="country-list">
      <p class="text-center font-medium" style="color: #979797; font-size: 13px">{{ t('selectCountryButton') }}</p>
      <li
        v-for="country in countryAllowedForUSA"
        :key="country.countryCode"
        class="font-medium"
        @click.stop="selectCountry(country)"
      >
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWorld } from '../../../../composables/useWorld'
import { useI18n } from 'vue-i18n'
import router from '../../../../router/router'
import { useListBeneficiaryUsa } from '../../fiat/usa/composable/useListBeneficiaryUsa'
import { CountryAllowed } from '../../../../interface/country.interface'
import { useNewBeneficiaryInternational } from '../../fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'

const { t } = useI18n({ useScope: 'global' })
const dropdownVisible = ref(false)
const { countryAllowedForUSA } = useWorld()
const { formObject } = useNewBeneficiaryInternational()
const { validateShowInputIban } = useListBeneficiaryUsa()
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const selectCountry = (country: CountryAllowed) => {
  formObject.value.informationBank.address.country = country.countryCode
  validateShowInputIban(country.counterpartyType)
  router.push(`/withdraw/fiat/usa/swift/new-beneficiary`)
  dropdownVisible.value = false
}

const handleClick = (e: MouseEvent) => {
  if (e.target && e.target instanceof HTMLElement) {
    if (!e.target.closest('.dropDownCountry')) {
      dropdownVisible.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

.country-list {
  position: absolute;
  padding-left: 14px;
  padding-right: 14px;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  background: white;
  max-height: 224px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  list-style: none;
  margin: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) #f0f0f0;
}

.country-list li {
  padding: 0.5rem;
  cursor: pointer;
  font-size: 13px;
}

.country-list li:hover {
  background: var(--secondary-color);
}
</style>
