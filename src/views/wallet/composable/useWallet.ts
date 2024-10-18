import { useAuthStore } from '../../../stores/useAuthStore'

export const useWallet = () => {
  const { getWalletProvider } = useAuthStore()
  return {
    getWalletProvider,
  }
}
