import { ref } from 'vue'
import { Asset, AssetClassification } from '../views/deposit/types/asset.interface'
import { AssetsService } from '../views/deposit/services/assets'
import { processException } from '../shared/processException'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const listAssets = ref<Asset[]>([])

export const useAssets = () => {
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const getAssets = async () => {
    await new AssetsService()
      .list()
      .then((assets: Asset[]) => {
        listAssets.value = assets
      })
      .catch(error => {
        processException(toast, t, error)
      })
  }

  const getAssetByAssetId = (assetId: string): Asset | undefined => {
    return listAssets.value.find((asset: Asset) => asset.assetId === assetId)
  }

  const getAssetByAssetCode = (assetCode: string): Asset | undefined => {
    return listAssets.value.find((asset: Asset) => asset.code === assetCode)
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
