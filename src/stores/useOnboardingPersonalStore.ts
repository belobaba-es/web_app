import { defineStore } from 'pinia'
import { OnboardingPersonal } from '../types/onboardingPersonal'
import { useAuth } from '../composables/useAuth'

const { getUserEmail } = useAuth()

export const useOnboardingPersonalStore = defineStore('useOnboardingPersonalStore', {
  state: (): OnboardingPersonal =>
    <OnboardingPersonal>{
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
    },
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
      }
    },
  },
})
