import { BeneficiaryService } from '../services/beneficiary'
import { ref } from 'vue'
import { BeneficiaryInternal, BeneficiaryType } from '../types/beneficiary.interface'

export enum TypeBeneficiaryInternal {
  ASSET = 'ASSET',
  FIAT = 'USD',
}

export const useBeneficiary = () => {
  const listBeneficiary = ref<any[]>([])
  const listNextPag = ref('')
  const submitting = ref(false)
  const nextPag = ref(0)

  const fetchBeneficiaries = async (beneficiaryType: BeneficiaryType) => {
    submitting.value = true

    const beneficiaryService = BeneficiaryService.instance()
    await beneficiaryService.listBeneficiary(beneficiaryType, listNextPag.value).then(resp => {
      resp.results.forEach(element => {
        listBeneficiary.value.push(element)
      })
      submitting.value = false
      listNextPag.value = resp.nextPag.replace('?', '')
    })
  }

  const fetchBeneficiariesAssets = async () => {
    const beneficiaryService = BeneficiaryService.instance()
    await beneficiaryService.listBeneficiaryAssets(listNextPag.value).then(resp => {
      resp.results.forEach(element => {
        listBeneficiary.value.push(element)
      })
      listBeneficiary.value = resp.results
      submitting.value = false
      listNextPag.value = resp.nextPag.replace('?', '')
    })
  }

  const fetchBeneficiariesInternal = async (type: TypeBeneficiaryInternal): Promise<BeneficiaryInternal[]> => {
    submitting.value = true

    const result = await BeneficiaryService.instance().listBeneficiaryInternal(type, nextPag.value)

    nextPag.value = Number(result.nextPag === null ? 0 : result.nextPag)

    submitting.value = false

    return result.results
  }

  return {
    fetchBeneficiariesInternal,
    fetchBeneficiariesAssets,
    nextPag,
    submitting,
    listNextPag,
    listBeneficiary,
    fetchBeneficiaries,
  }
}
