import { HttpService } from '../../../shared/services/http'
import {
  MakeAssetExternalTransfer,
  MakeAssetInternalTransfer,
  MakeFiatExternalTransfer,
  MakeFiatInternalTransfer,
} from '../types/withdraw'

export class WithdrawService extends HttpService {
  private static _instance: WithdrawService
  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new WithdrawService()

    return this._instance
  }

  async makeFiatInternalTransfer(transaction: MakeFiatInternalTransfer): Promise<void> {
    return await this.post<any>(`banking/withdrawal/internal`, transaction)
  }

  async makeAssetInternalTransfer(transaction: MakeAssetInternalTransfer): Promise<void> {
    return await this.post<any>(`assets/withdrawal/internal`, transaction)
  }

  async makeFiatExternalTransfer(transaction: MakeFiatExternalTransfer): Promise<void> {
    return await this.post<any>(`banking/withdrawal/external`, transaction)
  }

  async makeAssetExternalTransfer(transaction: MakeAssetExternalTransfer): Promise<void> {
    return await this.post<any>(`assets/withdrawal/external`, transaction)
  }
}
