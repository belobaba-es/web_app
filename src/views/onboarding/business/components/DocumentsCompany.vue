<template>
  <div class="p-panel p-component shareholders-panel col-6">
    <div class="p-panel-header">
      <span class="p-panel-title">{{ t('businessTitle') }}</span>
    </div>
    <div class="p-toggleable-content" role="region">
      <div class="p-panel-content">
        <div class="p-scrollpanel p-component custom">
          <div class="p-scrollpanel-content pl-4 pt-3">
            <div class="col-10 p-0 pt-4">
              <label> {{ t('businessDocumentLabel') }}</label>
              <div class="mt-2">
                <FileInput
                  :isPartner="false"
                  :registerNumber="onboardingCompany.informationCompany.registerNumber"
                  side="front"
                  type="incorporation_document"
                  @uploadComplete="uploadComplete"
                />
              </div>
            </div>
            <div class="col-10 p-0 pt-4">
              <label> {{ t('articleIncorporation') }}</label>
              <div class="mt-2">
                <FileInput
                  :isPartner="false"
                  :registerNumber="onboardingCompany.informationCompany.registerNumber"
                  side="front"
                  type="article_incorporation"
                  @uploadComplete="uploadComplete"
                />
              </div>
            </div>

            <div class="col-10 p-0 pt-4">
              <label> {{ t('beneficialOwnershipCertificate') }}</label>
              <div class="mt-2">
                <FileInput
                  :isPartner="false"
                  :registerNumber="onboardingCompany.informationCompany.registerNumber"
                  side="front"
                  type="beneficial_ownership_certificate"
                  @uploadComplete="uploadComplete"
                />
              </div>
            </div>

            <div class="col-10 p-0 pt-4">
              <label>{{ t('utilityBillLabel') }}</label>
              <div class="mt-2 mb-4">
                <Dropdown
                  v-model="typeDocumentAddress"
                  :options="documentTypeProofOfAddress"
                  :placeholder="t('documentTypePlaceHolder')"
                  class="w-full"
                  option-label="name"
                  option-value="value"
                />
              </div>
              <FileInput
                :isPartner="false"
                :registerNumber="onboardingCompany.informationCompany.registerNumber"
                :type="typeDocumentAddress"
                side="front"
                @uploadComplete="uploadComplete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import { ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'

const emit = defineEmits(['companyDocumentUploaded'])

const { t } = useI18n({ useScope: 'global' })
const { documentTypeProofOfAddress } = useDocuments()

const { onboardingCompany } = useOnboardingCompany()

const typeDocumentAddress = ref<string>('')

const submissionCompletedDocuments = ref<{
  incorporationDocument: boolean
  articleIncorporation: boolean
  proofOfAddress: boolean
  beneficialOwnershipCertificate: boolean
}>({
  incorporationDocument: false,
  articleIncorporation: false,
  proofOfAddress: false,
  beneficialOwnershipCertificate: false,
})

const uploadComplete = (data: any) => {
  if (data.type === 'incorporation_document') {
    submissionCompletedDocuments.value.incorporationDocument = true
  } else if (data.type === 'article_incorporation') {
    submissionCompletedDocuments.value.articleIncorporation = true
  } else if (data.type === 'beneficial_ownership_certificate') {
    submissionCompletedDocuments.value.beneficialOwnershipCertificate = true
  } else {
    submissionCompletedDocuments.value.proofOfAddress = true
  }

  emit(
    'companyDocumentUploaded',
    submissionCompletedDocuments.value.proofOfAddress &&
      submissionCompletedDocuments.value.incorporationDocument &&
      submissionCompletedDocuments.value.articleIncorporation &&
      submissionCompletedDocuments.value.beneficialOwnershipCertificate
  )
}
</script>
