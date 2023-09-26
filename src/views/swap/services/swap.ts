import { HttpService } from '../../../shared/services/http'
import { createExchangeResponse } from '../types/create-quote-response.interface'
import { QuoteResponse } from '../types/quote-response.interface'

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
    console.log('-createExchange', payload)
    const resp = await this.post<createExchangeResponse>(`swap/exchanges`, payload, true)
    return resp
  }

  async execute(quoteId: string): Promise<any> {
    const resp = await this.post<any>(`swap/quotes/execute`, { quoteId }, true)
    return resp
  }

  async quotes() {
    const resp = await this.get<any>(`swap/quotes`, {}, true)
    return resp
  }

  async nextQuotes(nextPag: string): Promise<QuoteResponse> {
    const resp = await this.get<QuoteResponse>(`swap/quotes/${nextPag}`, {}, true)
    return resp
  }

  async cancelQuote(quiteId: string) {
    const resp = await this.patch<any>(`swap/quotes/cancel/${quiteId}`, {}, true)
    return resp
  }
}
