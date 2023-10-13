import { HttpService } from '../../../shared/services/http'
import { RegisterResponse } from '../types/register.interface'
import { FirebaseService } from '../../../shared/services/firebase'
import { useUserStore } from '../../../stores/user'

export class RegisterService extends HttpService {
  private static _instance: RegisterService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new RegisterService()

    return this._instance
  }
  async register(email: string, password: string): Promise<RegisterResponse> {
    const resp = await this.post<RegisterResponse>(`user/signin/`, { email, password }, false)
    return resp
  }

  async resendEmailCode(email: string, typeValidation: string): Promise<RegisterResponse> {
    const resp = await this.post<RegisterResponse>(`user/new-validation-code/`, { email, typeValidation }, false)
    return resp
  }

  async confirmCode(code: string, email: string): Promise<RegisterResponse> {
    const resp = await this.post<RegisterResponse>(`user/verify-email-code/`, { code, email }, false)
    return resp
  }
}
