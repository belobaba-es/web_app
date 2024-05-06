import { HttpService } from './http'
import { UserAccount } from '../../views/withdraw/types/account'

export class AccountService {
  async getAccountByEmail(email: string | string[]): Promise<UserAccount> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<UserAccount>(
      `/account/by-email/${email}`
    )
  }

  async enableTwoFactorAuthentication(): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).patch(
      'account/two-factor-auth/enable',
      {},
      true
    )
  }

  async disableTwoFactorAuthentication(clientId: string): Promise<void> {
    const payload = {
      clientId,
    }
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).patch(
      'account/two-factor-auth/disabled',
      payload,
      false
    )
  }
}
