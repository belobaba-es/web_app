import { HttpService } from '../../../shared/services/http'
import {
  MakeAssetExternalTransfer,
  MakeAssetInternalTransfer,
  MakeFiatExternalTransfer,
  MakeFiatInternalTransfer,
} from '../types/withdraw'

export class WithdrawService {
  async makeFiatInternalTransfer(transaction: MakeFiatInternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `banking/withdrawal/internal`,
      transaction
    )
  }

  async makeAssetInternalTransfer(transaction: MakeAssetInternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `assets/withdrawal/internal`,
      transaction
    )
  }

  async makeFiatExternalTransfer(transaction: MakeFiatExternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `banking/withdrawal/external`,
      transaction
    )
  }

  async makeAssetExternalTransfer(transaction: MakeAssetExternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `assets/withdrawal/external`,
      transaction
    )
  }
}
