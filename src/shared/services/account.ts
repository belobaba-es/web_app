import { HttpService } from './http'
import { UserAccount } from '../../views/withdraw/types/account'

export class AccountService extends HttpService {
  private static _instance: AccountService
  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new AccountService()

    return this._instance
  }

  async getAccountByEmail(email: string | string[]): Promise<UserAccount> {
    return await this.get<UserAccount>(`/account/owner-email/${email}`)
  }

  async enableTwoFactorAuthentication(): Promise<void> {
    return await this.patch('account/two-factor-auth/enable', {}, true)
  }

  async disableTwoFactorAuthentication(account: string): Promise<void> {
    const payload = {
      accountId: account,
    }
    return await this.patch('account/two-factor-auth/disabled', payload, false)
  }
}
