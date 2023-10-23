import { HttpService } from '../../../shared/services/http'
import { RegisterResponse } from '../types/register.interface'

export class RegisterService {
  async register(email: string, password: string): Promise<RegisterResponse> {
    const resp = await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<RegisterResponse>(
      `user/signin/`,
      { email, password },
      false
    )
    return resp
  }

  async resendEmailCode(email: string, typeValidation: string): Promise<RegisterResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<RegisterResponse>(
      `user/new-validation-code/`,
      { email, typeValidation },
      false
    )
  }

  async confirmCode(code: string, email: string): Promise<RegisterResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<RegisterResponse>(
      `user/verify-email-code/`,
      { code, email },
      false
    )
  }
}
