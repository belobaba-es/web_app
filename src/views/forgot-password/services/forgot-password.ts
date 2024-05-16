import { HttpService } from '../../../shared/services/http'

export class ForgotPasswordService {
  async sendEmail(email: string): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post(`/user/recovery-password`, { email }, false)
  }
}
