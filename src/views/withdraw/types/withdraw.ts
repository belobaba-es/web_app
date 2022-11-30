export interface WithdrawForm {
  name: string
  email: string
  amount: string
  reference: string
  accountId: string
  [key: string]: string
}

export type MakeFiatInternalTransfer = {
  amount: string
  accountDestination: string
  reference: string
}

export type MakeAssetInternalTransfer = {
  amount: string
  accountDestination: string
  assetId: string
  reference: string
}
