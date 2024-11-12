import { ref } from 'vue'
import { WalletProvider } from '../../login/types/login.interface'
import { useRouter } from 'vue-router'
import { useTransactionHistoryTable } from '../../transaction-history/composables/useTransactionHistoryTable'
import { useCardSocket } from '../../cards/composables/useCardSocket'
import { useTransactionCard } from '../../cards/transactionsCard/composable/useTransactionCard'
import { useMediaQuery } from '../../../composables/useMediaQuery'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'

export const useDashboard = () => {
  const selectedWalletProvider = ref<WalletProvider | null>(null)
  const router = useRouter()
  const { getAssetsHistory, getTransactions } = useTransactionHistoryTable()
  const { subscribeCardTransactionResource, subscribeBalanceCard } = useCardSocket()
  const { fetchListCard, redirectValidationMobile, redirectValidation } = useCardCenter()
  const { getHistoryTransaction } = useTransactionCard()
  const { isMobile } = useMediaQuery()
  const { requestBalance } = useBalanceWallet()

  const handleSelectedWalletProvider = async (value: WalletProvider | null) => {
    sessionStorage.setItem('provider', JSON.stringify(value))
    await requestBalance()

    switch (router.currentRoute.value.path) {
      case '/dashboard':
        await getAssetsHistory()
        await getTransactions({
          perPage: 10,
          startDate: '',
          page: 1,
        })
        break
      case '/swap':
        await getAssetsHistory()
        break
      case '/transaction-history':
        await getTransactions({
          perPage: 10,
          startDate: '',
          page: 1,
        })
        break
      case '/cards':
        await subscribeCardTransactionResource()
        await subscribeBalanceCard()

        await getHistoryTransaction(1, 10)
        await fetchListCard()
        if (isMobile.value) {
          redirectValidationMobile()
          return
        }
        redirectValidation()
        break
      default:
        break
    }
  }

  return {
    selectedWalletProvider,
    handleSelectedWalletProvider,
  }
}
