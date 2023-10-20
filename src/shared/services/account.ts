import { HttpService } from './http'
import { UserAccount } from '../../views/withdraw/types/account'

export class AccountService {
  async getAccountByEmail(email: string | string[]): Promise<UserAccount> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<UserAccount>(`/account/by-email/${email}`)
  }

  async enableTwoFactorAuthentication(): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch('account/two-factor-auth/enable', {}, true)
  }

  async disableTwoFactorAuthentication(account: string): Promise<void> {
    const payload = {
      accountId: account,
    }
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch(
      'account/two-factor-auth/disabled',
      payload,
      false
    )
  }
}
