import { HttpService } from '../../../shared/services/http'
import { HistoricTransactionsResponse } from '../types/transaction-history-response.interface'

export class TransactionHistoricService {
  async getHistoric(payload = {}) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<HistoricTransactionsResponse>(
      `transactionHistory`,
      payload,
      true
    )
  }
}
