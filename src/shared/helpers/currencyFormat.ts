import { useI18n } from 'vue-i18n'
import { AssetClassification } from '../../views/deposit/types/asset.interface'

export const currencyFormat = (assetClassification: string, amount: number) => {
  const { locale } = useI18n()
  const decimalSeparator = locale.value === 'en' ? '.' : ','
  const thousandSeparator = locale.value === 'en' ? ',' : '.'

  if (assetClassification === AssetClassification.FIAT || assetClassification === AssetClassification.STABLE) {
    return amount
      .toFixed(2)
      .replace('.', decimalSeparator)
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
  }

  return amount.toFixed(8).replace('.', decimalSeparator)
}
