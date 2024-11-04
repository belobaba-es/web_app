export interface WithdrawForm {
  name: string
  email: string
  amount: string
  reference: string
  accountId: string
  typeTransaction: string

  [key: string]: string
}

export type MakeFiatInternalTransfer = {
  amount: number
  clientIdDestination: string
  reference: string
  assetCode?: string
  purpose: string
}

export type MakeFiatExternalTransfer = {
  amount: number
  beneficiaryId: string
  reference: string
  assetCode?: string
  purpose: string
}

export type MakeFiatTransfer = {
  amount: number
  beneficiaryId: string
  reference: string
  purpose: string
  assetCode: string
  clientIdDestination: string
}

export type MakeAssetInternalTransfer = {
  amount: number
  clientIdDestination: string
  assetCode?: string
  reference: string
  purpose: string
}

export type MakeAssetExternalTransfer = {
  amount: number
  beneficiaryAssetId: string
  reference: string
  purpose: string
}
export type MakeAssetTransfer = {
  amount: number
  assetCode: string
  beneficiaryAssetId: string
  clientIdDestination: string
  purpose: string
  reference: string
}

export type CalculateFee = {
  amount: number
  assetCode: string
  destinationClientId?: string
  destinationCounterpartyId?: string
}

export type Fee = {
  fee: number
  assetCode: string
}
