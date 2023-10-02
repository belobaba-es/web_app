export interface HistoricTransactionsResponse {
  nextPag: string
  prevPag: string
  count: number
  results: any[]
  // results: ListTransactionPgType[]
}

type Counterparty = {
  id: string
  clientId: string
  counterpartyId: string
  counterpartyType: string
  informationOwner: {
    name: string
    country: string
  }
  informationWallet: {
    assetId: string
    address: string
    relationshipConsumer: string
    originWallet: string
  }
  createdAt: {
    $date: string
  }
}

export type TransactionHistory = {
  _id?: {
    $oid: string
  }
  amount: number
  assetId: string
  assetCode?: string
  clientId: string
  counterparty?: Counterparty
  createdAt: Date
  isInternal: boolean
  reference: string
  status: string
  transactionId: string
  transactionType: string
  formatedDate?: any
  feeWire: any
}

export type ListTransactionPgType = {}

// export type ListTransactionPgType = {
//   id: string
//   accountId: string
//   accountNumber?: string
//   accountTo?: string
//   assetCode: string
//   assetCodeTo?: string
//   assetType: string
//   assetTransferMethod?: string
//   amount: number
//   bankName?: string
//   emailTo?: string
//   fundsTransferMethod?: string
//   isInternal: boolean
//   nameTo?: string
//   reference: string
//   transactionType: TransactionTypeEnum
//   transactionId: string
//   status: WithdrawalStatusEnum
//   createdAt: any
//   updatedAt?: any
// }

export enum TransactionTypeEnum {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw-funds',
  REVERT = 'revert',
}

export enum WithdrawalStatusEnum {
  PENDING = 'pending',
  IN_PROCESS = 'in_process',
  PROCESSED = 'processed',
  CANCELLED = 'cancelled',
  REVERSED = 'reversed',
}

export interface AtedAt {
  _seconds: number
  _nanoseconds: number
}

export enum Status {
  Cancel = 'cancel',
  Pending = 'pending',
  Process = 'process',
}

export type TransactionFiltersQueryType = {
  clientId: string
  assetCode?: string
  assetType?: 'FIAT' | 'ASSET' | ''
  perPage?: number
  nameTo?: string
  startDate?: string
  page?: number
  endDate?: string
  transactionType?: TransactionTypeEnum | ''
}

export type TransactionFiltersQueryTypeKeys = keyof TransactionFiltersQueryType
