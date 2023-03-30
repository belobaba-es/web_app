import { HttpService } from '../../../shared/services/http'
import { Account } from '../types/account.interface'
import { FormData as FormDataAccount } from '../../../stores/account'

export class ProfileService extends HttpService {
  private static _instance: ProfileService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new ProfileService()

    return this._instance
  }

  async getAccountByID(accountID: string | string[]): Promise<Account> {
    return await this.get<Account>(`account/${accountID}`)
  }

  async updateContact(
    accountID: string,
    contactId: string | string[],
    isNaturalAccount: boolean,
    form: FormDataAccount
  ): Promise<any> {
    let url = `account/${accountID}/contact/${contactId}`
    if (!isNaturalAccount) url = `account/company/${accountID}/contact/${contactId}`
    return await this.patch(url, form)
  }

  async updatePassword(email: string, password: string, currentPassword: string): Promise<any> {
    return await this.patch(`user/${email}`, {
      password,
      currentPassword,
    })
  }

  async updateDocuments(formData: FormData): Promise<any> {
    return await this.post(`account/uploaded-documents`, formData, true, true)
  }
}
