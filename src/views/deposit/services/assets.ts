import {
  Asset,
  CreatePaymentAddress,
  CreatePaymentAddressResponse,
  PaymentAddressResponse,
} from '../types/asset.interface'
import { HttpService } from '../../../shared/services/http'

export class AssetsService {
  async list(): Promise<Asset[]> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<Asset[]>(`assets/`)
  }

  async listPaymentAddress(next = '', assetCode: string = ''): Promise<PaymentAddressResponse[]> {
    let queryParams = next ? `${next}&` : '?'
    if (assetCode) {
      queryParams = next ? `${queryParams}assetCode=${assetCode}` : `?assetCode=${assetCode}`
    }

    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<PaymentAddressResponse[]>(
      `assets/payment-address${queryParams}`
    )
  }

  async paymentAddress(data: CreatePaymentAddress): Promise<{ message:string }> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<{ message:string }>(`assets/payment-address`, data)
  }

  async getBalanceWallets(): Promise<any> {
    return new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<any>(`assets/balance-wallets`)
  }
}
