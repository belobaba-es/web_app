import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { NewBeneficiary, NewBeneficiaryPanama } from '../../types/beneficiary.interface'
import { BeneficiaryService } from '../../services/beneficiary'
import showExceptionError from '../../../../shared/showExceptionError'
import showMessage from '../../../../shared/showMessageArray'

const isUpdateBeneficiary = ref<boolean>(false)
const typeBeneficiary = ref<string>('')
const submitting = ref<boolean>(false)
const formObject = ref<NewBeneficiary>({
  counterpartyId: '',
  profileType: 'INDIVIDUAL',
  informationOwner: {
    name: '',
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      region: '',
      city: '',
      country: '',
    },
  },
  informationIntermediaryBank: {
    bankName: '',
    swiftCode: '',
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      region: '',
      city: '',
      country: '',
    },
  },

  informationBank: {
    typeBeneficiaryBankWithdrawal: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
    routingNumber: '',
    iban: '',
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      region: '',
      city: '',
      country: '',
    },
  },
})
const formObjectPanama = ref<NewBeneficiaryPanama>({
  bankName: '',
  accountDestinationNumber: '',
  holderEmail: '',
  productType: '',
  holderId: '',
  holderName: '',
  concept: '',
  isInternal: false,
})

export const useNewOrEditBeneficiary = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const { t } = useI18n({ useScope: 'global' })

  if (route.path.includes('domestic')) {
    typeBeneficiary.value = 'DOMESTIC'
  } else if (route.path.includes('international')) {
    typeBeneficiary.value = 'INTERNATIONAL'
  } else if (route.path.includes('panama')) {
    typeBeneficiary.value = 'PANAMA'
  }
  console.log(typeBeneficiary.value)

  const itemSteps = ref<Array<{ label: string; to: string }>>([])

  if (typeBeneficiary.value.toUpperCase() === 'PANAMA') {
    itemSteps.value.push({
      label: t('informationAccountText'),
      to: `/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}/new`,
    })
  } else {
    itemSteps.value.push(
      {
        label: t('informationAccountText'),
        to: `/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}/new`,
      },
      {
        label: t('beneficiaryInformation'),
        to: `/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}/new/owner`,
      },
      {
        label: t('bankAccountInformation'),
        to: `/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}/new/bank-information`,
      }
    )

    if (typeBeneficiary.value.toUpperCase() === 'INTERNATIONAL') {
      const nuevoItem = {
        label: t('intermediaryBank'),
        to: `/withdraw/fiat/${typeBeneficiary.value}/new/intermediary-bank`,
      }

      itemSteps.value.push(nuevoItem)
    }
  }

  const nextPage = (event: any) => {
    router.push(itemSteps.value[event.pageIndex + 1].to)
  }

  const prevPage = (event: any) => {
    router.push(itemSteps.value[event.pageIndex - 1].to)
  }

  const complete = () => {
    toast.add({
      severity: 'success',
      summary: 'Order submitted',
      detail: formObject.value.informationOwner.name + ' your order completed.',
      life: 4000,
    })

    router.push('/withdraw')
  }

  const setDataBeneficiary = (beneficiary: any) => {
    isUpdateBeneficiary.value = true
    console.log(beneficiary)
    formObject.value = beneficiary
    formObject.value.counterpartyId = beneficiary.counterpartyId

    router.push(`/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}/new`)
  }

  const saveBeneficiary = () => {
    let formData: NewBeneficiary = formObject.value as NewBeneficiary
    if (typeBeneficiary.value !== 'INTERNATIONAL') {
      delete formData.informationIntermediaryBank
    }

    if (!isUpdateBeneficiary.value) {
      delete formData.counterpartyId
    }

    submitting.value = true

    new BeneficiaryService()
      .saveBeneficiary(formData)
      .then(resp => {
        submitting.value = false
        toast.add({
          severity: 'success',
          detail: resp.data.message,
          life: 4000,
        })
        isUpdateBeneficiary.value = false
        router.push(`/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}`)
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
    submitting,
    itemSteps,
    typeBeneficiary,
    formObject,
    formObjectPanama,
    setDataBeneficiary,
    saveBeneficiary,
    complete,
    nextPage,
    prevPage,
  }
}
