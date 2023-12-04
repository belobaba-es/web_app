<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('uploadDocumentsTitle') }}</p>
    </div>

    <div class="grid">
      <DocumentsCompany :register-number="onboardingCompany.informationCompany.registerNumber" />

      <div class="p-panel p-component shareholders-panel col-6">
        <div class="p-panel-header">
          <span class="p-panel-title">{{ t('shareholderTitle') }}</span>
        </div>
        <div class="p-toggleable-content" role="region">
          <div class="p-panel-content">
            <div class="p-scrollpanel p-component custom" style="height: 434px">
              <div class="p-scrollpanel-wrapper">
                <div class="p-scrollpanel-content">
                  <div class="px-3 pt-3 pb-0" v-for="(shareholder, idx) in getPartners()" :key="idx">
                    <UploadDocumentNaturalCompany
                      :name="shareholder.firstName + shareholder.lastName"
                      :dni="shareholder.dni"
                      v-if="getAccountStatus()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="field mt-4 col-12 flex align-items-center justify-content-end">
      <Button
        :label="t('continue')"
        icon="pi pi-angle-right"
        iconPos="right"
        class="px-5 mt-2 btn-submit"
        @click="finish()"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

import UploadDocumentNaturalCompany from './UploadDocumentNaturalCompany.vue'
import { useAuth } from '../../../../composables/useAuth'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'
import DocumentsCompany from './DocumentsCompany.vue'

const { getAccountStatus } = useAuth()
const { getPartners } = useOnboardingCompany()

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const { onboardingCompany } = useOnboardingCompany()

const finish = () => {
  router.push('/onboarding/business/completed')
}
</script>

<style scoped></style>
