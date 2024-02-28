import { HttpService } from '../../../shared/services/http'
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

  async getHeader(token: string, isFormData: boolean = false) {
    const type = isFormData ? 'multipart/form-data' : 'application/json'

    return {
      headers: {
        'Content-Type': type,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  async createExchange(payload: any): Promise<createExchangeResponse> {
    const { getClientId } = useAuth()
    const headerRequest = await this.getHeader(await generateToken({ clientId: getClientId() }))

    const data = await this.getClient().post<createExchangeResponse>(`/exchanges`, payload, headerRequest)
    return data.data
  }

  async execute(exchangeId: string): Promise<any> {
    const { getClientId } = useAuth()

    const headerRequest = await this.getHeader(await generateToken({ clientId: getClientId() }))
    const response = await this.getClient().post<any>(`/exchanges/accept/${exchangeId}`, {}, headerRequest)

    return response.data
  }

  async exchanges(nextPag: number = 1) {
    const { getClientId } = useAuth()
    const headerRequest = await this.getHeader(await generateToken({ clientId: getClientId() }))

    const data = await this.getClient().get<any>(
      `/exchanges/${nextPag}/20`,

      { headers: headerRequest.headers }
    )

    return data.data.data
  }

  async cancelQuote(quiteId: string) {
    return await new HttpService(import.meta.env.VITE_SWAP_API).patch<any>(`/quotes/cancel/${quiteId}`, {}, true)
  }
}
