<template>
  <section class="section-main pt-6">
    <div class="p-panel p-component shareholders-panel col-8">
      <div class="p-panel-header">
        <span class="p-panel-title">UPLOAD DOCUMENTS</span>
      </div>
      <div class="p-toggleable-content" role="region">
        <div class="p-panel-content">
          <div class="p-scrollpanel p-component custom" style="height: 400px">
            <div class="p-scrollpanel-wrapper">
              <div class="p-scrollpanel-content">
                <div class="px-3 pt-3 pb-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
import { useOnboardingPersonal } from '../../../composables/useOnboardingPersonal'
import { useAuth } from '../../../composables/useAuth'

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

const { onboardingPersonal } = useOnboardingPersonal()

const idAccount = localStorage.getItem('accountId') || ''
const dni = onboardingPersonal.value?.dni || ''
const identifyDocument = ref<string>('')
const documentSide = ref<string>('')
const documentFiscal = ref<string>('')
const typeDocumentAddress = ref<string>('')
const isPartner = ref(false)

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

const member = ref()

// onBeforeMount(() => {
//   addDocument(props.taxId, { selectedTypeDocumentProofOfAddress: '', selectedTypeIdentificationDocument: '' })
//   member.value = findMember(props.taxId)
// })

const shouldShowFrontBank = () => {
  return ['drivers_license', 'government_id', 'residence_permit'].includes(identifyDocument.value)
}

const selectedIdentifyDocument = (e: any) => {
  setSelectedTypeIdentificationDocument('', e.value)
}

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress('0', e.value)
}

//router.push('/personal/completed')
</script>

<style scoped></style>
