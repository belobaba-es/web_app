import { HttpService } from '../../../shared/services/http'
import { MakeAssetExternalTransfer, MakeAssetInternalTransfer, MakeFiatExternalTransfer } from '../types/withdraw'

export class WithdrawService {
  async makeAssetInternalTransfer(transaction: MakeAssetInternalTransfer): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `assets/withdrawal/internal`,
      transaction
    )
  }

  async makeFiatExternalTransfer(transaction: MakeFiatExternalTransfer): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `banking/withdrawal/external`,
      transaction
    )
  }

  async makeAssetExternalTransfer(transaction: MakeAssetExternalTransfer): Promise<void> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(
      `assets/withdrawal/external`,
      transaction
    )
  }
}
