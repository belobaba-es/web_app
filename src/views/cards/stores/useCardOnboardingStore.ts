import { defineStore } from 'pinia'
import { OnboardingPersonal } from '../../../types/onboardingPersonal'
import { OnboardingCompany } from '../../../types/onboardingCompany'

type dataTypeOnboardingCard = {
  dataClient: OnboardingPersonal | OnboardingCompany | null
}

export const useCardOnboardingStore = defineStore('useCardOnboardingStore', {
  state: (): dataTypeOnboardingCard =>
    <dataTypeOnboardingCard>{
      dataClient: null,
    },
  actions: {
    setDataClient(client: OnboardingPersonal | OnboardingCompany) {
      this.dataClient = client
    },
    getDataClient(): OnboardingPersonal | OnboardingCompany | null {
      return this.dataClient
    },
  },
})
