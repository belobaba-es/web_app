import { defineStore } from 'pinia'
import { AddressShipping, OnboardingPersonal } from '../types/onboardingPersonal'
import { useAuth } from '../composables/useAuth'

const { getUserEmail } = useAuth()

export const useOnboardingPersonalStore = defineStore('useOnboardingPersonalStore', {
  state: (): OnboardingPersonal => ({
    firstName: '',
    middleName: '',
    lastName: '',
    email: getUserEmail(),
    dateBirth: '',
    dni: '',
    taxId: '',
    passport: '',
    phoneCountry: '',
    phoneNumber: '',
    streetOne: '',
    streetTwo: '',
    postalCode: '',
    city: '',
    region: '',
    country: '',
    type: '',
    referredByAccountId: '',
    employmentStatus: '',
    occupation: '',
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
    fundsSendReceiveJurisdictions: [],
    engageInActivities: [],
    nationality: '',
    documentExpirationDate: '',
    addressShipping: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
      number: '',
      apartmentNumber: '',
    },
  }),
  actions: {
    setStateOnboardingPersonal(onboardingPersonal: OnboardingPersonal) {
      this.firstName = onboardingPersonal.firstName
      this.middleName = onboardingPersonal.middleName
      this.lastName = onboardingPersonal.lastName
      this.email = onboardingPersonal.email
      this.dateBirth = onboardingPersonal.dateBirth
      this.dni = onboardingPersonal.dni
      this.taxId = onboardingPersonal.taxId
      this.passport = onboardingPersonal.passport
      this.phoneCountry = onboardingPersonal.phoneCountry
      this.phoneNumber = onboardingPersonal.phoneNumber
      this.streetOne = onboardingPersonal.streetOne
      this.streetTwo = onboardingPersonal.streetTwo
      this.postalCode = onboardingPersonal.postalCode
      this.city = onboardingPersonal.city
      this.region = onboardingPersonal.region
      this.country = onboardingPersonal.country
      this.type = onboardingPersonal.type
      this.referredByAccountId = onboardingPersonal.referredByAccountId
      this.employmentStatus = onboardingPersonal.employmentStatus
      this.occupation = onboardingPersonal.occupation
      this.primarySourceOfFunds = onboardingPersonal.primarySourceOfFunds
      this.usdValueOfFiat = onboardingPersonal.usdValueOfFiat
      this.usdValueOfCrypto = onboardingPersonal.usdValueOfCrypto
      this.monthlyDeposits = onboardingPersonal.monthlyDeposits
      this.monthlyCryptoDeposits = onboardingPersonal.monthlyCryptoDeposits
      this.monthlyInvestmentDeposit = onboardingPersonal.monthlyInvestmentDeposit
      this.monthlyCryptoInvestmentDeposit = onboardingPersonal.monthlyCryptoInvestmentDeposit
      this.monthlyWithdrawals = onboardingPersonal.monthlyWithdrawals
      this.monthlyCryptoWithdrawals = onboardingPersonal.monthlyCryptoWithdrawals
      this.monthlyInvestmentWithdrawal = onboardingPersonal.monthlyInvestmentWithdrawal
      this.monthlyCryptoInvestmentWithdrawal = onboardingPersonal.monthlyCryptoInvestmentWithdrawal
      this.fundsSendReceiveJurisdictions = onboardingPersonal.fundsSendReceiveJurisdictions
      this.engageInActivities = onboardingPersonal.engageInActivities
      this.nationality = onboardingPersonal.nationality
      this.documentExpirationDate = onboardingPersonal.documentExpirationDate
      this.addressShipping = onboardingPersonal.addressShipping
    },

    dataOnboardingPersonal(): OnboardingPersonal {
      return {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        email: this.email,
        dateBirth: this.dateBirth,
        dni: this.dni,
        taxId: this.taxId,
        passport: this.passport,
        phoneCountry: this.phoneCountry,
        phoneNumber: this.phoneNumber,
        streetOne: this.streetOne,
        streetTwo: this.streetTwo,
        postalCode: this.postalCode,
        city: this.city,
        region: this.region,
        country: this.country,
        type: this.type,
        referredByAccountId: this.referredByAccountId,
        employmentStatus: this.employmentStatus,
        occupation: this.occupation,
        primarySourceOfFunds: this.primarySourceOfFunds,
        usdValueOfFiat: this.usdValueOfFiat,
        usdValueOfCrypto: this.usdValueOfCrypto,
        monthlyDeposits: this.monthlyDeposits,
        monthlyCryptoDeposits: this.monthlyCryptoDeposits,
        monthlyInvestmentDeposit: this.monthlyInvestmentDeposit,
        monthlyCryptoInvestmentDeposit: this.monthlyCryptoInvestmentDeposit,
        monthlyWithdrawals: this.monthlyWithdrawals,
        monthlyCryptoWithdrawals: this.monthlyCryptoWithdrawals,
        monthlyInvestmentWithdrawal: this.monthlyInvestmentWithdrawal,
        monthlyCryptoInvestmentWithdrawal: this.monthlyCryptoInvestmentWithdrawal,
        fundsSendReceiveJurisdictions: this.fundsSendReceiveJurisdictions,
        engageInActivities: this.engageInActivities,
        nationality: this.nationality,
        documentExpirationDate: this.documentExpirationDate,
        addressShipping: this.addressShipping,
      }
    },

    setAddressShipping(addressShipping: AddressShipping) {
      this.addressShipping = addressShipping
    },

    getAddress() {
      return {
        streetOne: this.streetOne,
        streetTwo: this.streetTwo,
        postalCode: this.postalCode,
        city: this.city,
        region: this.region,
        country: this.country,
      }
    },

    getAddressShipping(): AddressShipping | undefined {
      return this.addressShipping
    },

    setNationality(nationality: string) {
      this.nationality = nationality
    },
    setDocumentExpirationDate(documentExpirationDate: string) {
      this.documentExpirationDate = documentExpirationDate
    },

    getDNI() {
      return this.dni
    },

    getDateBirth() {
      return this.dateBirth
    },
  },
})
