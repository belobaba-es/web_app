<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 mb-0 font-medium">{{ t('shareholdersAdded') }}</p>
      <p class="font-light mt-2 text-primary">{{ t('shareholderInformationLabel') }}</p>
    </div>

    <div class="mt-5 grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div
        v-for="(shareholder, idx) in getPartners()"
        class="p-3 border-1 border-gray-300 border-round-2xl h-25 mr-3 mt-3 col-6 sm:col-3 md:col-3"
        :key="idx"
      >
        <PartnerItem
          :last-name="shareholder.lastName"
          :first-name="shareholder.firstName"
          :email="shareholder.email"
          :dni="shareholder.dni"
        />
      </div>
      <div class="mt-2 lg:col-3 xl:col-3">
        <div
          class="border-1 pl-5 pr-5 pt-4 border-cyan-500 border-round-2xl flex-column bg-gray-100 cursor-pointer"
          @click="onCreateNewShareholder"
        >
          <img :src="UserAdd" class="mb-3" />
          <div class="pt-3">
            <p class="text-lg">{{ t('addNewShareHolder') }}</p>
          </div>
        </div>
      </div>

      <div class="field col-12 mt-5 flex align-items-center justify-content-end">
        <Button
          :label="t('continue')"
          class="px-5 mt-3 btn-submit"
          icon="pi pi-angle-right"
          iconPos="right"
          @click="nextStep3()"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'
import UserAdd from '../../../../assets/icons/user-add.svg'
import PartnerItem from './PartnerItem.vue'
import { useShareholder } from '../../../../composables/useShareholder'

const { t } = useI18n({ useScope: 'global' })

const { getPartners, nextStep3 } = useOnboardingCompany()
const { onCreateNewShareholder } = useShareholder()
</script>
<style lang="scss" scoped></style>
