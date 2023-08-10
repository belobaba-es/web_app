import { HttpService } from '../../../shared/services/http'
import {
  Asset,
  CreatePaymentAddress,
  CreatePaymentAddressResponse,
  PaymentAddressResponse,
} from '../types/asset.interface'

export class AssetsService extends HttpService {
  private static _instance: AssetsService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new AssetsService()

    return this._instance
  }
  async list(): Promise<Asset[]> {
    return await this.get<Asset[]>(`assets/`)
  }

  async listPaymentAddress(next = '', assetCode: string = ''): Promise<PaymentAddressResponse> {
    let queryParams = next ? `${next}&` : '?'
    if (assetCode) {
      queryParams = next ? `${queryParams}assetCode=${assetCode}` : `?assetCode=${assetCode}`
    }

    return await this.get<PaymentAddressResponse>(`assets/payment-address${queryParams}`)
  }

  async paymentAddress(data: CreatePaymentAddress): Promise<CreatePaymentAddressResponse> {
    return await this.post(`assets/payment-address`, data)
  }

  async getBalanceWallets(): Promise<any> {
    return await this.get<any>(`assets/balance-wallets`)
  }
}
