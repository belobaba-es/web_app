import { ref } from 'vue'
import { Asset, AssetClassification } from '../views/deposit/types/asset.interface'
import { AssetsService } from '../views/deposit/services/assets'
import { processException } from '../shared/processException'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const listAssets = ref<Asset[]>([])

export const useAssets = () => {
  const toast = useToast()
  const { t, locale } = useI18n({ useScope: 'global' })
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

  const getAssetByAssetCode = (assetCode: string): Asset => {
    const asset = listAssets.value.find((asset: Asset) => asset.code === assetCode)
    if (!asset) {
      throw new Error(`Asset with code ${assetCode} not found`)
    }
    return asset
  }

  const formatAmountAccordingTypeAsset = (amount: number, assetCode: string) => {
    const asset = getAssetByAssetCode(assetCode)
    const decimalSeparator = locale.value === 'en' ? '.' : ','
    const thousandSeparator = locale.value === 'en' ? ',' : '.'

    const formattedAmount =
      asset?.assetClassification === AssetClassification.CRYPTO
        ? amount.toFixed(8)
        : amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    return formattedAmount.replace('.', decimalSeparator)
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
