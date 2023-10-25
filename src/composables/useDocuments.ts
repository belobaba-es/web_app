import { storeToRefs } from 'pinia'
import { DocumentAdd, useDocumentAddStorage } from '../stores/documents'

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

  return {
    setSelectedTypeDocumentProofOfAddress,
    setSelectedTypeIdentificationDocument,
    getSelectedTypeIdentificationDocument,
    getSelectedTypeDocumentProofOfAddress,
    addDocument,
  }
}
