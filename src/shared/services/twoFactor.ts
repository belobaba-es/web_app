import { HttpService } from './http'
import { TwoFactor } from '../../views/profile/types/TwoFactorReponse'

export class TwoFactorService {
  async request(payload: any): Promise<TwoFactor> {
    const data = await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR).post<any>(
      'request',
      payload,
      false
    )

    return data.data as TwoFactor
  }

  async active(payload: any): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR).post<any>('active', payload, false)
  }

  async verifyCode(payload: any): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR).post<any>('verify', payload, false)
  }

  async verifyTokenToRecoveryTwoFactorAuth(accountId: string): Promise<any> {
    const payload = {
      accountId: accountId,
    }

    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR).post<any>(
      'verify-request-recovery-two-factor-auth',
      payload,
      false
    )
  }

  async requestRecoveryTwoFactorAuth(codes: string[], accountId: string) {
    const payload = {
      accountId: accountId,
      codeRecovery: codes,
    }

    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_TWO_FACTOR).post('recovery', payload, false)
  }
}
