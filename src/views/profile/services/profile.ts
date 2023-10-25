import { HttpService } from '../../../shared/services/http'
import { Account, IndividualDTO } from '../types/account.interface'
import { FormData as FormDataAccount } from '../../../stores/account'

export class ProfileService {
  async getAccountByClientId(accountID: string | string[]): Promise<any> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<any>(`account/${accountID}`)
  }

  async updateContact(
    accountID: string,
    contactId: string | string[],
    isNaturalAccount: boolean,
    form: FormDataAccount
  ): Promise<any> {
    let url = `account/${accountID}/contact/${contactId}`
    if (!isNaturalAccount) url = `account/company/${accountID}/contact/${contactId}`
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch(url, form)
  }

  async updatePassword(email: string, password: string, currentPassword: string): Promise<any> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).patch(`user/${email}`, {
      password,
      currentPassword,
    })
  }

  async updateDocuments(formData: FormData): Promise<any> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post(`account/uploaded-documents`, formData, true, true)
  }
}
