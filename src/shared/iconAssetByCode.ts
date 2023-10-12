import { Asset } from '../views/deposit/types/asset.interface'

export const iconAssetByCode = (assetCode: string, listAsset: Asset[] = []): string => {
  if (listAsset.length === 0 || assetCode === 'USD') {
    return `https://storage.googleapis.com/noba-dev/USD.svg`
  }

  return listAsset.filter(asset => asset.code === assetCode)[0].icon
}
