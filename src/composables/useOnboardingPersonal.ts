import { ref, watch } from 'vue'
import { OnboardingPersonal } from '../types/onboardingPersonal'
import { OnboardingService } from '../views/onboarding/services/onboarding'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { ProfileService } from '../views/profile/services/profile'
import { useOnboardingPersonalStore } from '../stores/useOnboardingPersonalStore'
import { processException } from '../shared/processException'

const isHaveDocumentUS = ref(true)
const isUpdateData = ref<boolean>(false)

const {
  setStateOnboardingPersonal,
  dataOnboardingPersonal,
  getDNI,
  getDateBirth,
  setAddressShipping,
  getAddressShipping,
  setNationality,
  setDocumentExpirationDate,
  setDNI,
} = useOnboardingPersonalStore()
const onboardingPersonal = ref<OnboardingPersonal>(dataOnboardingPersonal())

export const useOnboardingPersonal = () => {
  const { getClientId, setClientId } = useAuth()

  const submitting = ref(false)

  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const useOnboardingPersonalState = useOnboardingPersonalStore()

  useOnboardingPersonalState.$subscribe((mutation, state) => {
    onboardingPersonal.value = state
  })

  const isPassportOrTaxIdEmpty = () => {
    return !onboardingPersonal.value.passport && !onboardingPersonal.value.taxId
  }

  const typeDocument = ref([
    { name: 'Yes', key: true },
    { name: 'No', key: false },
  ])

  const saveData = (navigate?: Function) => {
    return new Promise((resolve, reject) => {
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
        .openingAccountPersonal(onboardingPersonal.value, isUpdateData.value)
        .then(resp => {
          submitting.value = false
          toast.add({
            severity: 'success',
            detail: resp.message,
            life: 4000,
          })

          if (navigate) navigate()

          isUpdateData.value = true
          setClientId(resp.data.clientId)

          resolve(resp)
        })
        .catch(e => {
          submitting.value = false
          processException(toast, t, e)
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

        if (onboardingPersonal.value.passport !== '') {
          isHaveDocumentUS.value = false
        }
      })
      .catch(e => {
        submitting.value = false
        processException(toast, t, e)
      })
  }

  if (getClientId()) {
    fetchDataToClient()
  }

  watch(onboardingPersonal.value, () => {
    setStateOnboardingPersonal(onboardingPersonal.value)
  })

  return {
    setDNI,
    setAddressShipping,
    getAddressShipping,
    setNationality,
    setDocumentExpirationDate,
    getDNI,
    getDateBirth,
    onboardingPersonal,
    submitting,
    typeDocument,
    saveData,
    isHaveDocumentUS,
  }
}
