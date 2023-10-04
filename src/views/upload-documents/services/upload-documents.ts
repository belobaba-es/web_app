import { HttpService } from '../../../shared/services/http'

export class UploadDocumentsService extends HttpService {
  private static _instance: UploadDocumentsService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new UploadDocumentsService()

    return this._instance
  }

  async openingAccountPersonal(payload: any): Promise<any> {
    return await this.post<any>(`account/custodial-account-natural-person`, payload)
  }
}
