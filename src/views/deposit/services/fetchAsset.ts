import axios, { AxiosInstance } from 'axios'
import {
  Asset,
  CreatePaymentAddress,
  CreatePaymentAddressResponse,
  PaymentAddressResponse,
} from '../types/asset.interface'
import fetchHeader from '../../../shared/services/fetchHeader'

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_ENDPOINT,
})

export const list = async (): Promise<Asset[]> => {
  const header = await fetchHeader()
  const response = await client.get(`assets/`, { headers: header?.headers })

  return response.data.data as Asset[]
}
//
// async listPaymentAddress(next = '', assetCode: string = ''): Promise<PaymentAddressResponse[]> {
//     let queryParams = next ? `${next}&` : '?'
//     if (assetCode) {
//         queryParams = next ? `${queryParams}assetCode=${assetCode}` : `?assetCode=${assetCode}`
//     }
//
//     return await this.get<PaymentAddressResponse[]>(`assets/payment-address${queryParams}`)
// }
//
// async paymentAddress(data: CreatePaymentAddress): Promise<CreatePaymentAddressResponse> {
//     return await this.post(`assets/payment-address`, data)
// }
//
export const getBalanceWallets = async (): Promise<any> => {
  const header = await fetchHeader()
  const response = await client.get(`assets/balance-wallets`, { headers: header?.headers })
  return response.data.data
}
