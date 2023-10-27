import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { OnboardingCompany, Partner } from '../types/onboardingCompany'
import { ref } from 'vue'

export const useOnboardingCompany = () => {
  const { dataOnboardingCompany } = useOnboardingCompanyStore()
  const onboardingCompany = ref<OnboardingCompany>(dataOnboardingCompany())

  const addPartner = (partner: Partner) => {}

  const saveData = () => {}

  const validateStepOne = () => {
    const fieldsToValidate = [
      onboardingCompany.value.informationCompany.name,
      onboardingCompany.value.email,
      onboardingCompany.value.informationCompany.registerNumber,
      onboardingCompany.value.informationCompany.naics,
      onboardingCompany.value.informationCompany.naicsDescription,
      onboardingCompany.value.informationCompany.establishedDate,
      onboardingCompany.value.informationCompany.webSite,
      onboardingCompany.value.informationCompany.phoneCountry,
      onboardingCompany.value.informationCompany.phoneNumber,
      onboardingCompany.value.informationCompany.registeredAddress.streetOne,
      onboardingCompany.value.informationCompany.registeredAddress.postalCode,
      onboardingCompany.value.informationCompany.registeredAddress.country,
      onboardingCompany.value.informationCompany.registeredAddress.city,
      onboardingCompany.value.informationCompany.physicalAddress.streetOne,
      onboardingCompany.value.informationCompany.physicalAddress.postalCode,
      onboardingCompany.value.informationCompany.physicalAddress.country,
      onboardingCompany.value.informationCompany.physicalAddress.city,
    ]

    for (const field of fieldsToValidate) {
      const value = field.toString().trim()
      if (value === '') {
        return false
      }
    }

    return true
  }

  const physicalAddressIsSameRegisteredAddress = (isPhysicalAddress: boolean) => {
    if (isPhysicalAddress) {
      onboardingCompany.value.informationCompany.physicalAddress.streetOne =
        onboardingCompany.value.informationCompany.registeredAddress.streetOne

      onboardingCompany.value.informationCompany.physicalAddress.streetTwo =
        onboardingCompany.value.informationCompany.registeredAddress.streetTwo

      onboardingCompany.value.informationCompany.physicalAddress.city =
        onboardingCompany.value.informationCompany.registeredAddress.city

      onboardingCompany.value.informationCompany.physicalAddress.country =
        onboardingCompany.value.informationCompany.registeredAddress.country

      onboardingCompany.value.informationCompany.physicalAddress.region =
        onboardingCompany.value.informationCompany.registeredAddress.region

      onboardingCompany.value.informationCompany.physicalAddress.postalCode =
        onboardingCompany.value.informationCompany.registeredAddress.postalCode

      return
    }
    onboardingCompany.value.informationCompany.physicalAddress.streetOne = ''

    onboardingCompany.value.informationCompany.physicalAddress.streetTwo = ''

    onboardingCompany.value.informationCompany.physicalAddress.city = ''

    onboardingCompany.value.informationCompany.physicalAddress.country = ''

    onboardingCompany.value.informationCompany.physicalAddress.region = ''

    onboardingCompany.value.informationCompany.physicalAddress.postalCode = ''
  }
  return {
    ...useOnboardingCompanyStore,
    physicalAddressIsSameRegisteredAddress,
    onboardingCompany,
  }
}
