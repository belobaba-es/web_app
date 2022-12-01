import { HttpService } from '../../../shared/services/http'

export class ForgotPasswordService extends HttpService {
  private static _instance: ForgotPasswordService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new ForgotPasswordService()

    return this._instance
  }
  async sendEmail(email: string): Promise<any> {
    return await this.post(`/user/recovery-password`, { email }, false)
  }
}
