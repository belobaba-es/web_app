export interface WalletBalancesType {
  [key: string]: {
    accountId: string
    assetCode: string
    balance: number
    blockedBalance: number
  }
}
