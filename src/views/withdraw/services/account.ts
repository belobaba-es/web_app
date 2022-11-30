import { HttpService } from '../../../shared/services/http'
import { UserAccount } from '../types/account'

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
}
