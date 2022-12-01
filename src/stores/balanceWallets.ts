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

    getBalanceByCode(assetCode: string): number {
      const w = this.wallets.filter(w => w.assetCode === assetCode)
      if (w.length === 0) {
        return 0
      }

      return w[0].balance - (w[0].blockedBalance ?? 0)
    },

    getWalletByAssetCode(assetCode: string): BalanceWallet | undefined {
      for (const w of this.wallets) {
        if (w.assetCode === assetCode) {
          return w
        }
      }
    },
    updateBlockedBalanceWalletByCode(assetCode: string, blockedBalance: number): void {
      for (const w of this.wallets) {
        if (w.assetCode === assetCode) {
          let blocked: number = 0

          if (w.blockedBalance) {
            blocked = w.blockedBalance
          }

          console.log('TOTAL', blocked + blockedBalance)
          w.blockedBalance = Number(blocked) + Number(blockedBalance)
        }
      }
    },
  },
})
