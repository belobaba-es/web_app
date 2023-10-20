import { HttpService } from '../../../shared/services/http'
import { BusinessOpportunity } from '../types/businessOpportunity'
import { BusinessAllieType } from '../types/businessAllie'

export class BusinessAllieService {
  async getBusinessAllieStatus(): Promise<BusinessAllieType> {
    return await new HttpService(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT).get('/businessAllies')
  }

  async getBusinessOpportunities(): Promise<BusinessOpportunity[]> {
    return await new HttpService(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT).get('/businessOpportunities')
  }
  async saveBusinessOpportunity(payload: any): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT).post('/businessOpportunities', payload)
  }

  async registerAsBusinessPartner(payload: any): Promise<BusinessAllieType> {
    return await new HttpService(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT).post('/businessAllies', payload)
  }

  async updateOpportunityFeeSwap(taxId: string, feeSwap: number): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BUSINESS_ALLIE_ENDPOINT).patch(`businessOpportunities/${taxId}`, {
      feeSwap,
    })
  }
}
