export type ExchangePairs = {
  pairId: string
  provider: string
  sourceAssetCode: string
  supportedAssetCodes: string[]
  minAmount: number
  maxAmount: number
  createdAt: Date
}
