import { onMounted, ref } from 'vue'
import { useWithdrawInternal } from '../../../../withdraw/fiat/internal/composable/useWithdrawInternal'
import { Asset, AssetClassification } from '../../../../deposit/types/asset.interface'
import { useAssets } from '../../../../../composables/useAssets'
import { useWithdraw } from '../../../../withdraw/composable/useWithdraw'

const submitting = ref(false)
export const useMobileWithdrawalInternalFiat = () => {
  const assetCodeSelected = ref({ code: '', icon: '', name: '', assetClassification: '' })
  const { balance, fee, goBack, makeFiatInternalTransfer, selectedAsset, assetCodeFiat } = useWithdrawInternal()
  const { isValidFormWithdrawal } = useWithdraw()

  const visible = ref(false)
  const assetsFiat = ref<Asset[]>([])
  const { listAssets } = useAssets()
  const assets = () => {
    assetsFiat.value = listAssets.value.filter(asset => asset.assetClassification === AssetClassification.FIAT)
  }
  onMounted(() => {
    assets()
  })

  return {
    balance,
    fee,
    goBack,
    isValidFormWithdrawal,
    assetCodeSelected,
    visible,
    assetsFiat,
    makeFiatInternalTransfer,
    submitting,
    selectedAsset,
    assetCodeFiat,
  }
}
