import { Asset } from '../views/deposit/types/asset.interface'

export const iconAsset = (assetCode: string, listAsset: Asset[] = []): string => {
  if (listAsset.length === 0 || assetCode === 'USD') {
    return `https://storage.googleapis.com/noba-dev/${assetCode}.svg`
  }

  return listAsset.filter(a => a.code === assetCode)[0].icon
}
