import { HttpService } from '../../../shared/services/http'

export class BusinessAllie extends HttpService {
  private static _instance: BusinessAllie

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new BusinessAllie()

    return this._instance
  }

  async getBusinessAllieStatus(accountId: string) {}
}
