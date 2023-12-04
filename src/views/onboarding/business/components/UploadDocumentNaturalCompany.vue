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
                :options="documentTypeOptions"
                option-label="name"
                option-value="value"
                :placeholder="t('documentTypePlaceHolder')"
                class="w-full"
                v-model="identifyDocument"
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
                    side="front"
                    :type="identifyDocument"
                    :dni="dni"
                    :isPartner="true"
                    v-model="documentSide"
                  />
                </div>
              </div>

              <div class="col-6" v-if="shouldShowFrontBank()">
                <label>{{ t('Document Back side') }}</label>
                <div class="mt-2">
                  <FileInput side="back" :dni="dni" :isPartner="true" :type="identifyDocument" v-model="documentSide" />
                </div>
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
                  :isPartner="true"
                  :type="typeDocumentAddress"
                  :dni="dni"
                  v-model="documentFiscal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useToast } from 'primevue/usetoast'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { documentTypeProofOfAddress, documentTypeOptions } = useDocuments()
const { getPartners } = useOnboardingCompany()

const identifyDocument = ref<string>('')
const documentSide = ref<string>('')
const documentFiscal = ref<string>('')
const typeDocumentAddress = ref<string>('')

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
