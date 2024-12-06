import { SwapService } from '../views/swap/services/swap'
import { ref } from 'vue'
import { ExchangePairs } from '../types/exchangePairs'
import { useAssets } from './useAssets'

const listAssetSupported = ref<{ icon: string; code: string; name: string }[]>([])
const assetsBase = ref<{ icon: string; code: string; name: string }[]>([])
const listPairsAssets = ref<ExchangePairs[]>([])
const loadingPairsAssets = ref<boolean>(false)
const disabledAsset = ref<boolean>(true)
export const useExchangePairs = () => {
  const { getAssetByAssetCode } = useAssets()
  const listAssetPairs = async () => {
    console.log('listAssetPairs')
    loadingPairsAssets.value = true
    await new SwapService().getExchangePairs().then(resp => {
      if (resp.data.length > 0) {
        listPairsAssets.value = resp.data
        const sourceAssetCodes = resp.data.map((item: ExchangePairs) => {
          return {
            name: item.sourceAssetCode,
            value: item.sourceAssetCode,
            icon: getAssetByAssetCode(item.sourceAssetCode)?.icon,
          }
        })
        assetsBase.value = sourceAssetCodes
      }
      loadingPairsAssets.value = false
      disabledAsset.value = false
    })
  }
  const getSupportedAssetsByAssetCode = (assetCode: string): ExchangePairs | undefined => {
    return listPairsAssets.value.find((asset: ExchangePairs) => asset.sourceAssetCode === assetCode)
  }
  const getSupportedAssets = (assetCode: string) => {
    listAssetSupported.value = []
    const listAssets = getSupportedAssetsByAssetCode(assetCode)
    if (listAssets) {
      for (const i in listAssets.supportedAssetCodes) {
        listAssetSupported.value.push({
          icon: getAssetByAssetCode(listAssets.supportedAssetCodes[i])?.icon ?? '',
          code: listAssets.supportedAssetCodes[i],
          name: listAssets.supportedAssetCodes[i],
        })
      }
    }
  }

  return {
    listAssetPairs,
    listPairsAssets,
    assetsBase,
    getSupportedAssetsByAssetCode,
    loadingPairsAssets,
    disabledAsset,
    getSupportedAssets,
    listAssetSupported,
  }
}
