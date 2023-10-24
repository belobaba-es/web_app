import { ref } from 'vue'
import { OnboardingPersonal } from '../types/onboardingPersonal'
import { OnboardingService } from '../views/onboarding/services/onboarding'
import router from '../router'
import showExceptionError from '../shared/showExceptionError'
import showMessage from '../shared/showMessageArray'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { ProfileService } from '../views/profile/services/profile'
import { useOnboardingPersonalStore } from '../stores/useOnboardingPersonalStore'

export const useOnboardingPersonal = () => {
  const { getUserEmail, getClientId } = useAuth()
  const { setInitialOnboardingPersonal, dataOnboardingPersonal } = useOnboardingPersonalStore()
  const submitting = ref(false)
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const onboardingPersonal = ref<OnboardingPersonal>(dataOnboardingPersonal())

  const isPassportOrTaxIdEmpty = () => {
    return !onboardingPersonal.value.passport && !onboardingPersonal.value.taxId
  }

  const saveData = () => {
    submitting.value = true
    setInitialOnboardingPersonal(onboardingPersonal.value)
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
      .openingAccountPersonal(onboardingPersonal.value)
      .then(resp => {
        submitting.value = false
        toast.add({
          severity: 'success',
          detail: resp.message,
          life: 4000,
        })

        //save localstorage
        localStorage.setItem('accountId', resp.data.clientId)
        localStorage.setItem('dni', onboardingPersonal.value.dni)

        router.push('/onboarding/personal/step2')
      })
      .catch(e => {
        submitting.value = false

        if (e.response.data.data?.warning) {
          e.response.data.data.warning.forEach((element: any) => {
            showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
          })
          return
        }

        if (e.response.data.message) {
          showExceptionError(toast, 'error', t('somethingWentWrong'), e.response.data.message, 4000)
          return
        }

        showMessage(toast, e.response.data)
      })
  }

  const fetchDataToClient = () => {
    submitting.value = true
    new ProfileService()
      .getAccountByClientId(getClientId())
      .then((resp: any) => {
        console.log(resp)
        onboardingPersonal.value = resp.clientData as unknown as OnboardingPersonal
        setInitialOnboardingPersonal(onboardingPersonal.value)
        submitting.value = false
      })
      .catch(e => {
        submitting.value = false
        showMessage(toast, e.response.data)
      })
  }

  fetchDataToClient()

  return {
    onboardingPersonal,
    submitting,
    saveData,
  }
}
