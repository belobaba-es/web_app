import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { NetworkBank, NewBeneficiary } from '../../types/beneficiary.interface'
import { BeneficiaryService } from '../../services/beneficiary'
import showExceptionError from '../../../../shared/showExceptionError'
import showMessage from '../../../../shared/showMessageArray'

const routingNumberOrIBAN = ref<string>('')
const isUpdateBeneficiary = ref<boolean>(false)
const isAchUs = ref<boolean>(false)
const typeBeneficiary = ref<string>('')
const submitting = ref<boolean>(false)
const formObject = ref<NewBeneficiary>({
  counterpartyId: '',
  profileType: 'INDIVIDUAL',
  relationToBeneficiary: '',
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
    networkBank: '',
    typeBeneficiaryBankWithdrawal: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
    routingNumber: '',
    abaAch: '',
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
  bankNetworks: [],
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
  }

  const itemSteps = ref<Array<{ label: string; to: string }>>([])

  if (typeBeneficiary.value.toUpperCase() === 'DOMESTIC') {
    itemSteps.value.push(
      {
        label: t('informationAccountText'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new`,
      },
      {
        label: t('beneficiaryInformation'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new/owner`,
      },
      {
        label: t('bankAccountInformation'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new/bank-information`,
      }
    )
  } else {
    itemSteps.value.push(
      {
        label: t('informationAccountText'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new`,
      },
      {
        label: t('beneficiaryInformation'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new/owner`,
      },
      {
        label: t('intermediaryBank'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value}/new/intermediary-bank`,
      },
      {
        label: t('bankAccountInformation'),
        to: `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new/bank-information`,
      }
    )
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
    beneficiary.bankNetworks = []

    isUpdateBeneficiary.value = true
    formObject.value = beneficiary
    formObject.value.counterpartyId = beneficiary.counterpartyId

    if (!beneficiary.informationBank.routingNumber) {
      routingNumberOrIBAN.value = beneficiary.informationBank.iban
      beneficiary.bankNetworks = []
      beneficiary.bankNetworks.push(NetworkBank.SWIFT)
    } else {
      routingNumberOrIBAN.value = beneficiary.informationBank.routingNumber

      if (isUpdateBeneficiary.value) {
        if (beneficiary.informationBank.networkBank === NetworkBank.ACH) {
          isAchUs.value = beneficiary.informationBank.networkBank === NetworkBank.ACH
          beneficiary.bankNetworks = []
          beneficiary.bankNetworks.push(NetworkBank.ACH)
        }

        if (beneficiary.informationBank.networkBank === NetworkBank.WIRE) {
          isAchUs.value = false
          beneficiary.bankNetworks = []
          beneficiary.bankNetworks.push(NetworkBank.WIRE)
        }
      }
    }

    formObject.value = beneficiary

    router.push(`/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}/new`)
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
        clearFormFiatBeneficiary()
        window.location.href = `/withdraw/usa/fiat/${typeBeneficiary.value.toLowerCase()}`
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

  const clearFormFiatBeneficiary = () => {
    formObject.value = {
      counterpartyId: '',
      profileType: 'INDIVIDUAL',
      relationToBeneficiary: '',
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
        networkBank: '',
        typeBeneficiaryBankWithdrawal: '',
        accountNumber: '',
        bankName: '',
        swiftCode: '',
        routingNumber: '',
        abaAch: '',
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
      bankNetworks: [],
    }
  }

  return {
    submitting,
    itemSteps,
    typeBeneficiary,
    formObject,
    routingNumberOrIBAN,
    setDataBeneficiary,
    saveBeneficiary,
    complete,
    nextPage,
    prevPage,
    isUpdateBeneficiary,
    isAchUs,
    clearFormFiatBeneficiary,
  }
}
