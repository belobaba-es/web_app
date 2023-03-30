import { BeneficiaryService } from '../services/beneficiary'
import { ref } from 'vue'
import { BeneficiaryType } from '../types/beneficiary.interface'

export const useBeneficiary = () => {
  const listBeneficiary = ref<any[]>([])
  const listNextPag = ref('')
  const submitting = ref(false)

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

  return {
    fetchBeneficiariesAssets,
    submitting,
    listNextPag,
    listBeneficiary,
    fetchBeneficiaries,
  }
}
