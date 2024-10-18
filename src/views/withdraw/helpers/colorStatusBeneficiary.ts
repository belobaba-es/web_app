import { CounterpartyStatus } from '../enums/beneficiary.enum'

export default (status: any): string => {
  switch (status) {
    case CounterpartyStatus.REJECTED:
      return 'danger'

    case CounterpartyStatus.ACTIVE:
      return 'success'

    case CounterpartyStatus.PENDING:
      return 'warning'

    default:
      return 'warning'
  }
}
