import { ref, watch } from 'vue'
import { OnboardingPersonal } from '../types/onboardingPersonal'
import { OnboardingService } from '../views/onboarding/services/onboarding'
import showMessage from '../shared/showMessageArray'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { ProfileService } from '../views/profile/services/profile'
import { useOnboardingPersonalStore } from '../stores/useOnboardingPersonalStore'
import { processException } from '../shared/processException'
import { useRouter } from 'vue-router'

export const useOnboardingPersonal = () => {
  const router = useRouter()
  const { getClientId } = useAuth()

  const { setStateOnboardingPersonal, dataOnboardingPersonal } = useOnboardingPersonalStore()

  const submitting = ref(false)
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const onboardingPersonal = ref<OnboardingPersonal>(dataOnboardingPersonal())

  const isUpdateData = ref<boolean>(false)

  const useOnboardingPersonalState = useOnboardingPersonalStore()

  useOnboardingPersonalState.$subscribe((mutation, state) => {
    onboardingPersonal.value = state
  })

  const isPassportOrTaxIdEmpty = () => {
    return !onboardingPersonal.value.passport && !onboardingPersonal.value.taxId
  }

  const saveData = () => {
    return new Promise((resolve, reject) => {
      submitting.value = true
      // setStateOnboardingPersonal(onboardingPersonal.value)
      if (isPassportOrTaxIdEmpty()) {
        toast.add({
          severity: 'error',
          summary: t('error'),
          detail: t('passportOrTaxIdEmpty'),
        })
        submitting.value = false
        return
      }

      new OnboardingService()
        .openingAccountPersonal(onboardingPersonal.value, isUpdateData.value)
        .then(resp => {
          submitting.value = false
          toast.add({
            severity: 'success',
            detail: resp.message,
            life: 4000,
          })

          resolve(resp)
        })
        .catch(e => {
          submitting.value = false
          processException(toast, t, e.response.data)
          reject(e)
        })
    })
  }

  const fetchDataToClient = () => {
    submitting.value = true
    new ProfileService()
      .getAccountByClientId(getClientId())
      .then((resp: any) => {
        isUpdateData.value = true
        onboardingPersonal.value = resp.clientData as unknown as OnboardingPersonal
        setStateOnboardingPersonal(onboardingPersonal.value)
        submitting.value = false
      })
      .catch(e => {
        submitting.value = false
        showMessage(toast, e.response.data)
      })
  }
  const saveDataAndNextPag = async () => {
    saveData().then(() => {
      router.push('/onboarding/personal/step2')
    })
  }

  if (getClientId()) {
    fetchDataToClient()
  }

  // const watchChagedData = () => {
  watch(onboardingPersonal.value, () => {
    setStateOnboardingPersonal(onboardingPersonal.value)
  })
  // }

  // watchChagedData()

  return {
    onboardingPersonal,
    submitting,
    saveData,
    saveDataAndNextPag,
  }
}
