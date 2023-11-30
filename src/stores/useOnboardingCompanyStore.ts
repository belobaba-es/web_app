import { defineStore } from 'pinia'
import { OnboardingCompany, Partner } from '../types/onboardingCompany'
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
      establishedDate: '',
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
    setStateOnboardingCompany(onboardingCompany: OnboardingCompany) {
      this.email = onboardingCompany.email
      this.informationCompany = onboardingCompany.informationCompany
      this.partners = onboardingCompany.partners
      this.accountQuestionnaire = onboardingCompany.accountQuestionnaire
    },
    getPartners(): Partner[] {
      return this.partners
    },
    addNewPartner(partner: Partner) {
      const partnerIndex = this.partners.findIndex(p => p.dni === partner.dni)

      if (partnerIndex !== -1) {
        // Si el socio ya existe, actualiza sus propiedades
        this.partners[partnerIndex] = partner
      } else {
        // Si el socio no existe, agrégalo a la lista
        this.partners.push(partner)
      }
    },
    deletePartner(dni: string) {
      const partnerIndex = this.partners.findIndex(p => p.dni === dni)
      if (partnerIndex !== -1) {
        this.partners.splice(partnerIndex, 1)
      }
    },
  },
})
