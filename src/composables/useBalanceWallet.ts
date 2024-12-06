import { useBalanceWalletStore } from '../stores/balanceWallets'
import { storeToRefs } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { AssetsService } from '../views/deposit/services/assets'
import { processException } from '../shared/processException'
import { useToast } from 'primevue/usetoast'

export const useBalanceWallet = () => {
  const { locale } = useI18n()
  const balanceWalletStore = useBalanceWalletStore()
  const { isExistsWallet } = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)
  const { getClientId } = useAuth()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const requestBalance = async () => {
    new AssetsService()
      .getBalanceWallets()
      .then(response => {
        balanceWalletStore.setBalanceWallet(response)
      })
      .catch(e => {})
  }
  const fetchBalanceWallets = async () => {
    if (getClientId() === '') return

    await requestBalance()
    setInterval(async () => {
      await requestBalance()
    }, 10000)
  }

  const getBalanceByCode = (assetCode: string, format = true): number => {
    const wallet = balanceWalletStore.getWalletByAssetCode(assetCode)
    if (wallet) {
      return calculateBalance(
        wallet?.assetCode,
        wallet?.balance,
        wallet.blockedBalance ?? 0,
        format
      ) as unknown as number
    }

    return 0
  }

  const getWalletByAssetCode = (assetCode: string): BalanceWallet | undefined => {
    return balanceWalletStore.getWalletByAssetCode(assetCode)
  }

  //TODO - Este metodo debe ser analizado para saber si es necesario implementarlo, por ahora no se usara y el balance se actualizara desde el backend
  const updateBlockedBalanceWalletByCode = (assetCode: string, blockedBalance: number): void => {
    balanceWalletStore.updateBlockedBalanceWalletByCode(assetCode, blockedBalance)
  }

  const getAllWallets = (): BalanceWallet[] => {
    return balanceWallets.wallets.value.sort((a, b) => (a.assetCode === 'USD' ? -1 : b.assetCode === 'USD' ? 1 : 0))
  }

  const calculateBalance = (assetCode: string, balance: number, blocked: number, format: boolean = true) => {
    const total = isNaN(balance + blocked) ? 0 : balance + blocked
    const isUSD = assetCode === 'USD' || assetCode === 'USDC' || assetCode === 'USDT' || assetCode === 'USD_PA'
    const decimalSeparator = locale.value === 'en' ? '.' : ','
    const thousandSeparator = locale.value === 'en' ? ',' : '.'
    if (!format) return total

    if (isUSD) {
      return total
        .toFixed(2)
        .replace('.', decimalSeparator)
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
    }

    return total.toFixed(8).replace('.', decimalSeparator)
  }

  return {
    isExistsWallet,
    calculateBalance,
    fetchBalanceWallets,
    getBalanceByCode,
    getWalletByAssetCode,
    getAllWallets,
    requestBalance,
  }
}
