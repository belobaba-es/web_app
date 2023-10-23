import { HttpService } from '../../../shared/services/http'

export class OnboardingService {
  async openingAccountPersonal(payload: any): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `account/custodial-account-natural-person`,
      payload
    )
  }

  async openingAccountBussiness(payload: any): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `account/custodial-account-company`,
      payload
    )
  }
}
