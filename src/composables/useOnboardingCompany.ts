import showMessage from '../shared/showMessageArray'
import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { OnboardingCompany, Partner } from '../types/onboardingCompany'
import { computed, ref, watch } from 'vue'
import { useAuth } from './useAuth'
import { ProfileService } from '../views/profile/services/profile'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { validateObject } from '../shared/validateObject'
import { OnboardingService } from '../views/onboarding/services/onboarding'
import { Store } from 'pinia'

export const useOnboardingCompany = () => {
  const router = useRouter()
  const toast = useToast()
  const submitting = ref(false)

  const { dataOnboardingCompany, setStateOnboardingCompany } = useOnboardingCompanyStore()
  const { getClientId } = useAuth()
  const onboardingCompany = ref<OnboardingCompany>(dataOnboardingCompany())

  const useOnboardingCompanyState = useOnboardingCompanyStore()

  useOnboardingCompanyState.$subscribe((mutation, state) => {
    onboardingCompany.value = state
  })

  const saveData = () => {
    if (!validateStep3()) {
      return
    }

    requestToBackendForUpdateOnboardingCompany()
      .then(resp => {
        submitting.value = false
        router.push('/onboarding/business/step4')
      })
      .catch(e => {
        submitting.value = false

        showMessage(toast, e.response.data)
      })
  }

  const requestToBackendForUpdateOnboardingCompany = (): Promise<any> => {
    return new OnboardingService().openingAccountBussiness(onboardingCompany.value, getClientId() !== undefined)
  }

  const validateStep3 = (): boolean => {
    const fieldsToValidate: any = {
      purposeAccount: onboardingCompany.value.accountQuestionnaire.purposeAccount,
      sourceAssetsAndIncome: onboardingCompany.value.accountQuestionnaire.sourceAssetsAndIncome,
      intendedUseAccount: onboardingCompany.value.accountQuestionnaire.intendedUseAccount,
      anticipatedTypesAssets: onboardingCompany.value.accountQuestionnaire.anticipatedTypesAssets,
      anticipatedMonthlyCashVolume: onboardingCompany.value.accountQuestionnaire.anticipatedMonthlyCashVolume,
      anticipatedTradingPatterns: onboardingCompany.value.accountQuestionnaire.anticipatedTradingPatterns,
      anticipatedMonthlyTransactionsIncoming:
        onboardingCompany.value.accountQuestionnaire.anticipatedMonthlyTransactionsIncoming,
      anticipatedMonthlyTransactionsOutgoing:
        onboardingCompany.value.accountQuestionnaire.anticipatedMonthlyTransactionsOutgoing,
      natureBusinessCompany: onboardingCompany.value.accountQuestionnaire.natureBusinessCompany,
    }

    return validateObject(toast, fieldsToValidate)
  }

  const validateStep2 = (): boolean => {
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

    return validateObject(toast, fieldsToValidate)
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

  const fetchDataToClientCompany = () => {
    submitting.value = true
    new ProfileService()
      .getAccountByClientId(getClientId())
      .then((resp: any) => {
        setStateOnboardingCompany(resp.clientData as unknown as OnboardingCompany)
        submitting.value = false
      })
      .catch(e => {
        submitting.value = false
        showMessage(toast, e.response.data)
      })
  }

  const nextStep2 = () => {
    if (validateStep2()) {
      router.push(`/onboarding/business/step2`)
    }
  }

  const hasPartner = computed((): boolean => {
    return onboardingCompany.value.partners.length > 0
  })

  const nextStep3 = () => {
    if (!hasPartner.value) {
      showMessage(toast, 'Please add at least one partner')
      return
    }
    router.push(`/onboarding/business/step3`)
  }

  return {
    ...useOnboardingCompanyStore(),
    hasPartner,
    onboardingCompany,
    fetchDataToClient: fetchDataToClientCompany,
    requestToBackendForUpdateOnboardingCompany,
    saveData,
    nextStep3,
    physicalAddressIsSameRegisteredAddress,
    nextStep2,
  }
}
