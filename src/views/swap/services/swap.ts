import { HttpService } from '../../../shared/services/http'
import { CreateQuoteResponse } from '../types/create-quote-response.interface'

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
  async createQuote(payload: any): Promise<CreateQuoteResponse> {
    const resp = await this.post<CreateQuoteResponse>(`swap/quotes/create`, payload, true)
    return resp;
  }
}
