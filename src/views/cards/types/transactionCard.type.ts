import { TypesCardOperations } from '../enums/typesCardOperations.enum'
import { ReasonRejectingTransaction } from '../enums/reasonRejectingTransaction.enum'
import { TransactionCardStatus } from '../enums/transactionCardStatus.enum'

export type TransactionCard = {
  amount: number
  createdAt: Date
  currency: string
  cardId: string
  operationType: TypesCardOperations
  reasonRejectingTransaction?: ReasonRejectingTransaction
  description?: string
  status: TransactionCardStatus
  transactionId: string
}
