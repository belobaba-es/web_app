import { useBalanceWalletStore } from '../stores/balanceWallets'
import { storeToRefs } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'
import { useUserStore } from '../stores/user'
import { useI18n } from 'vue-i18n'
import { AssetsService } from '../views/deposit/services/assets'

export const useBalanceWallet = () => {
  const { locale } = useI18n()
  const balanceWalletStore = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)

  const requestBalance = async () => {
    AssetsService.instance()
      .getBalanceWallets()
      .then(response => {
        balanceWalletStore.setBalanceWallet(response)
      })
  }
  const fetchBalanceWallets = async () => {
    const userStore = useUserStore()
    await requestBalance()
    setInterval(async () => {
      await requestBalance()
    }, 10000)

    // const firebaseService = await new FirebaseService(userStore.getUser.accountId)
    // await firebaseService.listenFirebaseChanges()
    // firebaseService.getBalances().then(observable => {
    //   observable.subscribe((balances: BalanceWallet[]) => {
    //     balanceWalletStore.setBalanceWallet(balances)
    //   })
    // })
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

    const isUSD = assetCode === 'USD' || assetCode === 'USDC' || assetCode === 'USDT'
    const decimalSeparator = locale.value === 'en' ? '.' : ','
    const thousandSeparator = locale.value === 'en' ? ',' : '.'

    if (isUSD) {
      return total
        .toFixed(2)
        .replace('.', decimalSeparator)
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
    }

    return total.toFixed(8).replace('.', decimalSeparator)
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
