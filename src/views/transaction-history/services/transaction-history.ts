import { HttpService } from '../../../shared/services/http'
import { HistoricTransactionsResponse } from '../types/transaction-history-response.interface'

export class HistoricService extends HttpService {
  private static _instance: HistoricService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new HistoricService()

    return this._instance
  }

  async getHistoric() {
    const resp = await this.get<HistoricTransactionsResponse>(`transactionHistory`, [], true)
    return resp;
  }

  async getHistoricNextPage(nextPag: string) {
    const resp = await this.get<HistoricTransactionsResponse>(`transactionHistory/?next=${nextPag}`, [], true)
    return resp;
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
