import { Asset } from '../views/deposit/types/asset.interface'

export const getAsset = (assetId: string, listAsset: Asset[] = []): Asset => {
  return listAsset.filter(asset => asset.assetId === assetId)[0]
}
