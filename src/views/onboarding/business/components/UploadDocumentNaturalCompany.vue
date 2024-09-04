<template>
  <div class="field">
    <p class="text-1xl font-medium text-capitalize">Documents of - {{ props.name }}</p>
    <div class="grid">
      <div class="col-12">
        <div class="field col-12">
          <div class="field">
            <label>{{ t('Document Type') }}</label>
            <div class="p-inputgroup">
              <Dropdown
                v-model="identifyDocument"
                :options="documentTypeOptions"
                :placeholder="t('documentTypePlaceHolder')"
                class="w-full"
                option-label="name"
                option-value="value"
              />
            </div>
          </div>
        </div>
        <div class="px-3 pb-0">
          <div class="field">
            <div class="grid">
              <div class="col-6">
                <label> {{ t('Document Front side') }}</label>
                <div class="mt-2">
                  <FileInput
                    v-model="documentSide"
                    :dni="dni"
                    :isPartner="true"
                    :type="identifyDocument"
                    side="front"
                  />
                </div>
              </div>

              <div v-if="shouldShowFrontBank()" class="col-6">
                <label>{{ t('Document Back side') }}</label>
                <div class="mt-2">
                  <FileInput v-model="documentSide" :dni="dni" :isPartner="true" :type="identifyDocument" side="back" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-2 pb-0">
          <div class="field">
            <div class="col-6">
              <label>{{ t('selfieWithDocument') }}</label>
              <div class="mt-2">
                <FileInput
                  v-model="selfie"
                  :dni="dni"
                  :is-selfie="true"
                  :isPartner="true"
                  :type="DocumentType.SELFIE"
                  side="front"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="px-3 py-3">
          <div class="field">
            <div class="grid">
              <div class="col-6">
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
                  v-model="documentFiscal"
                  :dni="dni"
                  :isPartner="true"
                  :type="typeDocumentAddress"
                  side="front"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useToast } from 'primevue/usetoast'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'
import { DocumentType } from '../../../../types/onboardingCompany'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { documentTypeProofOfAddress, documentTypeOptions } = useDocuments()
const { getPartners } = useOnboardingCompany()

const identifyDocument = ref<string>('')
const documentSide = ref<string>('')
const documentFiscal = ref<string>('')
const typeDocumentAddress = ref<string>('')
const selfie = ref<string>('')

const props = defineProps({
  dni: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
})

const shouldShowFrontBank = () => {
  return ['drivers_license', 'government_id', 'residence_permit'].includes(identifyDocument.value)
}

// const hasDocuments = (): boolean => {
//   const partner = getPartners().find(
//       partner => partner.dni === props.dni && partner.documents !== undefined && partner?.documents.length > 0
//   )
//   return !!partner
// }
// //router.push('/personal/completed')
</script>
