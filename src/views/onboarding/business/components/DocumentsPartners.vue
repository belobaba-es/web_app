<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('uploadDocumentsTitle') }}</p>
    </div>

    <div class="grid">
      <DocumentsCompany
        :register-number="onboardingCompany.informationCompany.registerNumber"
        @companyDocumentUploaded="updateDocumentCompanyIsValid"
      />

      <div class="p-panel p-component shareholders-panel col-6">
        <div class="p-panel-header">
          <span class="p-panel-title">{{ t('shareholderTitle') }}</span>
        </div>
        <div class="p-toggleable-content" role="region">
          <div class="p-panel-content">
            <div class="p-scrollpanel p-component custom" style="min-height: 564px">
              <div class="p-scrollpanel-wrapper">
                <div class="p-scrollpanel-content">
                  <div v-for="(shareholder, idx) in getPartners()" :key="idx" class="px-3 pt-3 pb-0">
                    <UploadDocumentNaturalCompany
                      v-if="getAccountStatus()"
                      :dni="shareholder.dni"
                      :name="shareholder.firstName + shareholder.lastName"
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
        class="px-5 mt-2 btn-submit"
        icon="pi pi-angle-right"
        iconPos="right"
        @click="finish()"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

import UploadDocumentNaturalCompany from './UploadDocumentNaturalCompany.vue'
import { useAuth } from '../../../../composables/useAuth'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'
import DocumentsCompany from './DocumentsCompany.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const { getAccountStatus } = useAuth()
const { getPartners } = useOnboardingCompany()

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const { onboardingCompany } = useOnboardingCompany()

const documentCompanyIsValid = ref(false)

const updateDocumentCompanyIsValid = (isValid: boolean) => {
  documentCompanyIsValid.value = isValid
}
const finish = () => {
  if (!documentCompanyIsValid.value) {
    toast.add({ severity: 'warn', summary: t('warning'), detail: t('documentsRequired'), life: 5000 })
    return
  }
  router.push('/onboarding/business/completed')
}
</script>

<style scoped></style>
