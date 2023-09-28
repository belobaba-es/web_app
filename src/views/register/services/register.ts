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

    console.log(resp.message)
    return resp
  }


}
