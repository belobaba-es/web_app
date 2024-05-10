import { HttpService } from './http'
import { TwoFactor } from '../../views/profile/types/TwoFactorReponse'
import axios from 'axios'

export class TwoFactorService {
  //private url = 'http://localhost:9091/two-factor-auth/api/v1'
  private url = `${import.meta.env.VITE_BASE_ENDPOINT}/two-factor-auth/api/v1`

  async request(payload: any): Promise<TwoFactor> {
    const data = await new HttpService(this.url).post<any>('request', payload, false)

    return data.data as TwoFactor
  }

  async active(payload: any): Promise<any> {
    return await new HttpService(this.url).post<any>('active', payload, false)
  }

  async verifyCode(payload: any): Promise<any> {
    return await new HttpService(this.url).post<any>('verify', payload, false)
  }

  async verifyTokenToRecoveryTwoFactorAuth(clientId: string): Promise<any> {
    const payload = {
      clientId,
    }

    return await new HttpService(this.url).post<any>('verify-request-recovery-two-factor-auth', payload, false)
  }

  async requestRecoveryTwoFactorAuth(codes: string[], clientId: string) {
    const payload = {
      clientId,
      codeRecovery: codes,
    }

    return await new HttpService(this.url).post('recovery', payload, false)
  }
}
