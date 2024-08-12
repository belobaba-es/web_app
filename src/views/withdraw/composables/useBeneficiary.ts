import { BeneficiaryService } from '../services/beneficiary'
import { Ref, ref } from 'vue'
import {
  Beneficiary,
  BeneficiaryAchPanama,
  BeneficiaryType,
  CounterpartyStatus,
  NetworkBank,
} from '../types/beneficiary.interface'
import { UserAccount } from '../types/account'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

export enum TypeBeneficiaryInternal {
  ASSET = 'ASSET',
  FIAT = 'BANKING',
}

export type networkBankOptionType = {
  name: string
  code: NetworkBank
}

const typeNetworkBankBeneficiary: Ref<NetworkBank | undefined> = ref(NetworkBank.WIRE)
const networkBankOptions: Ref<networkBankOptionType[]> = ref([
  {
    name: 'Wire',
    code: NetworkBank.WIRE,
  },
  {
    name: 'ACH',
    code: NetworkBank.ACH,
  },
])

const isDomestic = ref(false)

export const useBeneficiary = () => {
  const listBeneficiary = ref<Beneficiary[]>([])
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const listBeneficiaryAchPanama = ref<BeneficiaryAchPanama[]>([])
  const listNextPag = ref(1)
  const submitting = ref(false)
  const nextPag = ref(1)
  const listBeneficiariesInternal = ref<UserAccount[]>()

  const fetchBeneficiaries = async (beneficiaryType: BeneficiaryType, isFirstLoad: boolean = true) => {
    submitting.value = true
    await new BeneficiaryService()
      .listBeneficiaryBankingExternal(beneficiaryType, listNextPag.value, typeNetworkBankBeneficiary.value)
      .then(resp => {
        if (!isFirstLoad) {
          resp.results.forEach((element: any) => {
            listBeneficiary.value.push(element)
          })
        }

        if (isFirstLoad) {
          listBeneficiary.value = resp.results
        }
        submitting.value = false
        listNextPag.value = Number(resp.nextPag)
      })
  }

  const fetchBeneficiariesAchPanama = async () => {
    submitting.value = true
    try {
      new BeneficiaryService().listBeneficiaryAchPanama().then(resp => {
        resp.results.forEach((element: any) => {
          listBeneficiaryAchPanama.value.push(element)
        })
        submitting.value = false
        listNextPag.value = Number(resp.nextPag)
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Something went wrong',
        detail: 'Please try again later',
        life: 4000,
      })
    }
  }

  const fetchBeneficiariesAssets = async () => {
    new BeneficiaryService().listBeneficiaryAssets(listNextPag.value).then(resp => {
      resp.results.forEach(element => {
        listBeneficiary.value.push(element)
      })
      listBeneficiary.value = resp.results
      submitting.value = false
      listNextPag.value = Number(resp.nextPag)
    })
  }

  const fetchBeneficiariesInternal = async (type: TypeBeneficiaryInternal): Promise<void> => {
    submitting.value = true

    const result = await new BeneficiaryService().listBeneficiaryInternal(type, nextPag.value)

    nextPag.value = Number(result.nextPag === null ? 0 : result.nextPag)

    submitting.value = false

    const list = []
    for (const listElement of result.results) {
      list.push({
        name: listElement.informationOwner.name,
        clientId: listElement.counterpartyId,
        email: listElement.informationOwner.email,
      })
    }

    listBeneficiariesInternal.value = list
  }

  const fetchBeneficiariesInternalV2 = async (type: TypeBeneficiaryInternal): Promise<void> => {
    submitting.value = true

    const result = await new BeneficiaryService().listBeneficiaryInternalV2(type, nextPag.value)

    nextPag.value = Number(result.nextPag === null ? 0 : result.nextPag)

    submitting.value = false

    const list = []
    for (const listElement of result.results) {
      list.push({
        name: listElement.informationOwner.name,
        clientId: listElement.counterpartyId,
        email: listElement.informationOwner.email,
      })
    }

    listBeneficiariesInternal.value = list
  }

  const getBeneficiaryStatusColor = (status: CounterpartyStatus) => {
    switch (status) {
      case 'ACTIVE':
        return '#00beb0'
      case 'REJECTED':
        return 'red'
      case 'PENDING':
        return '#b1b115'
      default:
        return 'black'
    }
  }

  return {
    fetchBeneficiariesInternal,
    fetchBeneficiariesInternalV2,
    fetchBeneficiariesAssets,
    fetchBeneficiariesAchPanama,
    nextPag,
    submitting,
    listNextPag,
    listBeneficiary,
    listBeneficiaryAchPanama,
    listBeneficiariesInternal,
    fetchBeneficiaries,
    getBeneficiaryStatusColor,
    typeNetworkBankBeneficiary,
    networkBankOptions,
    isDomestic,
  }
}
