import { useBalanceWalletStore } from '../stores/balanceWallets'
import { storeToRefs } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'
import { FirebaseService } from '../shared/services/firebase'
import { useUserStore } from '../stores/user'

export const useBalanceWallet = () => {
  const balanceWalletStore = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)

  const fetchBalanceWallets = async () => {
    const userStore = useUserStore()
    const firebaseService = await new FirebaseService(userStore.getUser.accountId)
    await firebaseService.listenFirebaseChanges()
    firebaseService.getBalances().then(observable => {
      observable.subscribe((balances: BalanceWallet[]) => {
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

  const calculateBalance = (assetCode: string, balance: number, blocked: number) => {
    const total = isNaN(balance - blocked) ? 0 : balance - blocked
    if (assetCode === 'USD' || assetCode === 'USDC') {
      return total.toFixed(2)
    }

    return total.toFixed(8)
  }

  return {
    calculateBalance,
    fetchBalanceWallets,
    getBalanceByCode,
    getWalletByAssetCode,
    getAllWallets,
    updateBlockedBalanceWalletByCode,
  }
}
