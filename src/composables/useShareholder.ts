import { computed, ref, watch } from 'vue'
import { Partner } from '../types/onboardingCompany'
import { validateObject } from '../shared/validateObject'
import { useToast } from 'primevue/usetoast'
import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { useOnboardingCompany } from './useOnboardingCompany'
import { useRoute, useRouter } from 'vue-router'

export const useShareholder = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const { hasPartner, getPartners } = useOnboardingCompany()
  const { addNewPartner } = useOnboardingCompanyStore()
  const initStatePartner = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
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
  }

  const partner = ref<Partner>(initStatePartner)

  const validateShareholder = (): boolean => {
    const fieldsToValidate: any = {
      firstName: partner.value.firstName,
      lastName: partner.value.lastName,
      email: partner.value.email,
      dateBirth: partner.value.dateBirth,
      dni: partner.value.dni,
      phoneCountry: partner.value.phoneCountry,
      phoneNumber: partner.value.phoneNumber,
      streetOne: partner.value.streetOne,
      postalCode: partner.value.postalCode,
      city: partner.value.city,
      region: partner.value.region,
      country: partner.value.country,
    }

    if (!validateObject(toast, fieldsToValidate)) {
      return false
    }

    if (partner.value.passport === '' && partner.value.taxId === '') {
      return false
    }

    return true
  }

  const addNewShareholder = () => {
    if (!validateShareholder()) {
      return
    }

    addNewPartner(partner.value)
    partner.value = initStatePartner

    router.push('/onboarding/business/step2')
  }

  const isShowAddNewShareholder = computed(() => {
    return !hasPartner.value && partner.value.dni === ''
  })

  const onCreateNewShareholder = () => {
    router.push('/onboarding/business/new-shareholder')
  }

  const deleteShareholder = (dni: string) => {}

  const editShareholder = (dni: string) => {
    router.push(`/onboarding/business/edit-shareholder/${dni}`)
  }
  const loadingDataToShareholder = (dni: any) => {
    getPartners().forEach(p => {
      if (p.dni === dni) {
        partner.value = p
      }
    })
  }

  watch(
    () => route.params.dni,
    () => {
      loadingDataToShareholder(route.params.dni)
    }
  )
  return {
    isShowAddNewShareholder,
    partner,
    deleteShareholder,
    editShareholder,
    onCreateNewShareholder,
    addNewShareholder,
  }
}
