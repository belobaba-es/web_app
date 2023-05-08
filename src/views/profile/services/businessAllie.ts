import { HttpService } from '../../../shared/services/http'

export class BusinessAllie extends HttpService {
  private static _instance: BusinessAllie

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new BusinessAllie()

    return this._instance
  }

  async getBusinessAllieStatus(): Promise<any> {
    return await this.get('/businessAllies')
  }

  async getBusinessOpportunities(): Promise<any> {
    return this.get('/businessOpportunities')
  }
  async saveBusinessOpportunity(payload: any): Promise<any> {
    return this.post('/businessOpportunities', payload)
  }

  async registerAsBusinessPartner(payload: any): Promise<any> {
    return this.post('/businessAllies', payload)
  }
}
