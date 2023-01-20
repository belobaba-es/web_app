import { useBalanceWalletStore } from '../stores/balanceWallets'
import { storeToRefs } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'
import { FirebaseService } from '../shared/services/firebase'

export const useBalanceWallet = () => {
  const balanceWalletStore = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)

  const fetchBalanceWallets = async () => {
    const firebaseS = await new FirebaseService()
    firebaseS.listenFirebaseChanges()
    firebaseS.getBalances().then(obs => {
      obs.subscribe((balances: any) => {
        balanceWalletStore.setBalanceWallet(balances)
      })
    })
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
    return balanceWallets.wallets.value.sort((a, b) => (a.assetCode === 'USD' ? -1 : b.assetCode === 'USD' ? 1 : 0))
  }

  return {
    fetchBalanceWallets,
    getBalanceByCode,
    getWalletByAssetCode,
    getAllWallets,
    updateBlockedBalanceWalletByCode,
  }
}
