import { HttpService } from '../../../shared/services/http'
import { TwoFactor } from '../types/TwoFactorReponse'

export class TwoFactorService extends HttpService {
  private static _instance: TwoFactorService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new TwoFactorService()

    return this._instance
  }

  async request(payload: any): Promise<TwoFactor> {
    const data = await this.post<any>('request', payload, false)

    return data.data as TwoFactor
  }

  async active(payload: any): Promise<any> {
    return await this.post<any>('active', payload, false)
  }
}
