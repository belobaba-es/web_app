import { defineStore } from 'pinia'
import { OnboardingCompany } from '../types/onboardingCompany'

export const useOnboardingCompanyStore = defineStore('useOnboardingCompanyStore', {
  state: (): OnboardingCompany => ({
    email: '',
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
  },
})
