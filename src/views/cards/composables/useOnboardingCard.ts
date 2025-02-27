import { computed, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import router from '../../../router/router'
import { useOnboardingPersonalStore } from '../../../stores/useOnboardingPersonalStore'
import { useOnboardingPersonal } from '../../../composables/useOnboardingPersonal'
import { useI18n } from 'vue-i18n'

import { AddressShipping } from '../../../types/onboardingPersonal'
import { OnboardingService } from '../../onboarding/services/onboarding'
import { createRepositionCard, onboardingCard } from '../services/nobaCard.service'
import { OnboardingRepositionCard, OnboardingRequest } from '../types/onboardingRequest.type'
import { useRoute } from 'vue-router'
import { processException } from '../../../shared/processException'
import { useLayoutCard } from './useLayoutCard'
import { validateObject } from '../../../shared/validateObject'
import { useAuth } from '../../../composables/useAuth'

type Option = {
  value: string
  label: string
}

type OnboardingCardDataClient = {
  dni: string
  documentExpirationDate: string
  nationality: string
  addressShipping: AddressShipping
}

export const useOnboardingCard = () => {
  const submitting = ref(false)
  const domicileNumber = ref('')
  const { getAddress } = useOnboardingPersonalStore()
  const { typeCardSelect } = useLayoutCard()

  const {
    setAddressShipping,
    getAddressShipping,
    setNationality,
    setDocumentExpirationDate,
    setDNI,
    onboardingPersonal,
    getDNI,
    getDateBirth,
  } = useOnboardingPersonal()
  const currentStepIndex = ref<number>(0)
  const toast = useToast()
  const route = useRoute()
  const { t } = useI18n({ useScope: 'global' })
  const { getClientId } = useAuth()
  const sendingDataCard = ref<OnboardingRequest>({
    clientId: getClientId(),
    requestCardModality: typeCardSelect.value,
  })

  const sendingDataRepositionCard = ref<OnboardingRepositionCard>({
    clientId: getClientId(),
    cardModality: typeCardSelect.value,
    currency: 'USD',
  })

  const useOnboardingPersonalState = useOnboardingPersonalStore()
  const domicileOptions: Option[] = [
    { value: t('labelHome'), label: t('labelHome') },
    { value: t('labelApartament'), label: t('labelApartament') },
  ]

  const onboardingCardDataClient = ref<OnboardingCardDataClient>({
    dni: getDNI() ?? '',
    documentExpirationDate: '',
    nationality: '',
    addressShipping: getAddressShipping() ?? { ...getAddress(), number: '', apartmentNumber: '' },
  })

  useOnboardingPersonalState.$subscribe((mutation, state) => {
    const addressShipping = getAddressShipping() ?? { ...getAddress(), number: '', apartmentNumber: '' }
    const address = getAddress()

    onboardingCardDataClient.value.addressShipping = {
      streetOne: addressShipping?.streetOne || address.streetOne,
      streetTwo: addressShipping?.streetTwo || address.streetTwo,
      postalCode: addressShipping?.postalCode || address.postalCode,
      city: addressShipping?.city || address.city,
      region: addressShipping?.region || address.region,
      country: addressShipping?.country || address.country,
      number: addressShipping?.number || '',
      apartmentNumber: addressShipping?.apartmentNumber || '',
    }

    onboardingCardDataClient.value.documentExpirationDate = state.documentExpirationDate ?? ''
    onboardingCardDataClient.value.nationality = state.nationality ?? ''
    onboardingCardDataClient.value.dni = state.dni
  })

  const nextStepUserData = () => {
    if (typeCardSelect.value.length > 0) {
      router.push('/cards/onboarding/step/user-data')
      return
    }

    toast.add({
      severity: 'error',
      detail: t('msnErrorCard'),
      life: 4000,
    })
  }

  const onChangeDomicileHandler = (event: string) => {
    if (event === '') {
      return
    }

    if (event == t('labelHome')) {
      onboardingCardDataClient.value.addressShipping.number = domicileNumber.value
      onboardingCardDataClient.value.addressShipping.apartmentNumber = ''
      return
    }

    if (event == t('labelApartament')) {
      onboardingCardDataClient.value.addressShipping.apartmentNumber = domicileNumber.value
      onboardingCardDataClient.value.addressShipping.number = ''
    }
  }

  const validatePartOfTheOnboardingForm = () => {
    const fieldsToValidate: any = {
      country: onboardingCardDataClient.value.addressShipping.country,
      region: onboardingCardDataClient.value.addressShipping.region,
      nationality: onboardingCardDataClient.value.nationality,
      dni: onboardingCardDataClient.value.dni,
      documentExpirationDate: onboardingCardDataClient.value.documentExpirationDate,
    }

    return validateObject(toast, fieldsToValidate)
  }

  const validateForm = () => {
    let validate = true
    if (onboardingCardDataClient.value.nationality == '') {
      toast.add({ severity: 'warn', summary: 'Field validation', detail: t('errorNationalityLabel'), life: 14000 })
      validate = false
    }
    if (
      onboardingCardDataClient.value.addressShipping.number == '' &&
      onboardingCardDataClient.value.addressShipping.apartmentNumber == ''
    ) {
      toast.add({ severity: 'warn', summary: 'Field validation', detail: t('errorNumberDomicileLabel'), life: 14000 })
      validate = false
    }

    if (validate) validate = validatePartOfTheOnboardingForm()

    return validate
  }
  const typeCardSelectString = computed(() => {
    return typeCardSelect.value.join(', ')
  })

  const saveData = () => {
    if (!validateForm()) return

    submitting.value = true

    if (route.path === 'cards/onboarding/reposition/pysical') {
      try {
        const response = createRepositionCard(sendingDataRepositionCard.value)
        useToast().add({ severity: 'success', summary: 'Success', detail: response })
        router.push('/cards/onboarding/reposition/confirmation')
      } catch (e: any) {
        processException(toast, t, e)
      }
      return
    }

    new OnboardingService()
      .updateOnboarding(updateStateOnboardingPersonal())
      .then(() => {
        submitting.value = false

        router.push('/cards/onboarding/step/document-upload')
      })
      .catch(e => {
        submitting.value = false
        processException(toast, t, e)
      })
  }

  const sendingTypeCard = () => {
    submitting.value = true
    onboardingCard(sendingDataCard.value)
      .then(r => {
        submitting.value = false
        toast.add({
          severity: 'success',
          detail: t('msnSuccessCard'),
          life: 4000,
        })
        router.push('/cards/onboarding/step/confirmation')
      })
      .catch(e => {
        submitting.value = false
        processException(toast, t, e)
      })
  }

  const stepperItems = ref([
    {
      label: 'Data Request',
      to: '/cards/onboarding/step/user-data',
    },
    {
      label: 'Ducument Upload',
      to: '/cards/onboarding/step/document-upload',
    },
    {
      label: 'confirmation',
      to: '/cards/onboarding/step/confirmation',
    },
  ])

  watch(
    () => currentStepIndex.value,
    pageIndex => {
      router.push(stepperItems.value[pageIndex].to)
    }
  )

  const updateStateOnboardingPersonal = () => {
    setAddressShipping(onboardingCardDataClient.value.addressShipping)
    setNationality(onboardingCardDataClient.value.nationality)
    setDocumentExpirationDate(onboardingCardDataClient.value.documentExpirationDate)
    setDNI(onboardingCardDataClient.value.dni)
    return onboardingPersonal.value
  }

  const toBack = () => {
    router.go(-1)
  }

  const nextStep2 = () => {
    currentStepIndex.value = 1
  }

  const nextStep3 = () => {
    currentStepIndex.value = 2
  }

  return {
    validatePartOfTheOnboardingForm,
    currentStepIndex,
    stepperItems,
    typeCardSelectString,
    domicileNumber,
    onChangeDomicileHandler,
    nextStepUserData,
    toBack,
    nextStep2,
    nextStep3,
    saveData,
    submitting,
    onboardingCardDataClient,
    domicileOptions,
    typeCardSelect,
    sendingTypeCard,
    onboardingPersonal,
    getDateBirth,
  }
}
