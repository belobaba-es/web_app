import { HttpService } from '../../../shared/services/http'
import { createExchangeResponse } from '../types/create-exchange-response.interface'
import { ExchangeResponse } from '../types/quote-response.interface'

export class SwapService {
  async createExchange(payload: any): Promise<createExchangeResponse> {
    const resp = await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<createExchangeResponse>(
      `swap/exchanges`,
      payload,
      true
    )
    return resp
  }

  async execute(exchangeId: string): Promise<any> {
    const resp = await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `swap/exchanges/accept/${exchangeId}`,
      {},
      true
    )
    return resp
  }

  async exchanges(nextPag: number = 1) {
    const resp = await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<any>(
      `swap/exchanges/${nextPag}/20`,
      {},
      true
    )
    return resp
  }

  async cancelQuote(quiteId: string) {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch<any>(
      `swap/quotes/cancel/${quiteId}`,
      {},
      true
    )
  }
}
