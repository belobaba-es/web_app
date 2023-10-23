import { HttpService } from '../../../shared/services/http'
import { createExchangeResponse } from '../types/create-exchange-response.interface'

export class SwapService {
  async createExchange(payload: any): Promise<createExchangeResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<createExchangeResponse>(
      `swap/exchanges`,
      payload,
      true
    )
  }

  async execute(exchangeId: string): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `swap/exchanges/accept/${exchangeId}`,
      {},
      true
    )
  }

  async exchanges(nextPag: number = 1) {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<any>(`swap/exchanges/${nextPag}/20`, {}, true)
  }

  async cancelQuote(quiteId: string) {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch<any>(
      `swap/quotes/cancel/${quiteId}`,
      {},
      true
    )
  }
}
