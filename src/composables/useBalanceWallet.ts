import {AssetsService} from '../views/deposit/services/assets'
import {useBalanceWalletStore} from '../stores/balanceWallets'
import {storeToRefs} from 'pinia'
import {BalanceWallet} from '../views/deposit/types/asset.interface'

export const useBalanceWallet = () => {
  const assetsService = AssetsService.instance()

  const balanceWalletStore = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)

  const fetchBalanceWallets = async () => {
    const w = await assetsService.getBalanceWallets()
    balanceWalletStore.setBalanceWallet(w)
  }

  const getBalanceByCode = (assetCode: string): number => {
    const balance = balanceWalletStore.getBalanceByCode(assetCode)
    if (assetCode === 'USD') {
      return Number(balance.toFixed(2))
    }

    return Number(balance.toFixed(8))
  }

  const getWalletByAssetCode = (assetCode: string): BalanceWallet | undefined => {
    return balanceWalletStore.getWalletByAssetCode(assetCode)
  }

  const updateBlockedBalanceWalletByCode = (assetCode: string, blockedBalance: number): void => {
    balanceWalletStore.updateBlockedBalanceWalletByCode(assetCode, blockedBalance)
  }

  const getAllWallets = (): BalanceWallet[] => {
    return balanceWallets.wallets.value
  }

  return {
    fetchBalanceWallets,
    getBalanceByCode,
    getWalletByAssetCode,
    getAllWallets,
    updateBlockedBalanceWalletByCode,
  }
}
