import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { NewBeneficiary } from '../../types/beneficiary.interface'

const formObject = ref<NewBeneficiary>({
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

export const useNewOrEditBeneficiary = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const typeBeneficiary = ref<string>('')
  const { t } = useI18n({ useScope: 'global' })

  const itemSteps = ref([
    {
      label: t('informationAccountText'),
      to: `/withdraw/fiat/international/new`,
    },
    {
      label: t('beneficiaryInformation'),
      to: `/withdraw/fiat/international/new/owner`,
    },
    {
      label: t('bankAccountInformation'),
      to: `/withdraw/fiat/international/new/bank-information`,
    },
  ])

  if (route.path.includes('domestic')) {
    typeBeneficiary.value = 'DOMESTIC'
  } else if (route.path.includes('international')) {
    typeBeneficiary.value = 'INTERNATIONAL'

    const nuevoItem = {
      label: t('intermediaryBank'),
      to: `/withdraw/fiat/international/new/intermediary-bank`,
    }

    itemSteps.value.splice(itemSteps.value.length - 1, 0, nuevoItem)
  }

  const nextPage = (event: any) => {
    // for (let field in event.formData) {
    //   formObject.value[field] = event.formData[field]
    // }

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

  return {
    itemSteps,
    typeBeneficiary,
    formObject,
    complete,
    nextPage,
    prevPage,
  }
}
