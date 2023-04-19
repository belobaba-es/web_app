import { HttpService } from '../../../shared/services/http'
import { HistoricTransactionsResponse } from '../types/transaction-history-response.interface'

export class TransactionHistoricService extends HttpService {
  private static _instance: TransactionHistoricService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new TransactionHistoricService()

    return this._instance
  }

  async getHistoric(payload = {}) {
    return await this.get<HistoricTransactionsResponse>(`transactionHistory`, payload, true)
  }

  async getHistoricNextPage(nextPag: string, payload = {}) {
    return await this.get<HistoricTransactionsResponse>(`transactionHistory/?next=${nextPag}`, payload, true)
  }

  // async historic(assetCode:any) {
  //   const resp = await this.get<HistoricTransactionsResponse>(`transaction/${assetCode}`, [], true)
  //   return resp;
  // }

  // async historicNextPage(assetCode:any, nextPag: string) {
  //   const resp = await this.get<HistoricTransactionsResponse>(`transaction/${assetCode}/${nextPag}`, [], true)
  //   return resp;
  // }
}
