<template>
  <div class="grid">
    <div class="col-12">
      <div class="field col-12">
        <div class="field">
          <label>{{ t('Document Type')  }}</label>
          <div class="p-inputgroup">
            <Dropdown
              :options="documentTypeOptions"
              option-label="name"
              option-value="value"
              :placeholder="t('documentTypePlaceHolder')"
              class="w-full"
              v-model="identifyDocument"
              @change="selectedIdentifyDocument"
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
                  :label="getSelectedTypeIdentificationDocument(taxId)"
                  side="front"
                  :type="identifyDocument"
                  :dni="props.dni"
                  :isPartner="true"
                  v-model="documentSide"
                />
              </div>
            </div>

            <div class="col-6" v-if="shouldShowFrontBank()">
              <label>{{ t('Document Back side') }}</label>
              <div class="mt-2">
                <FileInput
                  label="getSelectedTypeIdentificationDocument(taxId)"
                  side="back"
                  :dni="props.dni"
                  :isPartner="true"
                  :type="identifyDocument"
                  v-model="documentSide"
                />
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
                  @change="selectedProofOfAddress"
                  v-model="typeDocumentAddress"
                />
              </div>
              <FileInput
                :label="getSelectedTypeDocumentProofOfAddress('0')"
                side="front"
                :isPartner="true"
                :type="typeDocumentAddress"
                :account-id="accountId ?? idAccount"
                :dni="props.dni"
                v-model="documentFiscal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, onBeforeMount, defineProps } from 'vue'
import { useAccount } from '../../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import FileInput from '../../profile/components/FileInput.vue'
import { useDocuments } from '../../../composables/useDocuments'
import router from '../../../router'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const { getOwner, accountId, getFullName, findMember, submitProfileForm } = useAccount()
const toast = useToast()
const {
  addDocument,
  setSelectedTypeIdentificationDocument,
  setSelectedTypeDocumentProofOfAddress,
  getSelectedTypeIdentificationDocument,
  getSelectedTypeDocumentProofOfAddress,
} = useDocuments()

const idAccount = localStorage.getItem('accountId') || ''
const dni = localStorage.getItem('dni') || ''
const identifyDocument = ref<string>('')
const documentSide = ref<string>('')
const documentFiscal = ref<string>('')
const typeDocumentAddress = ref<string>('')
const isPartner = ref(true)

const documentTypeProofOfAddress = ref([
  { value: 'monthly_utility', name: t('documentProofOfAddress1') },
  { value: 'statements', name: t('documentProofOfAddress2') },
  { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
  { value: 'vehicle_registration', name: t('documentProofOfAddress4') },
  { value: 'real_estate_property_title', name: t('documentProofOfAddress5') },
  { value: 'property_tax_bill', name: t('documentProofOfAddress6') },
  { value: 'w2', name: t('documentProofOfAddress7') },
])

const documentTypeOptions = ref([
  { value: 'passport', name: t('docTypeLabelPassport') },
  { value: 'drivers_license', name: t('docTypeLabelDriversLicense') },
  { value: 'government_id', name: t('docTypeLabelGovernmentId') },
  { value: 'residence_permit', name: 'Residence Permit' },
])


const props = defineProps({
  taxId: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
})

const member = ref()

onBeforeMount(() => {
  addDocument(props.taxId, { selectedTypeDocumentProofOfAddress: '', selectedTypeIdentificationDocument: '' })
  member.value = findMember(props.taxId)
})

const shouldShowFrontBank = () => {
  return ['drivers_license', 'government_id', 'residence_permit'].includes(identifyDocument.value)
}

const selectedIdentifyDocument = (e: any) => {
  setSelectedTypeIdentificationDocument(props.taxId, e.value)
}

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress('0', e.value)
}
</script>
