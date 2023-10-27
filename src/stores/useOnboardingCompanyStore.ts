import { defineStore } from 'pinia'
import { OnboardingCompany } from '../types/onboardingCompany'
import { useAuth } from '../composables/useAuth'
const { getUserEmail } = useAuth()

export const useOnboardingCompanyStore = defineStore('useOnboardingCompanyStore', {
  state: (): OnboardingCompany => ({
    email: getUserEmail(),
    informationCompany: {
      name: '',
      registerNumber: '',
      naics: '',
      naicsDescription: '',
      establishedDate: new Date(),
      webSite: '',
      phoneCountry: '',
      phoneNumber: '',
      registeredAddress: {
        streetOne: '',
        streetTwo: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
      physicalAddress: {
        streetOne: '',
        streetTwo: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
    },
    partners: [],
    accountQuestionnaire: {
      purposeAccount: '',
      sourceAssetsAndIncome: '',
      intendedUseAccount: '',
      anticipatedTypesAssets: '',
      anticipatedMonthlyCashVolume: '',
      anticipatedTradingPatterns: '',
      anticipatedMonthlyTransactionsIncoming: '',
      anticipatedMonthlyTransactionsOutgoing: '',
      natureBusinessCompany: '',
    },
  }),
  actions: {
    dataOnboardingCompany(): OnboardingCompany {
      return {
        email: this.email,
        informationCompany: this.informationCompany,
        partners: this.partners,
        accountQuestionnaire: this.accountQuestionnaire,
      }
    },
    setInitialOnboardingCompany(onboardingCompany: OnboardingCompany) {
      this.email = onboardingCompany.email
      this.informationCompany = onboardingCompany.informationCompany
      this.partners = onboardingCompany.partners
      this.accountQuestionnaire = onboardingCompany.accountQuestionnaire
    },
  },
})
