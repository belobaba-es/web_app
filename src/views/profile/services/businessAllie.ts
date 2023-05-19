import { HttpService } from '../../../shared/services/http'
import { BusinessOpportunity } from '../types/businessOpportunity'
import { BusinessAllieType } from '../types/businessAllie'

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

  async getBusinessAllieStatus(): Promise<BusinessAllieType> {
    return await this.get('/businessAllies')
  }

  async getBusinessOpportunities(): Promise<BusinessOpportunity[]> {
    return this.get('/businessOpportunities')
  }
  async saveBusinessOpportunity(payload: any): Promise<void> {
    return this.post('/businessOpportunities', payload)
  }

  async registerAsBusinessPartner(payload: any): Promise<BusinessAllieType> {
    return this.post('/businessAllies', payload)
  }

  async updateOpportunityFeeSwap(taxId: string, feeSwap: number): Promise<void> {
    return await this.patch(`businessOpportunities/${taxId}`, {
      feeSwap,
    })
  }
}
