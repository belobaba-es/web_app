import { defineStore } from 'pinia'

export interface DocumentAdd {
  selectedTypeIdentificationDocument: string
  selectedTypeDocumentProofOfAddress: string
}
export const useDocumentAddStorage = defineStore('documentAdd', {
  state: (): { documents: DocumentAdd[] } => ({
    documents: [],
  }),
})
