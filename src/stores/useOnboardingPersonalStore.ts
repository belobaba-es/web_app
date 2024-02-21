import { defineStore } from 'pinia'
import { OnboardingPersonal } from '../types/onboardingPersonal'
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
    primary_source_of_funds: '',
    usd_value_of_fiat: '',
    usd_value_of_crypto: '',
    monthly_deposits: '',
    monthly_crypto_deposits: '',
    monthly_investment_deposit: '',
    monthly_crypto_investment_deposit: '',
    monthly_withdrawals: '',
    monthly_crypto_withdrawals: '',
    monthly_investment_withdrawal: '',
    monthly_crypto_investment_withdrawal: '',
    funds_send_receive_jurisdictions: [],
    engage_in_activities: ''
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
      this.primary_source_of_funds = onboardingPersonal.primary_source_of_funds
      this.usd_value_of_fiat = onboardingPersonal.usd_value_of_fiat
      this.usd_value_of_crypto = onboardingPersonal.usd_value_of_crypto
      this.monthly_deposits = onboardingPersonal.monthly_deposits
      this.monthly_crypto_deposits = onboardingPersonal.monthly_crypto_deposits
      this.monthly_investment_deposit = onboardingPersonal.monthly_investment_deposit
      this.monthly_crypto_investment_deposit = onboardingPersonal.monthly_crypto_investment_deposit
      this.monthly_withdrawals = onboardingPersonal.monthly_withdrawals
      this.monthly_crypto_withdrawals = onboardingPersonal.monthly_crypto_withdrawals
      this.monthly_investment_withdrawal = onboardingPersonal.monthly_investment_withdrawal
      this.monthly_crypto_investment_withdrawal = onboardingPersonal.monthly_crypto_investment_withdrawal
      this.funds_send_receive_jurisdictions = onboardingPersonal.funds_send_receive_jurisdictions
      this.engage_in_activities = onboardingPersonal.engage_in_activities
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
        primary_source_of_funds: this.primary_source_of_funds,
        usd_value_of_fiat: this.usd_value_of_fiat,
        usd_value_of_crypto: this.usd_value_of_crypto,
        monthly_deposits: this.monthly_deposits,
        monthly_crypto_deposits: this.monthly_crypto_deposits,
        monthly_investment_deposit: this.monthly_investment_deposit,
        monthly_crypto_investment_deposit: this.monthly_crypto_investment_deposit,
        monthly_withdrawals: this.monthly_withdrawals,
        monthly_crypto_withdrawals: this.monthly_crypto_withdrawals,
        monthly_investment_withdrawal: this.monthly_investment_withdrawal,
        monthly_crypto_investment_withdrawal: this.monthly_crypto_investment_withdrawal,
        funds_send_receive_jurisdictions: this.funds_send_receive_jurisdictions,
        engage_in_activities: this.engage_in_activities
      }
    },
  },
})
