import { ref } from 'vue'
import { Asset, AssetClassification } from '../views/deposit/types/asset.interface'
import { AssetsService } from '../views/deposit/services/assets'

const listAssets = ref<Asset[]>([])

export const useAssets = () => {
  const getAssets = async () => {
    await new AssetsService()
      .list()
      .then((assets: Asset[]) => {
        listAssets.value = assets
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getAssetByAssetId = (assetId: string): Asset | undefined => {
    return listAssets.value.find((asset: Asset) => asset.assetId === assetId)
  }

  const getAssetByAssetCode = (assetCode: string): Asset => {
    const asset = listAssets.value.find((asset: Asset) => asset.code === assetCode)
    if (!asset) {
      throw new Error(`Asset with code ${assetCode} not found`)
    }
    return asset
  }

  const formatAmountAccordingTypeAsset = (amount: number, assetCode: string) => {
    const asset = getAssetByAssetCode(assetCode)
    if (asset?.assetClassification === AssetClassification.CRYPTO) {
      return ` ${amount.toLocaleString('de-DE', {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      })} ${asset.code}`
    }
    return `${amount.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${asset?.code}`
  }
  const getAssetByAssetClassification = (assetClassification: string): Asset => {
    const asset = listAssets.value.find((asset: Asset) => asset.assetClassification === assetClassification)
    if (!asset) {
      throw new Error(`Asset with assetClassification ${assetClassification} not found`)
    }
    return asset
  }
  return {
    listAssets,
    getAssetByAssetId,
    formatAmountAccordingTypeAsset,
    getAssets,
    getAssetByAssetCode,
    getAssetByAssetClassification,
  }
}
