import { Asset } from '../views/deposit/types/asset.interface'

export const iconAsset = (assetId: string, listAsset: Asset[] = []): string => {
  if (listAsset.length === 0 || assetId === 'USD') {
    return `https://storage.googleapis.com/noba-dev/USD.svg`
  }

  return listAsset.filter(asset => asset.assetId === assetId)[0].icon
}
