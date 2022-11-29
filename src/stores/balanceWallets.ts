import { defineStore } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'

interface BalanceWalletsState {
  wallets: BalanceWallet[]
}

export const useBalanceWalletStore = defineStore('balanceWallet', {
  state: (): BalanceWalletsState => ({
    wallets: [],
  }),
  actions: {
    setBalanceWallet(payload: BalanceWallet[]) {
      this.wallets = payload
    },

    getBalanceByCode(assetCode: string): BalanceWallet | undefined {
      const w = this.wallets.filter(w => (w.assetCode = assetCode))
      if (w.length === 0) {
        return undefined
      }

      return w[0]
    },

    updateBalanceWalletByCode(assetCode: string, newBalance: number): void {
      for (const w of this.wallets) {
        if (w.assetCode === assetCode) {
          w.balance = newBalance
        }
      }
    },
  },
})
