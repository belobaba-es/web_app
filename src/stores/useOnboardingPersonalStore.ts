import { defineStore } from 'pinia'
import { OnboardingPersonal } from '../types/onboardingPersonal'

export const useOnboardingPersonalStore = defineStore('useOnboardingPersonalStore', {
  state: (): OnboardingPersonal => ({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
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
  }),
  actions: {
    setInitialOnboardingPersonal(onboardingPersonal: OnboardingPersonal) {
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
    },
  },
})
