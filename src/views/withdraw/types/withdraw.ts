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
  amount: string
  clientIdDestination: string
  reference: string
}

export type MakeFiatExternalTransfer = {
  amount: number
  beneficiaryId: string
  reference: string
}

export type MakeAssetInternalTransfer = {
  amount: string
  clientIdDestination: string
  assetCode: string
  reference: string
}

export type MakeAssetExternalTransfer = {
  amount: number
  beneficiaryAssetId: string
  reference: string
  purpose: string
}
