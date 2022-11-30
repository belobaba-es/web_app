import axios, { AxiosInstance } from 'axios'
import router from '../../router'
import { CryptoService } from './crypto'

export abstract class HttpService {
  private client: AxiosInstance
  private cryptoService

  constructor(urlAPI: string) {
    this.client = axios.create({
      baseURL: urlAPI,
    })

    this.cryptoService = new CryptoService()
  }

  protected setToken(token: string) {
    sessionStorage.setItem('noba', this.cryptoService.encrypt(token))
  }

  protected removeTokens() {
    sessionStorage.removeItem('noba')
    sessionStorage.removeItem('user')
  }

  public async getToken<T>(): Promise<string | undefined> {
    const token = sessionStorage.getItem('noba')
    if (!token) {
      return undefined
    }
    return this.cryptoService.decrypt(token)
  }

  private async getHeader(isFormData: boolean = false) {
    let token = await this.getToken()
    if (!token) {
      await router.push('/')
      return
    }
    const type = isFormData ? 'multipart/form-data' : 'application/json'
    return {
      headers: {
        'Content-Type': type,
        Authorization: 'Bearer ' + token,
      },
    }
  }

  public async post<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {}
    }

    const response = await this.client.post(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async patch<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {}
    }

    const response = await this.client.patch(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async get<T>(url: string, payload = [], isPrivate = true): Promise<T> {
    let data: any
    let header: any
    if (isPrivate) {
      header = await this.getHeader()
    } else {
      header = {}
    }

    if (payload.length > 0) {
      const params = new URLSearchParams(payload).toString()
      url = `${url}?${params}`
    }

    data = await this.client.get(url, header)

    return data.data.data as T
  }
}
