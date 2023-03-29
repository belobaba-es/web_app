export interface HistoricTransactionsResponse {
  nextPag: string
  prevPag: string
  count: number
  results: ListTransactionPgType[]
}

export type ListTransactionPgType = {
  id: string
  accountId: string
  accountNumber?: string
  accountTo?: string
  assetCode: string
  assetCodeTo?: string
  assetType: string
  assetTransferMethod?: string
  amount: number
  bankName?: string
  emailTo?: string
  fundsTransferMethod?: string
  isInternal: boolean
  nameTo?: string
  reference: string
  transactionType: TransactionTypeEnum
  transactionId: string
  status: WithdrawalStatusEnum
  createdAt: any
  updatedAt?: any
}

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
  accountId: string
  assetCode?: string
  assetType?: 'FIAT' | 'ASSET' | ''
  initDoc?: string
  nameTo?: string
  startDate?: string
  next?: string
  endDate?: string
  transactionType?: TransactionTypeEnum | ''
}

export type TransactionFiltersQueryTypeKeys = keyof TransactionFiltersQueryType
