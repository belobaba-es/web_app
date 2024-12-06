import axios from 'axios'
import router from '../../router/router'
import { useAuth } from '../../composables/useAuth'

export interface payloadInterface {
  [key: string]: string | number | null | undefined
}

export class HttpService {
  private readonly getSupportedWalletProviders: () => string[]

  constructor(private readonly urlAPI: string) {
    const { getSupportedWalletProviders } = useAuth()
    this.getSupportedWalletProviders = getSupportedWalletProviders
  }

  getClient() {
    return axios.create({
      baseURL: this.urlAPI,
    })
  }

  private async getHeader(isFormData: boolean = false) {
    const { getToken } = useAuth()
    if (getToken() === '') {
      await router.push('/')
      return
    }

    const supportedProviders = sessionStorage.getItem('provider')

    const type = isFormData ? 'multipart/form-data' : 'application/json'
    return {
      headers: {
        'Content-Type': type,
        Authorization: 'Bearer ' + getToken(),
        'tenant-name': import.meta.env.VITE_TENANT_NAME,
        'x-provider': supportedProviders ? JSON.parse(supportedProviders) : this.getSupportedWalletProviders()[0],
      },
    }
  }

  public async post<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    const supportedProviders = sessionStorage.getItem('provider')
    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {
        headers: {
          'Content-Type': 'application/json',
          'tenant-name': import.meta.env.VITE_TENANT_NAME,
          'x-provider': supportedProviders ? JSON.parse(supportedProviders) : this.getSupportedWalletProviders()[0],
        },
      }
    }

    const response = await this.getClient().post(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async patch<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    const supportedProviders = sessionStorage.getItem('provider')

    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {
        headers: {
          'tenant-name': import.meta.env.VITE_TENANT_NAME,
          'x-provider': supportedProviders ? JSON.parse(supportedProviders) : this.getSupportedWalletProviders()[0],
        },
      }
    }

    const response = await this.getClient().patch(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async get<T>(url: string, payload: payloadInterface = {}, isPrivate = true): Promise<T> {
    const supportedProviders = sessionStorage.getItem('provider')
    let data: any
    let header: any
    let params: any

    if (isPrivate) {
      header = await this.getHeader()
    } else {
      header = {
        headers: {
          'tenant-name': import.meta.env.VITE_TENANT_NAME,
          'x-provider': supportedProviders ? JSON.parse(supportedProviders) : this.getSupportedWalletProviders()[0],
        },
      }
    }

    if (Object.keys(payload).length > 0) {
      params = Object.entries(payload)
        .filter(([key, value]) => ![0, '', null, undefined].includes(value))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    }

    data = await this.getClient().get(url, { headers: header.headers, params })

    return data.data.data
  }
}
