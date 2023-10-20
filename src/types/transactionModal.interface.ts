export interface TransactionModalPayload {
  id?: any
  formatedDate?: any
  feeWire?: any
  isInternal?: boolean
  amount?: any
  assetCode?: string
  nameTo?: any
  assetId?: string
  counterparty?: CounterpartyInfo
  reference?: any
  beneficiary?: any
}
export interface CounterpartyInfo {
  informationOwner: {
    name: string
    country: string
  }
}
