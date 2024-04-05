import { computed, ref } from 'vue'
import { Partner } from '../types/onboardingCompany'
import { validateObject } from '../shared/validateObject'
import { useToast } from 'primevue/usetoast'
import { useOnboardingCompanyStore } from '../stores/useOnboardingCompanyStore'
import { useOnboardingCompany } from './useOnboardingCompany'
import { useRouter } from 'vue-router'
import showMessage from '../shared/showMessageArray'
import { useAuth } from './useAuth'

export const useShareholder = () => {
  const router = useRouter()
  const toast = useToast()
  const { hasPartner, getPartners, deletePartner, requestToBackendForUpdateOnboardingCompany, fetchDataToClient } = useOnboardingCompany()
  const { addNewPartner } = useOnboardingCompanyStore()
  const dateBirth = ref("")
  const submitting = ref(false)
  const isHaveDocumentUS = ref(true)

  const initStatePartner = () => {
    return {
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
      documents: [],
    }
  }

  const partner = ref<Partner>(initStatePartner())

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

  const typeDocumentPartner = ref([
    { name: 'Yes', key: true },
    { name: 'No', key: false },
  ])

  const addNewShareholder = () => {
    if (!validateShareholder()) {
      return
    }

    addNewPartner(partner.value)
    submitting.value = true
    requestToBackendForUpdateOnboardingCompany()
      .then((resp) => {
        submitting.value = false
        if (partner.value.passport !== '') {
          isHaveDocumentUS.value = false
        }

        console.log('se ejecuta si no hay clientid')
        router.push('/onboarding/business/add-shareholders')

        if (resp.data.clientId) {
          fetchDataToClient(resp.data.clientId)
        }

      })
      .catch(e => {
        console.log(e)
        submitting.value = false
        showMessage(toast, e)
      })
  }

  const isShowAddNewShareholder = computed(() => {
    return !hasPartner.value && partner.value.dni === ''
  })

  const onCreateNewShareholder = () => {
    router.push('/onboarding/business/add-shareholders/new-shareholder')
  }

  const deleteShareholder = (dni: string) => {
    deletePartner(dni)

    submitting.value = true
    requestToBackendForUpdateOnboardingCompany()
      .then(() => {
        router.push('/onboarding/business/add-shareholders')
      })
      .catch(e => {
        submitting.value = false
        showMessage(toast, e.response.data)
      })
  }

  const editShareholder = (dni: string) => {
    router.push(`/onboarding/business/add-shareholders/edit-shareholder/${dni}`)
  }
  const loadingDataToShareholder = (dni: any) => {
    getPartners().forEach(p => {
      if (p.dni === dni) {
        partner.value = p
        dateBirth.value = p.dateBirth
      }
    })
  }

  const redirectToStep2 = () => {
    router.push('/onboarding/business/add-shareholders')
  }

  const showButtonForCancel = (): boolean => {
    return hasPartner.value
  }

  const enableDataForCreateNewShareholder = () => {
    partner.value = initStatePartner()
  }

  return {
    isShowAddNewShareholder,
    partner,
    submitting,
    typeDocumentPartner,
    isHaveDocumentUS,
    dateBirth,
    enableDataForCreateNewShareholder,
    loadingDataToShareholder,
    showButtonForCancel,
    deleteShareholder,
    redirectToStep2,
    editShareholder,
    onCreateNewShareholder,
    addNewShareholder,
  }
}
