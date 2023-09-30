import { HttpService } from '../../../shared/services/http'
import { createExchangeResponse } from '../types/create-exchange-response.interface'
import { ExchangeResponse } from '../types/quote-response.interface'

export class SwapService extends HttpService {
  private static _instance: SwapService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new SwapService()

    return this._instance
  }

  async createExchange(payload: any): Promise<createExchangeResponse> {
    const resp = await this.post<createExchangeResponse>(`swap/exchanges`, payload, true)
    return resp
  }

  async execute(exchangeId: string): Promise<any> {
    const resp = await this.post<any>(`swap/exchanges/accept/${exchangeId}`, {}, true)
    return resp
  }

  async exchanges() {
    const resp = await this.get<any>(`swap/exchanges`, {}, true)
    return resp
  }

  async nextQuotes(nextPag: string): Promise<ExchangeResponse> {
    const resp = await this.get<ExchangeResponse>(`swap/quotes/${nextPag}`, {}, true)
    return resp
  }

  async cancelQuote(quiteId: string) {
    // todo create this method in the backend
    return

    const resp = await this.patch<any>(`swap/quotes/cancel/${quiteId}`, {}, true)
    return resp
  }
}
