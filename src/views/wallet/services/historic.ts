import { HttpService } from '../../../shared/services/http'
import { HistoricTransactionsResponse } from '../types/historic-transactions-response.interface'

export class HistoricService {
  async findTransactionByTransactionId(transactionId: string, isInternal: boolean, assetCode: any) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get(
      `transaction/${transactionId}/${isInternal}/${assetCode}`,
      {},
      true
    )
  }

  async historic(assetCode: any) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<HistoricTransactionsResponse>(
      `transaction/${assetCode}`,
      {},
      true
    )
  }

  async historicNextPage(assetCode: any, nextPag: string) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<HistoricTransactionsResponse>(
      `transaction/${assetCode}/${nextPag}`,
      {},
      true
    )
  }
}
