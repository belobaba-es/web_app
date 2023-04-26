import { HttpService } from './http'
import { TwoFactor } from '../../views/profile/types/TwoFactorReponse'

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

  async verifyCode(payload: any): Promise<any> {
    return await this.post<any>('verify', payload, false)
  }

  async verifyTokenToRecoveryTwoFactorAuth(accountId: string): Promise<any> {
    const payload = {
      accountId: accountId,
    }

    return await this.post<any>('verify-request-recovery-two-factor-auth', payload, false)
  }

  async requestRecoveryTwoFactorAuth(codes: string[], accountId: string) {
    const payload = {
      accountId: accountId,
      codeRecovery: codes,
    }

    return await this.post('recovery', payload, false)
  }
}
