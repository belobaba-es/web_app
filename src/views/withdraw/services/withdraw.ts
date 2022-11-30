import { HttpService } from '../../../shared/services/http'
import { MakeInternalTransfer } from '../types/withdraw'

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

  async makeInternalTransfer(transaction: MakeInternalTransfer): Promise<void> {
    return await this.post<any>(`banking/withdrawal/internal`, transaction)
  }
}
