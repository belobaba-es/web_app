<template>
  <div class="p-panel p-component shareholders-panel col-12 sm:col-12 md:col-12 lg:col-12 xl:col-6">
    <div class="p-panel-header">
      <span class="p-panel-title text-uppercase">{{ t('uploadDocumentsTitle') }}</span>
    </div>

    <div class="p-toggleable-content" role="region">
      <div class="p-panel-content">
        <div class="p-scrollpanel p-component custom">
          <div class="p-scrollpanel-content pl-5 pt-3">
            <p>{{ t('documentsPersonText') }}</p>
            <div class="col-10 p-0 pt-4">
              <label>{{ t('Document Type') }}</label>
              <div class="p-inputgroup">
                <Dropdown
                  :options="documentTypeOptions"
                  option-label="name"
                  option-value="value"
                  :placeholder="t('documentTypePlaceHolder')"
                  class="w-full"
                  v-model="typeDocumentIdentify"
                />
              </div>
              <div>
                <p class="help-text">{{ t('fileDescription') }}</p>
              </div>
            </div>

            <div class="grid mt-4">
              <div class="col-5">
                <label> {{ t('Document Front side') }}</label>
                <div class="mt-2">
                  <FileInput
                    side="front"
                    :type="typeDocumentIdentify"
                    :dni="onboardingPersonal.dni"
                    :isPartner="false"
                    @uploadComplete="completed"
                  />
                </div>
              </div>

              <div class="col-5" v-if="typeDocumentIdentify !== 'passport'">
                <label>{{ t('Document Back side') }}</label>
                <div class="mt-2">
                  <FileInput
                    :dni="onboardingPersonal.dni"
                    side="back"
                    :isPartner="false"
                    :type="typeDocumentIdentify"
                    @uploadComplete="completed"
                  />
                </div>
              </div>
            </div>

            <div class="field mt-4">
              <div class="grid">
                <div class="col-10">
                  <label>{{ t('utilityBillLabel') }}</label>
                  <div class="mt-2 mb-4">
                    <Dropdown
                      :options="documentTypeProofOfAddress"
                      option-label="name"
                      option-value="value"
                      :placeholder="t('documentTypePlaceHolder')"
                      class="w-full"
                      v-model="typeDocumentAddress"
                    />
                  </div>
                  <FileInput
                    side="front"
                    :isPartner="false"
                    :type="typeDocumentAddress"
                    :dni="onboardingPersonal.dni"
                    :is-proof-of-address="true"
                    @uploadComplete="completed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useToast } from 'primevue/usetoast'
import { useOnboardingPersonal } from '../../../../composables/useOnboardingPersonal'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const { documentTypeProofOfAddress, documentTypeOptions } = useDocuments()
const { onboardingPersonal } = useOnboardingPersonal()

const typeDocumentIdentify = ref<string>('')
const typeDocumentAddress = ref<string>('')

const submissionCompletedDocuments = ref<{
  front: boolean
  back: boolean
  proofOfAddress: boolean
}>({
  front: false,
  back: false,
  proofOfAddress: false,
})

if (onboardingPersonal.value.documentCountry !== 'si') {
  documentTypeOptions.value = documentTypeOptions.value.filter(item => item.value === 'passport')
} else {
  documentTypeOptions.value = documentTypeOptions.value.filter(item => item.value !== 'passport')
}
const completed = (response: { side: string; dni: string; registerNumber: string }) => {
  if (typeDocumentIdentify.value === 'passport') {
    submissionCompletedDocuments.value.back = true
  }

  if (response.side === 'front') {
    submissionCompletedDocuments.value.front = true
  }

  if (response.side === 'back') {
    submissionCompletedDocuments.value.back = true
  }

  if (response.side === 'proofOfAddress') {
    submissionCompletedDocuments.value.proofOfAddress = true
  }

  if (
    submissionCompletedDocuments.value.front &&
    submissionCompletedDocuments.value.back &&
    submissionCompletedDocuments.value.proofOfAddress
  ) {
    router.push('/onboarding/personal/completed')
  }
}
</script>

<style scoped></style>