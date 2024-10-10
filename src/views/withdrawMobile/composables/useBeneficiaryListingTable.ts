import { ref } from 'vue'
import { CounterpartyStatus } from '../../withdraw/enums/beneficiary.enum'
import { Beneficiary } from '../../withdraw/type/beneficiary.type'

const currentPage = ref(1)
export const useBeneficiaryListTable = (emit: any) => {
  const getIcon = (assetIcon: string) => {
    return ` background: url(${assetIcon}); width: 30px; height: 30px; background-size: cover;`
  }
  const getBeneficiaryStatusColor = (status: CounterpartyStatus) => {
    switch (status) {
      case CounterpartyStatus.ACTIVE:
        return { backgroundColor: '#18f98c', color: '#333434' }
      case CounterpartyStatus.REGISTERED:
        return { backgroundColor: '#F44336', color: '#ffffff' }
      case CounterpartyStatus.REJECTED:
        return { backgroundColor: '#F44336D4', color: '#ffffff' }
      case CounterpartyStatus.PENDING:
        return { backgroundColor: '#FFF95D', color: '#6D6D6D' }
      default:
        return { backgroundColor: 'black', color: '#ffffff' }
    }
  }
  const searchNextPage = (currentPage: number) => {
    emit('searchNextPage', currentPage)
  }
  const searchPrevPage = (currentPage: number) => {
    emit('searchPrevPage', currentPage)
  }
  const searchUpdatePageRange = (itemPage: number) => {
    emit('searchUpdatePageRange', itemPage)
  }
  const onSearch = (searchText: string) => {
    emit('onSearch', searchText)
  }
  const onChangeOfSearch = (searchText: string) => {
    emit('onChange', searchText)
  }
  const editBeneficiary = (counterparty: Beneficiary) => {
    emit('editBeneficiary', counterparty)
  }
  const makeWithdrawal = (counterpartyId: string) => {
    emit('makeWithdrawal', counterpartyId)
  }
  return {
    currentPage,
    emit,
    getIcon,
    getBeneficiaryStatusColor,
    searchNextPage,
    searchPrevPage,
    searchUpdatePageRange,
    onSearch,
    onChangeOfSearch,
    editBeneficiary,
    makeWithdrawal,
  }
}
