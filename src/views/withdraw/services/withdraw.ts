import { HttpService } from '../../../shared/services/http'
import { MakeFiatExternalTransfer, MakeFiatInternalTransfer } from '../type/withdraw'

export class WithdrawService {
  async makeFiatInternalTransfer(transaction: MakeFiatInternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `banking/withdrawal/internal`,
      transaction
    )
  }

  async makeFiatExternalTransfer(transaction: MakeFiatExternalTransfer): Promise<void> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `banking/withdrawal/external`,
      transaction
    )
  }
}
