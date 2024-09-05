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
      companyType: '',
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
    investmentProfile: {
      primarySourceOfFunds: '',
      usdValueOfFiat: '',
      usdValueOfCrypto: '',
      monthlyDeposits: '',
      monthlyCryptoDeposits: '',
      monthlyInvestmentDeposit: '',
      monthlyCryptoInvestmentDeposit: '',
      monthlyWithdrawals: '',
      monthlyCryptoWithdrawals: '',
      monthlyInvestmentWithdrawal: '',
      monthlyCryptoInvestmentWithdrawal: '',
    },
    kycProfile: {
      businessJurisdictions: [],
      fundsSendReceiveJurisdictions: [],
      engageInActivities: [],
      regulatedStatus: '',
      primaryBusiness: '',
      descriptionBusinessNature: '',
    },
  }),
  actions: {
    dataOnboardingCompany(): OnboardingCompany {
      return {
        email: this.email,
        informationCompany: this.informationCompany,
        partners: this.partners,
        investmentProfile: this.investmentProfile,
        kycProfile: this.kycProfile,
      }
    },
    setStateOnboardingCompany(onboardingCompany: OnboardingCompany) {
      this.email = onboardingCompany.email
      this.informationCompany = onboardingCompany.informationCompany ?? {
        name: '',
        registerNumber: '',
        companyType: '',
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
      }

      this.partners = onboardingCompany.partners
      this.investmentProfile = onboardingCompany.investmentProfile ?? {
        primarySourceOfFunds: '',
        usdValueOfFiat: '',
        usdValueOfCrypto: '',
        monthlyDeposits: '',
        monthlyCryptoDeposits: '',
        monthlyInvestmentDeposit: '',
        monthlyCryptoInvestmentDeposit: '',
        monthlyWithdrawals: '',
        monthlyCryptoWithdrawals: '',
        monthlyInvestmentWithdrawal: '',
        monthlyCryptoInvestmentWithdrawal: '',
      }
      this.kycProfile = onboardingCompany.kycProfile ?? {
        businessJurisdictions: [],
        fundsSendReceiveJurisdictions: [],
        engageInActivities: [],
        regulatedStatus: '',
        descriptionBusinessNature: '',
        primaryBusiness: '',
      }
    },
    getPartners(): Partner[] {
      return this.partners
    },
    addNewPartner(partner: Partner) {
      if (this.partners === undefined) {
        this.partners = [partner]
        return
      }

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
