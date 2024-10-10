import { MakeAssetExternalTransfer, MakeAssetInternalTransfer } from '../type/withdraw'
import { HttpService } from '../../../shared/services/http'

export class WithdrawCryptoService {
  async makeAssetExternalTransfer(transaction: MakeAssetExternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `assets/withdrawal/external`,
      transaction
    )
  }

  async makeAssetInternalTransfer(transaction: MakeAssetInternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `assets/withdrawal/internal`,
      transaction
    )
  }
}
