import { createExchangeResponse } from '../types/create-exchange-response.interface'
import axios from 'axios'

import * as jose from 'jose'
import { importSPKI } from 'jose'
import { useAuth } from '../../../composables/useAuth'

const generateToken = async (payload: any) => {
  const decoder = new TextDecoder('utf-8')
  const publicKeyPEM = decoder.decode(
    new Uint8Array(
      atob(import.meta.env.VITE_SWAP_PUBLIC_KEY)
        .split('')
        .map(c => c.charCodeAt(0))
    )
  )
  const secretKey = await importSPKI(publicKeyPEM, 'RSA-OAEP-256')

  return await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A128CBC-HS256' })
    .setIssuer('webapp:nobaswap:issuer')
    .setExpirationTime(new Date().getTime() + 1000 * 60 * 0.5)
    .encrypt(secretKey)
}

export class SwapService {
  getClient() {
    return axios.create({
      baseURL: import.meta.env.VITE_SWAP_API,
    })
  }

  async getHeader(isFormData: boolean = false) {
    const { getClientId } = useAuth()
    const token = await generateToken({ clientId: getClientId() })
    const type = isFormData ? 'multipart/form-data' : 'application/json'

    return {
      headers: {
        'Content-Type': type,
        Authorization: `Bearer ${token}`,
        'tenant-name': import.meta.env.VITE_TENANT_NAME,
      },
    }
  }

  async createExchange(payload: any): Promise<createExchangeResponse> {
    const headerRequest = await this.getHeader()
    const data = await this.getClient().post<createExchangeResponse>(`/exchanges`, payload, headerRequest)
    return data.data
  }

  async execute(exchangeId: string): Promise<any> {
    const headerRequest = await this.getHeader()
    const response = await this.getClient().post<any>(`/exchanges/accept/${exchangeId}`, {}, headerRequest)

    return response.data
  }

  async exchanges(nextPag: number = 1) {
    const headerRequest = await this.getHeader()

    const data = await this.getClient().get<any>(
      `/exchanges/${nextPag}/20`,

      { headers: headerRequest.headers }
    )

    return data.data.data
  }

  async cancelQuote(exchangeId: string) {
    const headerRequest = await this.getHeader()
    const response = await this.getClient().post<any>(`/exchanges/cancel/${exchangeId}`, {}, headerRequest)

    return response.data
  }

  async getExchangePairs() {
    const headerRequest = await this.getHeader()
    const response = await this.getClient().get<any>(`/exchanges/supported-pairs`, { headers: headerRequest.headers })
    return response.data
  }
}
