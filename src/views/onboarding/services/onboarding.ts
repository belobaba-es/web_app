import { HttpService } from '../../../shared/services/http'

export class OnboardingService {
  async openingAccountPersonal(payload: any, updateData: boolean = false): Promise<any> {
    if (updateData) {
      return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).patch<any>(`account/`, payload)
    }

    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `account/custodial-account-natural-person`,
      payload
    )
  }

  async openingAccountBussiness(payload: any, updateData: boolean): Promise<any> {
    if (updateData) {
      return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).patch<any>(`account/`, payload)
    }

    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `account/custodial-account-company`,
      payload
    )
  }

  async updateOnboarding(payload: any): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).patch<any>(
      `account/update-onboarding-card`,
      payload
    )
  }
}
