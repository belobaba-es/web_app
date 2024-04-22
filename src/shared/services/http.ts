import axios from 'axios'
import router from '../../router/router'
import { useAuth } from '../../composables/useAuth'

export interface payloadInterface {
  [key: string]: string | number | null | undefined
}

export class HttpService {
  constructor(private readonly urlAPI: string) {
  }

  getClient() {
    return axios.create({
      baseURL: this.urlAPI
    })
  }

  private async getHeader(isFormData: boolean = false) {
    const { getToken } = useAuth()
    if (getToken() === '') {
      await router.push('/')
      return
    }

    const type = isFormData ? 'multipart/form-data' : 'application/json'
    return {
      headers: {
        'Content-Type': type,
        Authorization: 'Bearer ' + getToken()
      }
    }
  }

  public async post<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {}
    }

    const response = await this.getClient().post(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async patch<T>(url: string, form: any, isPrivate: boolean = true, isFormData: boolean = false): Promise<T> {
    let headerRequest: any
    if (isPrivate) {
      headerRequest = await this.getHeader(isFormData)
    } else {
      headerRequest = {}
    }

    const response = await this.getClient().patch(url, form, headerRequest)

    return response.data ?? ('' as T)
  }

  public async get<T>(url: string, payload: payloadInterface = {}, isPrivate = true): Promise<T> {
    let data: any
    let header: any
    let params: any
    if (isPrivate) {
      header = await this.getHeader()
    } else {
      header = {}
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
