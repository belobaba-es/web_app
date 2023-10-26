import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { OnboardingCompany, Partner } from '../types/onboardingCompany'
import { ref } from 'vue'

export const useOnboardingCompany = () => {
  const { dataOnboardingCompany } = useOnboardingCompanyStore()
  const onboardingCompany = ref<OnboardingCompany>(dataOnboardingCompany())

  const addPartner = (partner: Partner) => {}

  const saveData = () => {}

  const validateStepOne = () => {}
  return {
    ...useOnboardingCompanyStore,
    onboardingCompany,
  }
}
