import { HttpService } from '../../../shared/services/http'
import { HistoricTransactionsResponse } from '../types/historic-transactions-response.interface'

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

  async findTransactionByTransactionId(transactionId: string, isInternal: boolean) {
    return await this.get(`transaction/${transactionId}/${isInternal}`, {}, true)
  }

  async historic(assetCode: any) {
    return await this.get<HistoricTransactionsResponse>(`transaction/${assetCode}`, {}, true)
  }

  async historicNextPage(assetCode: any, nextPag: string) {
    return await this.get<HistoricTransactionsResponse>(`transaction/${assetCode}/${nextPag}`, {}, true)
  }
}
