import { BeneficiaryService } from '../services/beneficiary'
import { ref } from 'vue'
import { BeneficiaryInternal, BeneficiaryType } from '../types/beneficiary.interface'
import { useUserStore } from '../../../stores/user'
import { AccountService } from '../../../shared/services/account'

export enum TypeBeneficiaryInternal {
  ASSET = 'ASSET',
  FIAT = 'USD',
}

export const useBeneficiary = () => {
  const listBeneficiary = ref<any[]>([])
  const listNextPag = ref('')
  const submitting = ref(false)
  const nextPag = ref(0)
  const listBeneficiariesInternal = ref<BeneficiaryInternal[]>()

  const { getUserName, getUser } = useUserStore()

  const fetchBeneficiaries = async (beneficiaryType: BeneficiaryType) => {
    submitting.value = true

    const beneficiaryService = BeneficiaryService.instance()
    await beneficiaryService.listBeneficiary(beneficiaryType, listNextPag.value).then(resp => {
      const userName = getUserName()

      resp.results.forEach(element => {
        if (userName === element.realName) {
          listBeneficiary.value.push(element)
        }
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

  const fetchBeneficiariesInternal = async (type: TypeBeneficiaryInternal): Promise<void> => {
    submitting.value = true
    // load just pintosoft account
    if (getUser.accountId !== import.meta.env.VITE_PINTTOSOFT_ACCOUNT) {
      const accountService = AccountService.instance()
      listBeneficiariesInternal.value = []
      await accountService.getAccountByEmail(import.meta.env.VITE_PINTTOSOFT_EMAIL).then(resp => {
        listBeneficiariesInternal.value = [resp as BeneficiaryInternal]
      })
      submitting.value = false

      return
    }

    const result = await BeneficiaryService.instance().listBeneficiaryInternal(type, nextPag.value)

    nextPag.value = Number(result.nextPag === null ? 0 : result.nextPag)

    submitting.value = false

    listBeneficiariesInternal.value = result.results
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
