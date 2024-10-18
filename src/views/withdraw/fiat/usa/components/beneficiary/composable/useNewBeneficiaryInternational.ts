import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { BankingInternational, NewBeneficiary } from '../../../../../type/beneficiary.type'
import {
  CounterpartyStatus,
  CounterpartyType,
  NetworkBank,
  TypeBankDetails,
} from '../../../../../enums/beneficiary.enum'
import { useBeneficiaryStore } from '../../../../../../../stores/useBeneficiaryStore'
import { processException } from '../../../../../../../shared/processException'
import { BeneficiaryService } from '../../../../../services/beneficiary'
import { useListBeneficiaryUsa } from '../../../composable/useListBeneficiaryUsa'
import { useWorld } from '../../../../../../../composables/useWorld'

const routingNumberOrIBAN = ref<string>('')

const setBeneficiaries = useBeneficiaryStore()
const isUpdateBeneficiaryInternational = ref<boolean>(false)
const isAchUs = ref<boolean>(false)
const typeBeneficiary = ref<string>('')
const submitting = ref<boolean>(false)
const modalStepActivation = ref<boolean>(false)
const formObject = ref<NewBeneficiary>({
  status: CounterpartyStatus.PENDING,
  counterpartyId: '',
  profileType: 'INDIVIDUAL',
  relationshipConsumer: '',

  informationOwner: {
    name: '',
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
      number: '',
      apartmentNumber: '',
      isShipping: false,
    },
  },

  informationIntermediaryBank: {
    bankName: '',
    swiftCode: '',
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
      number: '',
      apartmentNumber: '',
      isShipping: false,
    },
  },

  informationBank: {
    accountNumber: '',
    bankName: '',
    swiftCode: '',
    typeBeneficiaryBankWithdrawal: TypeBankDetails.INTERNATIONAL,
    iban: '',
    networkBank: NetworkBank.SWIFT,
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
      number: '',
      apartmentNumber: '',
      isShipping: false,
    },
  } as BankingInternational,
})

export const useNewBeneficiaryInternational = () => {
  const router = useRouter()
  const { listBeneficiaryUsa, validateShowInputIban } = useListBeneficiaryUsa()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const { findCountryByCodeCountry } = useWorld()

  const itemSteps = ref<Array<{ label: string; to: string }>>([])
  itemSteps.value.push(
    {
      label: t('modalTextAccount'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary`,
    },
    {
      label: t('labelDataBeneficiary'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary/step-data-beneficiary`,
    },
    {
      label: t('intermediaryBank'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary/bank-intermediary`,
    }
  )

  const addIntermediaryBankStep = () => {
    modalStepActivation.value = false
    router.push(`/withdraw/fiat/usa/swift/new-beneficiary/bank-intermediary`)
  }

  const accountType = ref([
    { name: t('CORPORATION'), description: t('CORPORATION') },
    { name: t('INDIVIDUAL'), description: t('INDIVIDUAL') },
  ])

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

  const saveBeneficiary = () => {
    modalStepActivation.value = false

    let formData: NewBeneficiary = formObject.value as NewBeneficiary

    if (!isUpdateBeneficiaryInternational.value) {
      delete formData.counterpartyId
    }

    submitting.value = true

    new BeneficiaryService()
      .saveBeneficiary(formData)
      .then(resp => {
        submitting.value = false

        if (!isUpdateBeneficiaryInternational.value) {
          const newBeneficiary = {
            accountId: '',
            assetCode: '',
            assetIcon: '',
            assetId: '',
            clientId: '',
            counterpartyId: '',
            counterpartyType: CounterpartyType.FIAT,
            createdAt: '',
            informationBank: {
              accountNumber: formData.informationBank.accountNumber,
              address: {
                city: formData.informationBank.address.city,
                country: formData.informationBank.address.country,
                postalCode: parseInt(formData.informationBank.address.postalCode),
                region: formData.informationBank.address.region,
                streetOne: formData.informationBank.address.streetOne,
                streetTwo: formData.informationBank.address.streetTwo,
              },
              bankName: formData.informationBank.bankName,
              networkBank: formData.informationBank.networkBank,
            },
            informationOwner: {
              address: {
                city: formData.informationBank.address.city,
                country: formData.informationBank.address.country,
                postalCode: parseInt(formData.informationBank.address.postalCode),
                region: formData.informationBank.address.region,
                streetOne: formData.informationBank.address.streetOne,
                streetTwo: formData.informationBank.address.streetTwo,
              },
              name: formData.informationOwner.name,
              counterpartyId: '',
              email: '',
              country: '',
            },
            informationWallet: {
              assetId: '',
              address: '',
              relationshipConsumer: '',
              originWallet: '',
              institutionName: '',
              institutionAddress: {
                streetOne: '',
                postalCode: '',
                city: '',
                region: '',
                country: '',
              },
            },
            status: CounterpartyStatus.PENDING,
            isInternal: 'S',
            networkBank: [],
          }

          listBeneficiaryUsa.value.unshift(newBeneficiary)
        }

        toast.add({
          severity: 'success',
          detail: resp.data.message,
          life: 4000,
        })
        isUpdateBeneficiaryInternational.value = false
        clearFormFiatBeneficiary()
        router.push('/withdraw/fiat/usa/')
      })
      .catch(e => {
        submitting.value = false
        processException(toast, t, e)
      })
  }

  const clearFormFiatBeneficiary = () => {
    formObject.value = {
      counterpartyId: '',
      profileType: 'INDIVIDUAL',
      relationshipConsumer: '',

      informationOwner: {
        name: '',
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      },

      informationIntermediaryBank: {
        bankName: '',
        swiftCode: '',
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      },

      informationBank: {
        accountNumber: '',
        bankName: '',
        swiftCode: '',
        typeBeneficiaryBankWithdrawal: TypeBankDetails.INTERNATIONAL,
        iban: '',
        networkBank: NetworkBank.SWIFT,
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: formObject.value.informationBank.address.country,
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      } as BankingInternational,
    }

    setBeneficiaries.beneficiaries = formObject.value
  }

  const editBeneficiaryUsaSwift = (item: NewBeneficiary) => {
    isUpdateBeneficiaryInternational.value = true
    formObject.value = item
    formObject.value.informationBank.typeBeneficiaryBankWithdrawal = TypeBankDetails.INTERNATIONAL

    const countryAllowUsa = findCountryByCodeCountry(item.informationBank.address.country)

    if (countryAllowUsa) validateShowInputIban(countryAllowUsa.counterpartyType)

    router.push(`/withdraw/fiat/usa/${item.informationBank.networkBank.toUpperCase()}/edit-beneficiary`)
  }

  return {
    submitting,
    itemSteps,
    typeBeneficiary,
    formObject,
    routingNumberOrIBAN,
    isAchUs,
    saveBeneficiary,
    complete,
    nextPage,
    prevPage,
    isUpdateBeneficiaryInternational,
    editBeneficiaryUsaSwift,
    accountType,
    modalStepActivation,
    clearFormFiatBeneficiary,
    addIntermediaryBankStep,
  }
}
