import showMessage from '../shared/showMessageArray'
import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { OnboardingCompany, Partner } from '../types/onboardingCompany'
import { ref } from 'vue'
import { useAuth } from './useAuth'
import { ProfileService } from '../views/profile/services/profile'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export const useOnboardingCompany = () => {
  const router = useRouter()
  const toast = useToast()
  const submitting = ref(false)
  const isUpdateData = ref<boolean>(false)
  const { dataOnboardingCompany, setInitialOnboardingCompany } = useOnboardingCompanyStore()
  const { getClientId } = useAuth()
  const onboardingCompany = ref<OnboardingCompany>(dataOnboardingCompany())

  const addPartner = (partner: Partner) => {}

  const saveData = () => {}

  const validateStepOne = () => {
    const fieldsToValidate: any = {
      'informationCompany.name': onboardingCompany.value.informationCompany.name,
      email: onboardingCompany.value.email,
      'informationCompany.registerNumber': onboardingCompany.value.informationCompany.registerNumber,
      'informationCompany.naics': onboardingCompany.value.informationCompany.naics,
      'informationCompany.naicsDescription': onboardingCompany.value.informationCompany.naicsDescription,
      'informationCompany.establishedDate': onboardingCompany.value.informationCompany.establishedDate,
      'informationCompany.phoneCountry': onboardingCompany.value.informationCompany.phoneCountry,
      'informationCompany.phoneNumber': onboardingCompany.value.informationCompany.phoneNumber,
      'informationCompany.webSite': onboardingCompany.value.informationCompany.webSite,
      'registeredAddress.streetOne': onboardingCompany.value.informationCompany.registeredAddress.streetOne,
      'registeredAddress.postalCode': onboardingCompany.value.informationCompany.registeredAddress.postalCode,
      'registeredAddress.country': onboardingCompany.value.informationCompany.registeredAddress.country,
      'registeredAddress.city': onboardingCompany.value.informationCompany.registeredAddress.city,
      'physicalAddress.streetOne': onboardingCompany.value.informationCompany.physicalAddress.streetOne,
      'physicalAddress.postalCode': onboardingCompany.value.informationCompany.physicalAddress.postalCode,
      'physicalAddress.country': onboardingCompany.value.informationCompany.physicalAddress.country,
      'physicalAddress.city': onboardingCompany.value.informationCompany.physicalAddress.city,
    }

    let isValid = true

    for (const fieldKey in fieldsToValidate) {
      const value = fieldsToValidate[fieldKey]

      const trimmedValue = value && typeof value === 'string' ? value.trim() : value

      if (!trimmedValue) {
        toast.add({
          severity: 'warn',
          summary: 'Valdation field',
          detail: `The field ${fieldKey} is required.`,
          life: 4000,
        })
        isValid = false
      }
    }

    return isValid
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

  const fetchDataToClient = () => {
    submitting.value = true
    new ProfileService()
      .getAccountByClientId(getClientId())
      .then((resp: any) => {
        isUpdateData.value = true
        onboardingCompany.value = resp.clientData as unknown as OnboardingCompany
        setInitialOnboardingCompany(onboardingCompany.value)
        submitting.value = false
      })
      .catch(e => {
        submitting.value = false
        showMessage(toast, e.response.data)
      })
  }

  const nextStepTwo = () => {
    if (validateStepOne()) {
      router.push(`/onboarding/business/step2`)
    }
  }

  if (getClientId()) {
    fetchDataToClient()
  }
  return {
    ...useOnboardingCompanyStore,
    physicalAddressIsSameRegisteredAddress,
    nextStepTwo,
    onboardingCompany,
  }
}
