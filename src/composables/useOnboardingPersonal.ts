import { ref } from 'vue'
import { OnboardingPersonal } from '../types/onboardingPersonal'
import { OnboardingService } from '../views/onboarding/services/onboarding'
import router from '../router'
import showExceptionError from '../shared/showExceptionError'
import showMessage from '../shared/showMessageArray'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'

export const useOnboardingPersonal = () => {
  const { getUserEmail } = useAuth()
  const submitting = ref(false)
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const onboardingPersonal = ref<OnboardingPersonal>({
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
    type: 'NATURAL_PERSON',
    referredByAccountId: '',
  })

  const isPassportOrTaxIdEmpty = () => {
    return !onboardingPersonal.value.passport && !onboardingPersonal.value.taxId
  }

  const saveData = () => {
    submitting.value = true

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

  return {
    onboardingPersonal,
    submitting,
    saveData,
  }
}
