import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useBeneficiaryStore } from '../../../../../../../stores/useBeneficiaryStore'
import { useListBeneficiaryUsa } from '../../../composable/useListBeneficiaryUsa'
import { BankingDomestic, NewBeneficiary } from '../../../../../type/beneficiary.type'
import {
  CounterpartyStatus,
  CounterpartyType,
  NetworkBank,
  TypeBankDetails,
} from '../../../../../enums/beneficiary.enum'
import { BeneficiaryService } from '../../../../../services/beneficiary'
import { processException } from '../../../../../../../shared/processException'
import { useWorld } from '../../../../../../../composables/useWorld'

const setBeneficiaries = useBeneficiaryStore()
const formObjectDomestic = ref<NewBeneficiary>({
  counterpartyId: '',
  status: CounterpartyStatus.PENDING,
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
  informationBank: {
    accountNumber: '',
    bankName: '',
    typeBeneficiaryBankWithdrawal: TypeBankDetails.NATIONAL,
    routingNumber: '',
    networkBank: NetworkBank.ACH || NetworkBank.WIRE,
    address: {
      streetOne: '',
      streetTwo: '',
      postalCode: '',
      city: '',
      region: '',
      country: 'US',
      number: '',
      apartmentNumber: '',
      isShipping: false,
    },
  } as BankingDomestic,
})

const isUpdateBeneficiary = ref<boolean>(false)

export const useNewBeneficiaryDomestic = () => {
  const { t } = useI18n({ useScope: 'global' })
  const { listBeneficiaryUsa, validateShowInputIban, wireLocalType } = useListBeneficiaryUsa()
  const { findCountryByCodeCountry } = useWorld()
  const toast = useToast()
  const router = useRouter()
  const visibleModal = ref<boolean>(false)
  const submitting = ref<boolean>(false)

  const accountType = ref([
    { name: t('CORPORATION'), description: t('CORPORATION') },
    { name: t('INDIVIDUAL'), description: t('INDIVIDUAL') },
  ])

  const itemStepsDomestic = ref<Array<{ label: string; to: string }>>([
    {
      label: t('modalTextAccount'),
      to: `/withdraw/fiat/usa/${wireLocalType.value}/new-beneficiary`,
    },
    {
      label: t('labelDataBeneficiary'),
      to: `/withdraw/fiat/usa/${wireLocalType.value}/new-beneficiary/data-beneficiary`,
    },
  ])

  const saveBeneficiaryDomestic = () => {
    submitting.value = true
    const formData: NewBeneficiary = formObjectDomestic.value

    if (formData.informationBank.typeBeneficiaryBankWithdrawal !== TypeBankDetails.INTERNATIONAL) {
      delete formData.informationIntermediaryBank
    }

    if (!isUpdateBeneficiary.value) {
      delete formData.counterpartyId
    }

    new BeneficiaryService()
      .saveBeneficiary(formData)
      .then(resp => {
        submitting.value = false

        if (!isUpdateBeneficiary.value) {
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
        clearFormFiatBeneficiary()
        visibleModal.value = true
      })
      .catch(e => {
        visibleModal.value = false
        submitting.value = false
        processException(toast, t, e)
      })
  }

  const clearFormFiatBeneficiary = () => {
    formObjectDomestic.value = {
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
      informationBank: {
        accountNumber: '',
        bankName: '',
        typeBeneficiaryBankWithdrawal: TypeBankDetails.NATIONAL,
        routingNumber: '',
        networkBank: NetworkBank.ACH || NetworkBank.WIRE,
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: 'US',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      } as BankingDomestic,
    }

    setBeneficiaries.beneficiaries = formObjectDomestic.value
  }

  const nextPage = (event: any) => {
    router.push(itemStepsDomestic.value[event.pageIndex + 1].to)
  }

  const prevPage = (event: any) => {
    router.push(itemStepsDomestic.value[event.pageIndex - 1].to)
  }

  const complete = () => {
    toast.add({
      severity: 'success',
      summary: 'Order submitted',
      detail: `${formObjectDomestic.value.informationOwner.name} your order completed.`,
      life: 4000,
    })

    router.push('/withdraw')
  }

  const editBeneficiaryUsa = (item: NewBeneficiary) => {
    wireLocalType.value = item.informationBank.networkBank

    isUpdateBeneficiary.value = true
    formObjectDomestic.value = item
    formObjectDomestic.value.informationBank.typeBeneficiaryBankWithdrawal = TypeBankDetails.NATIONAL

    const countryAllowUsa = findCountryByCodeCountry(item.informationBank.address.country)

    if (countryAllowUsa) validateShowInputIban(countryAllowUsa.counterpartyType)

    router.push(`/withdraw/fiat/usa/${item.informationBank.networkBank.toUpperCase()}/edit-beneficiary`)
  }

  return {
    isUpdateBeneficiary,
    formObjectDomestic,
    itemStepsDomestic,
    nextPage,
    prevPage,
    complete,
    accountType,
    saveBeneficiaryDomestic,
    submitting,
    visibleModal,
    clearFormFiatBeneficiary,
    editBeneficiaryUsa,
  }
}
