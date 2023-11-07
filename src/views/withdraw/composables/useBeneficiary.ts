import { BeneficiaryService } from '../services/beneficiary'
import { ref } from 'vue'
import { Beneficiary, BeneficiaryType } from '../types/beneficiary.interface'
import { UserAccount } from '../types/account'

export enum TypeBeneficiaryInternal {
  ASSET = 'ASSET',
  FIAT = 'BANKING',
}

export const useBeneficiary = () => {
  const listBeneficiary = ref<Beneficiary[]>([])
  const listNextPag = ref(1)
  const submitting = ref(false)
  const nextPag = ref(1)
  const listBeneficiariesInternal = ref<UserAccount[]>()

  const fetchBeneficiaries = async (beneficiaryType: BeneficiaryType) => {
    submitting.value = true

    await new BeneficiaryService().listBeneficiaryBankingExternal(beneficiaryType, listNextPag.value).then(resp => {
      resp.results.forEach((element: any) => {
        listBeneficiary.value.push(element)
      })
      submitting.value = false
      listNextPag.value = Number(resp.nextPag)
    })
  }

  const fetchBeneficiariesAssets = async () => {
    await new BeneficiaryService().listBeneficiaryAssets(listNextPag.value).then(resp => {
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
      })
    }

    listBeneficiariesInternal.value = list
  }

  return {
    fetchBeneficiariesInternal,
    fetchBeneficiariesAssets,
    nextPag,
    submitting,
    listNextPag,
    listBeneficiary,
    listBeneficiariesInternal,
    fetchBeneficiaries,
  }
}
