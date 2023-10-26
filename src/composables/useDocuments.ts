import { storeToRefs } from 'pinia'
import { DocumentAdd, useDocumentAddStorage } from '../stores/documents'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDocuments = () => {
  const documentsStore = storeToRefs(useDocumentAddStorage())

  const addDocument = (taxId: string, doc: DocumentAdd) => {
    // @ts-ignore
    documentsStore.documents[taxId] = doc
  }

  const getSelectedTypeIdentificationDocument = (taxId: string) => {
    for (const docKey in documentsStore.documents) {
      if (docKey === taxId) {
        // @ts-ignore
        return documentsStore.documents[docKey].selectedTypeIdentificationDocument
      }
    }
  }
  const getSelectedTypeDocumentProofOfAddress = (taxId: string) => {
    for (const docKey in documentsStore.documents) {
      if (docKey === taxId) {
        // @ts-ignore
        return documentsStore.documents[docKey].selectedTypeDocumentProofOfAddress
      }
    }
  }

  const setSelectedTypeDocumentProofOfAddress = (taxId: string, docType: string) => {
    for (const docKey in documentsStore.documents) {
      if (docKey === taxId) {
        // @ts-ignore
        documentsStore.documents[docKey].selectedTypeDocumentProofOfAddress = docType
      }
    }
  }
  const setSelectedTypeIdentificationDocument = (taxId: string, docType: string) => {
    for (const docKey in documentsStore.documents) {
      if (docKey === taxId) {
        // @ts-ignore
        documentsStore.documents[docKey].selectedTypeIdentificationDocument = docType
      }
    }
  }

  const { t } = useI18n({ useScope: 'global' })

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

  return {
    documentTypeProofOfAddress,
    documentTypeOptions,
    setSelectedTypeDocumentProofOfAddress,
    setSelectedTypeIdentificationDocument,
    getSelectedTypeIdentificationDocument,
    getSelectedTypeDocumentProofOfAddress,
    addDocument,
  }
}
