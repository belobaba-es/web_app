import { defineStore } from 'pinia'
import { RechargeState } from '../types/rechargeState'

export const useRechargeCardStore = defineStore('useRechargeCardStore', {
  state: (): RechargeState => ({
    assetId: '',
    assetName: '',
    assetIcon: '',
    showModalAssetSelector: false,
    loading: false,
    assetCode: '',
    amount: 0,
    unitCount: 0,
    quoteId: '',
    showModalResume: false,
  }),
  actions: {
    setStateRechargeCard(rechargeCard: RechargeState) {
      this.assetId = rechargeCard.assetId
      this.assetName = rechargeCard.assetName
      this.assetIcon = rechargeCard.assetIcon
      this.showModalAssetSelector = rechargeCard.showModalAssetSelector
      this.loading = rechargeCard.loading
      this.assetCode = rechargeCard.assetCode
      this.amount = rechargeCard.amount
      this.unitCount = rechargeCard.unitCount
      this.quoteId = rechargeCard.quoteId
      this.showModalResume = rechargeCard.showModalResume
    },
    dataRechargeCard() {
      return {
        assetId: this.assetId,
        assetName: this.assetName,
        assetIcon: this.assetIcon,
        showModalAssetSelector: this.showModalAssetSelector,
        loading: this.loading,
        assetCode: this.assetCode,
        amount: this.amount,
        unitCount: this.unitCount,
        quoteId: this.quoteId,
        showModalResume: this.showModalResume,
      }
    },
  },
})
